import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "name is required"],
      },
      email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already taken"],
      },
      password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password length should be greadter then 6 character"],
      },
      address: {
        type: String,
        required: [true, "address is required"],
      },
      city: {
        type: String,
        required: [true, "city name is required"],
      },
      country: {
        type: String,
        required: [true, "country name is required"],
      },
      phone: {
        type: String,
        required: [true, "phone no is required"],
      },
      profilePic: {
        type: String,
      },
    },
    { timestamps: true }
  );

userSchema.pre("save", async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  }
);

userSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  }
  
export const userModel = mongoose.model("Users", userSchema);
export default userModel;