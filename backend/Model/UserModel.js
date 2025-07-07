import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    match: [/^[A-Za-z ]+$/, "Name must contain only letters"],
  },
  gmail: {
    type: String,
    required: [true, "Gmail is required"],
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [0, "Age must be positive"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

 const UserModel = mongoose.model("UserModel", userSchema);
 export default UserModel;