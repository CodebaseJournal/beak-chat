import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

export const {PORT, DATABASE_URL,JWT_TOKEN,JWT_EXPIRES_IN} = process.env;

if (!JWT_TOKEN) {
  throw new Error("JWT_TOKEN is not defined");
}

if (!JWT_EXPIRES_IN) {
  throw new Error("JWT_EXPIRES_IN is not defined");
}