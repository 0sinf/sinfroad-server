import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT) || 3000,
  mongoUri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  domain: process.env.DOMAIN,
  perPage: 10,
  secretKey: process.env.SECRET_KEY,
};
