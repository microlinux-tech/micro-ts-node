import { SECRETHASH } from "@config/constants/secret";
import crypto from "crypto";

export const random = () => crypto.randomBytes(128).toString("base64");

export const securePassword = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRETHASH)
    .digest("hex");
};
