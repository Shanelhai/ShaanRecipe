import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "shanelhai7@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash("Shaan@786", 10);

    await User.create({
      name: "admin",
      email: "shanelhai7@gmail.com",
      phone: 8449983380,
      city: "Haldwani",
      address : "Himalaya Vidhya Mandir school in Gaujajali Uttar,",
      password: hashed,
      role: "admin",
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
