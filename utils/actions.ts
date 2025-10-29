"use server";

import { redirect } from "next/navigation";
import xss from "xss";
import { email, z } from "zod";
import argon from "argon2";
import ClientPromise from "../database/db";
import { cookies } from "next/headers";

import { createSesssion } from "./session";

interface Errors {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmpassword?: string[];
}

interface UserProps {
  name: string, 
  email: string
}
export type FormState =
  | { errors: Errors }
  | {
      userData: {
        name: string;
        email: string;
      };
      // response?: UserProps
      errors?: undefined;
      redirectTo: string
    }
  | { message: string, ok: boolean };


const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome precisa conter pelo menos 2 caracteres." })
      .trim(),
    email: z.string().email({ message: "Formato de email inválido." }).trim(),
    password: z
      .string()
      .min(8, { message: "Senha precisa conter pelo menos 8 caracteres." })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords precisam coincidir",
    path: ["confirmPassword"], // mostra o erro em confirmPassword
  });

export async function signup(prevState: FormState, formData: FormData) {

  const cookie = await cookies()

  const db = await (await ClientPromise).db("nextAuth");
  const usersCollection = await db.collection("users");

  const values = {
    name: xss(formData.get("name")?.toString() || ""),
    email: xss(formData.get("email")?.toString() || ""),
    password: xss(formData.get("password")?.toString() || ""),
    confirmPassword: xss(formData.get("confirmPassword")?.toString() || ""),
  };

  const validUserData = signupSchema.safeParse(values);

  const alreadyHasUser = await usersCollection.findOne({email: validUserData.data?.email})
  if(alreadyHasUser) {
    return {message: 'Email já cadastrado, tente novamente com outro email!', ok: false}
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

  if (!user) {
    return { message: "Ocorreu um erro ao tentar criar sua conta", ok: false };
  }

  const token = await createSesssion({_id: String(user.insertedId)})

  cookie.set('session', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  return { userData: {name: validUserData.data.name, email: validUserData.data.email}, redirectTo: '/inicio'};
}
