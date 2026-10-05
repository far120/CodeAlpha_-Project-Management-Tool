import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Iuser from "./user.types";


const userSchema = new mongoose.Schema<Iuser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin", "super-admin", "business-manager"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    summary: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (!this.avatar) {
    const fullName = `${this.firstName} ${this.lastName}`.trim();
    this.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName || "User"
    )}&background=6366f1&color=ffffff&size=256&bold=true&uppercase=true`;
  }
});






export default mongoose.model("User", userSchema);