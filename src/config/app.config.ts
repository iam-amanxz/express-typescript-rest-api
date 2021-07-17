require('dotenv').config();

export default {
  jwtSecret: process.env.JWT_SECRET,
  minPasswordLength: 5,
  saltLevel: 10,
};
