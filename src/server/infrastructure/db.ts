import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL is not set in environment variables");
        }

        // Only connect if we're not already connected
        if (mongoose.connections[0].readyState) {
            console.log("Already connected to MongoDB.");
            return;
        }

        await mongoose.connect(MONGODB_URL, {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });

        // Handle connection events
        mongoose.connection.on("connected", () => {
            console.log("Successfully connected to MongoDB.");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from MongoDB.");
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;