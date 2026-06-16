import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

export const {PORT, DATABASE_URL,JWT_TOKEN,JWT_EXPIRES_IN} = process.env;
