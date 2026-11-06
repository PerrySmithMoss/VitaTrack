import jwt from "jsonwebtoken";
import { config } from "../config/config";

type TokenUse = "access" | "refresh";

export function signJwt(userId: string, tokenUse: TokenUse) {
  const ttl = tokenUse === "access" ? config.accessTokenTtl : config.refreshTokenTtl;
  return jwt.sign({ id: userId, session: userId, tokenUse }, config.jwtSecret, {
    algorithm: "HS256",
    expiresIn: ttl as jwt.SignOptions["expiresIn"],
  });
}

export function verifyJwt(token: unknown, tokenUse: TokenUse) {
  const invalid = { expired: false, decoded: null };
  if (typeof token !== "string") return invalid;

  try {
    const decoded = jwt.verify(token, config.jwtSecret, { algorithms: ["HS256"] });
    if (
      typeof decoded === "string" ||
      decoded.tokenUse !== tokenUse ||
      typeof decoded.id !== "string" ||
      decoded.session !== decoded.id
    ) {
      return invalid;
    }
    return { expired: false, decoded: { id: decoded.id, session: decoded.id } };
  } catch (error) {
    return { ...invalid, expired: error instanceof jwt.TokenExpiredError };
  }
}
