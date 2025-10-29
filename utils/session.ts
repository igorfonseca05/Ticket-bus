import { SignJWT, jwtVerify } from "jose";

// O Jose precisa de uma chave no formato Uint8Array
// O TextEncode transforma a string em bytes
const secret = new TextEncoder().encode(process.env.SECRET_TOKEN);

// Criando token
export async function createSesssion(payload: { _id: string }) {
  const token = await new SignJWT({payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  return token;
}

export async function verifySession(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log('erro ao verificar sessão')
  }
}
