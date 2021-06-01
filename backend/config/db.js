import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
