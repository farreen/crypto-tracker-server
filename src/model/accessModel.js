import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})
const UserModel = mongoose.model("cryptoCoin", userSchema);
export default UserModel;