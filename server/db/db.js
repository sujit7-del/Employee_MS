import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB successfully')
    } catch(error) {
        console.error('MongoDB connection error:', error)
        // Throw error to prevent server from starting without DB
        throw new Error('Failed to connect to MongoDB')
    }
}

export default connectToDatabase