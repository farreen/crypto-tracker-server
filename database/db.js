import mongoose from "mongoose";

const dbConnect = () => {
    console.log("inside Database")
    const MONGODB_URI = "mongodb://127.0.0.1:27017/CryptoTracker"
    mongoose.connect(MONGODB_URI)
    mongoose.connection.on("connected", () => {
        console.log("Database connected successfully...")
    })

    mongoose.connection.on("disconnected", () => {
        console.log("Database disconnected")
    })

    mongoose.connection.on("Error", () => {
        console.log("Error while connecting to the database", Error.message);
    })
}

export default dbConnect;