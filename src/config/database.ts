import mongoose from 'mongoose';

class Database {
    private static instance: Database;
    private constructor() {
        this.connect();
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private async connect() {
        const dbUri = process.env.DATABASE_URI || 'mongodb://localhost:27017/yourdatabase';
        try {
            await mongoose.connect(dbUri)
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1); // Stop the process if we cannot connect to the database
        }
    }
}

export default Database.getInstance();

