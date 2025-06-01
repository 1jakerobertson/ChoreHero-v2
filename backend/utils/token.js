import jwt from 'jsonwebtoken';

export const createSecretToken = (userId) => {
  console.log("🛠️ Creating token for user ID:", userId);
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};