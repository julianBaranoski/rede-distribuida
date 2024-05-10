import mongoose from "mongoose";

mongoose.connect(
  `${process.env.MONGO_URI}/${process.env.DATABASE_NAME}?authSource=admin&retryWrites=true&w=majority`
);
const db = mongoose.connection;

export default db;
