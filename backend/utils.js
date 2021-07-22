import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  // sign method has 3 parameters;
  // 1) user object
  // 2) jsonwebtoken secret => like a key to encrypt your data and generate a token
  // => secret => its a important and secure data => so don't put it here, create a .env file and dotenv package
  // 3) options
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};
