import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../model/userModel.js ";
import { generateToken } from "../utils.js";

// Create a new instance;
const userRouter = express.Router();
// express.Router() =>  a function to make code Modular, instead of creating all routes in server.js we can define multiple files to have our routers...

// nature of mongoosse operation is async => so define the funtion async
// expressAsyncHandler => to handle the errors
userRouter.get(
  "/seed",
  expressAsyncHandler(async (request, response) => {
    // await User.remove({}); //=> to remove all users
    const createdUsers = await User.insertMany(data.users);
    response.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (user) {
      if (bcrypt.compareSync(request.body.password, user.password)) {
        response.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    } else {
      response.status(401).send({ message: "Invalid email or password" });
    }
  })
);

export default userRouter;
