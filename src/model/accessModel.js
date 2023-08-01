import mongoose, { Schema } from "mongoose";
console.log("inside model")

const registerSchema = new Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

const userRegister = mongoose.model("cryptoCoin", registerSchema);
export default userRegister;