// User Schema + methods
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 15},
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, maxlength: 25 },
  roles: {
    type: [String],
    default: ['user'],
    enum: ['user', 'admin', 'moderator']
  },
  profile: {
    first_name: { type: String, maxlength: 25, trim: true},
    last_name: { type: String, maxlength: 25, trim: true},
  },
}, {
  timestamps: true // createdAt, updatedAT
});


// Pre-save middleware to hash password before saving
userSchema.pre('save', async function(next) {
  try {
    // Check if the password has been modified
    if (!this.isModified('password')) return next();
    
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    
    next(); // Proceed to save
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Password comparison with hashed password stored in database
userSchema.methods.isValidPassword = async function(password) {
  try {
    // Compare provided password with stored hash
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

const User = mongoose.model('User', userSchema);


export default User;