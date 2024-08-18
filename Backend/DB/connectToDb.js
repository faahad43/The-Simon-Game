// q8rqTffNL6v25dH0
import mongoose from 'mongoose';

const uri = "mongodb+srv://Simon:q8rqTffNL6v25dH0@cluster0.ooxdspe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

export default connectDB;

