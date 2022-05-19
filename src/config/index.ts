import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT) || 3000,
  mongoUri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  domain: process.env.DOMAIN,
  perPage: 10,
  jwtSecret: process.env.JWT_SECRET,
  token: process.env.TOKEN,
  genSaltRounds: Number(process.env.SALT_ROUND),
  COOKIE_MAX_AGE: 1000 * 60 * 60 * 24 * 7,
};
