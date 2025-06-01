/* 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Import the User model
import User from './models/user.model.js'; // adjust path if needed

// Enable __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.join(__dirname, '../.env') });


// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

console.log("MONGO_URI is:", process.env.MONGO_URI);


// 👇 Actually run the function
await connectDB();

const runTest = async () => {
    try {
      // 1️⃣ Create a new user instance
      const newUser = new User({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword123',
        profile: { name: 'Jake Test' },
      });
  
      // 2️⃣ Save the user to the database (triggers hashing)
      const savedUser = await newUser.save();
      console.log('✅ User saved:', savedUser);
  
      // 3️⃣ Confirm password is hashed
      console.log('🔐 Stored (hashed) password:', savedUser.password);
  
      // 4️⃣ Test isValidPassword with correct password
      const isMatch = await savedUser.isValidPassword('testpassword123');
      console.log('✅ isValidPassword (correct):', isMatch);
  
      // 5️⃣ Test isValidPassword with incorrect password
      const isMatchWrong = await savedUser.isValidPassword('wrongpassword');
      console.log('❌ isValidPassword (wrong):', isMatchWrong);
    } catch (err) {
      console.error('Test failed:', err.message);
    } finally {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    }
  };
  
  await runTest();
  
*/