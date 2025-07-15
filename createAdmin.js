require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { connectToDatabase } = require("./lib/mongodb");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});
const User = mongoose.model("User", userSchema);

async function createAdmin() {
  await connectToDatabase();

  const existingAdmin = await User.findOne({
    email: "floriddasoftware@gmail.com",
  });
  if (existingAdmin) {
    console.log("Admin user already exists");
    mongoose.connection.close();
    return;
  }

  const hashedPassword = await bcrypt.hash("Floriddasoftware@123", 10);
  const admin = new User({
    username: "admin",
    email: "floriddasoftware@gmail.com",
    password: hashedPassword,
    phone: "+2348052347119",
    isAdmin: true,
  });

  await admin.save();
  console.log("Admin created successfully!");
  mongoose.connection.close();
}

createAdmin();