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
      address: user.address,
      state: user.state,
      city: user.city,
      pin: user.pin,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (request, response, next) => {
  const authorization = request.headers.authorization;
  if (authorization) {
    // authorization format === Bearer XXXXXX
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT || "somethingsecret", (error, decode) => {
      if (error) {
        response.status(401).send({ message: "Invalid Token" });
      } else {
        request.user = decode;
        next();
      }
    });
  } else {
    response.status(401).send({ message: "No Token" });
  }
};
