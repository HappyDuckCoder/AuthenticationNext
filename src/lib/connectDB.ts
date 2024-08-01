import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable not defined');
        }
        
        await mongoose.connect(process.env.MONGODB_URI); 
        

        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error(error);
    }
};
