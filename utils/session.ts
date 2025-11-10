import { JWTPayload, SignJWT, jwtVerify } from "jose";

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

// type DecodedSession = { _id: string } | null;

export async function verifySession(session: string | undefined = ""): Promise<{_id: string} | null>{
  try {
    if (!session) return null;

    const decoded = await jwtVerify(session, secret, {
      algorithms: ["HS256"],
    });

   return decoded.payload.payload as {_id: string}
  } catch (error) {
   return null;
  }
}
