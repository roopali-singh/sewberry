import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../model/userModel.js ";
import { generateToken, isAuth } from "../utils.js";

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
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
          city: user.city,
          state: user.state,
          pin: user.pin,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      } else {
        response.status(401).send({ message: "Invalid email or password" });
      }
    } else {
      response.status(401).send({ message: "Invalid email or password" });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      const newUser = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        address: request.body.address,
        city: request.body.city,
        state: request.body.state,
        pin: request.body.pin,
        password: bcrypt.hashSync(request.body.password, 8),
      });

      const createdUser = await newUser.save();

      response.send({
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        address: createdUser.address,
        city: createdUser.city,
        state: createdUser.state,
        pin: createdUser.pin,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    } else {
      response
        .status(401)
        .send({ message: "This email address already exists" });
    }
  })
);

userRouter.put(
  "/account/edit",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    const theUser = await User.findById(request.user._id);
    // const userEmail = await User.findOne({ email: request.body.email });
    if (theUser) {
      // if (userEmail) {
      // if (userEmail === user.email) {
      //   user.firstName = request.body.firstName;
      //   user.lastName = request.body.lastName;
      //   user.email = request.body.email;
      //   user.address = request.body.address;
      //   user.city = request.body.city;
      //   user.state = request.body.state;
      //   user.pin = request.body.pin;

      //   const updatedUser = user.save();
      //   response.send({
      //     _id: updatedUser._id,
      //     firstName: updatedUser.firstName,
      //     lastName: updatedUser.lastName,
      //     email: updatedUser.email,
      //     address: updatedUser.address,
      //     city: updatedUser.city,
      //     state: updatedUser.state,
      //     pin: updatedUser.pin,
      //     token: generateToken(updatedUser),
      //   });
      // } else {
      //   response
      //     .status(401)
      //     .send({ message: "This email address already exists" });
      // }
      // } else {
      theUser.firstName = request.body.firstName;
      theUser.lastName = request.body.lastName;
      theUser.email = request.body.email;
      theUser.address = request.body.address;
      theUser.city = request.body.city;
      theUser.state = request.body.state;
      theUser.pin = request.body.pin;

      const updatedUser = theUser.save();
      response.send({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        address: updatedUser.address,
        city: updatedUser.city,
        state: updatedUser.state,
        pin: updatedUser.pin,
        token: generateToken(updatedUser),
      });
      // }
    } else {
      response.status(404).send({ message: "User doesn't exist" });
    }
  })
);

export default userRouter;
