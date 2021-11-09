import mongoose from "mongoose";
import Config from "../config";

class MongoDB {
  run() {
    mongoose
      .connect(Config.MONGO_ATLAS_URL, {})
      .then(() => console.log("MongoDB Atlas Connected"))
      .catch((e) => console.log("MongoDB Atlas Connection Error", e));
  }
}

export const mongoDB = new MongoDB();
