import jwt from "jsonwebtoken";
import { config } from "../config/config";

const privateKey = config.privateKey as string;
const publicKey = config.publicKey as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

interface Decoded {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: null | string;
  username: string;
  session: string;
  iat: number;
  exp: number;
}

interface JwtPayload {
  decoded: Decoded;
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded as JwtPayload,
    };
  } catch (e: any) {
    // console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
