import dotenv from "dotenv";

dotenv.config();


export default {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || "mongoSRV",
  PORT: process.env.PORT,
  FACEBOOK_ID:process.env.FACEBOOK_ID,
  FACEBOOK_CLIENT_ID:process.env.FACEBOOK_CLIENT_ID
};
