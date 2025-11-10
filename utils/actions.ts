"use server";

import { redirect } from "next/navigation";
import xss from "xss";
import { email, z } from "zod";
import argon from "argon2";
import ClientPromise from "../database/db";
import { cookies } from "next/headers";
import argon2 from "argon2";
import { ResumeProps, Route, User } from "./types";
import { revalidateTag, unstable_cache, updateTag } from "next/cache";

import { createSesssion, verifySession } from "./session";
import { ObjectId } from "mongodb";

interface Errors {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmpassword?: string[];
}

export type FormState =
  | { errors: Errors }
  | {
      userData: {
        name: string;
        email: string;
        uid: string;
      };
      // response?: UserProps
      errors?: undefined;
      redirectTo: string;
    }
  | { message: string; ok: boolean };

const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome precisa conter pelo menos 2 caracteres." })
    .trim(),
  email: z.string().email({ message: "Formato de email inválido." }).trim(),
  password: z
    .string()
    .min(8, { message: "Senha precisa conter pelo menos 8 caracteres." })
    .trim(),
});

export async function signup(prevState: FormState, formData: FormData) {
  const cookie = await cookies();


  const db = await (await ClientPromise).db(process.env.DB);
  const usersCollection = await db.collection(process.env.COLLETION_USER || 'users');

  const values = {
    name: xss(formData.get("name")?.toString() || ""),
    email: xss(formData.get("email")?.toString() || ""),
    password: xss(formData.get("password")?.toString() || ""),
    confirmPassword: xss(formData.get("confirmPassword")?.toString() || ""),
  };

  const validUserData = signupSchema.safeParse(values);

  const alreadyHasUser = await usersCollection.findOne({
    email: validUserData.data?.email,
  });

  if (alreadyHasUser) {
    return {
      message: "Email já cadastrado, tente novamente com outro email!",
      ok: false,
    };
  }

  if (!validUserData.success) {
    return {
      errors: validUserData.error.flatten().fieldErrors,
    };
  }

  const passwordhash = await argon.hash(validUserData.data.password);

  const user = await usersCollection.insertOne({
    name: validUserData.data.name,
    email: validUserData.data.email,
    password: passwordhash,
  });

  console.log(user)

  if (!user) {
    return { message: "Ocorreu um erro ao tentar criar sua conta", ok: false };
  }

  const token = await createSesssion({ _id: String(user.insertedId) });

  cookie.set("session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return {
    userData: {
      name: validUserData.data.name,
      email: validUserData.data.email,
      uid: String(user?.insertedId),
    },
    redirectTo: "/inicio",
  };
}

export interface ErrorForms {
  email?: string[];
  password?: string[];
}

export type FormLoginState = {
  errors?: ErrorForms | "";
  redirectTo?: string;
  message?: string;
  userData?: {
    email: string;
    name: string;
    uid: string;
  };
};
const zodLoginSchema = z.object({
  email: z.string().email({ message: "Formato de email inválido" }),
  password: z
    .string()
    .min(6, { message: "Verifique sua senha — ela parece muito curta." }),
});

export async function loginFormAction(
  prevState: FormLoginState | undefined,
  formData: FormData
): Promise<FormLoginState> {
  const cookie = await cookies();

  const values: { email: string; password: string } = {
    email: xss(formData.get("email")?.toString() || ""),
    password: xss(formData.get("password")?.toString() || ""),
  };

  const isValidUserCretentials = zodLoginSchema.safeParse({ ...values });

  if (!isValidUserCretentials.success) {
    return {
      errors: isValidUserCretentials.error.flatten().fieldErrors,
      redirectTo: "",
    };
  }

  const isUser = (await (await ClientPromise)
    .db(process.env.DB)
    .collection(process.env.COLLETION_USER!)
    .findOne({ email: isValidUserCretentials.data.email })) as {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
  } | null;

  if (!isUser) {
    return { message: "Usuário não cadastrado. Crie sua conta!" };
  }

  const isValidePassword = await argon2.verify(
    isUser.password,
    values.password
  );

  if (!isValidePassword) {
    return {
      errors: { password: ["Senha incorreta, tente novamente!"] },
      redirectTo: "",
    };
  }

  const token = await createSesssion({ _id: String(isUser._id) });

  cookie.set("session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return {
    userData: {
      name: isUser.name,
      email: isUser.email,
      uid: String(isUser._id),
    },
    redirectTo: "/inicio",
  };
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

type initialState = ResumeProps | undefined;

export async function addTicket(
  prevState: initialState,
  ticketData: ResumeProps
) {
  const db = (await ClientPromise).db(process.env.DB);
  const users = await db.collection<User>(process.env.COLLETION_USER!);

  const user = await users.findOneAndUpdate(
    { _id: new ObjectId(ticketData.passenger._id) as unknown as string },
    {
      $addToSet: {
        tickets: { ...ticketData.ticketDetails },
        history: { ...ticketData.ticketDetails },
      },
    },
    { returnDocument: "after" }
  );

  const plainUser = {
    ...user,
  };

  updateTag("user");

  return JSON.parse(JSON.stringify(plainUser));
}

export const getUserById = unstable_cache(
  async (id: string) => {
    const db = (await ClientPromise).db(process.env.DB);
    const user = await db
      .collection(process.env.COLLETION_USER!)
      .findOne<User>({ _id: new ObjectId(id) });

    return user;
  },
  ["user-by-id"], // chave de cache
  { tags: ["user"], revalidate: 60 }
);
