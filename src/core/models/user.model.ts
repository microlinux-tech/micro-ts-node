import { Schema, model, Document } from "mongoose";
import { UserEntity } from "@core/entities/user.entity";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

const userModel = model<UserEntity & Document>("User", userSchema);

export default userModel;
