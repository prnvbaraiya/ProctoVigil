import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
    },
  },
  { timestamps: true }
);

const User = Mongoose.model("User", UserSchema);
export default User;
