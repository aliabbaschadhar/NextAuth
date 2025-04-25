import mongoose from "mongoose";

export async function connect() {
    try {
        const { MONGO_URL } = process.env;
        if (!MONGO_URL) {
            throw new Error("MongoDB connection string is not defined in .env file");
        }
        console.log("Connecting to MongoDB...");

        await mongoose.connect(MONGO_URL,);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully!");
        })

        connection.on("error", (error) => {
            console.log("MongoDB connection error:", error);
            process.exit(1);
        })
    } catch (error) {
        console.log("Something went wrong!")
        console.error(error);
    }
}