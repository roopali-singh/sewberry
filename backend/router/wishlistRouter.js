import express from "express";
import Wishlist from "../model/wishlistModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const wishlistRouter = express.Router();

/* Wishlist => 
1) user info
2) product info
*WishlistIcon => 
1) Adding
2) Removing
*NOT on WishlistScreen --
onClick: add new to favourites
*On WishlistScreen -- 
onClick: deleteOne() the found favourite
*/

wishlistRouter.post(
  "/add",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    const favourite = await Wishlist.find({
      user: request.user._id,
      product: request.body.productId,
    });

    if (favourite.length === 0) {
      const newFavourite = new Wishlist({
        user: request.user._id,
        product: request.body.productId,
      });

      const favouriteAdded = await newFavourite.save();

      response.status(201).send(favouriteAdded);
    }
  })
);

wishlistRouter.delete(
  "/deleteFavourite/:id",
  isAuth,
  expressAsyncHandler((request, response) => {
    Wishlist.find({
      user: request.user._id,
      product: request.params.id,
    }).deleteOne(function (err, result) {
      if (err) {
        response.status(400).send({ message: err });
      }
      if (result) {
        response.status(201).send(result);
      }
    });
  })
);

wishlistRouter.get(
  "/list",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    const favourites = await Wishlist.find({ user: request.user._id })
      .populate("product")
      .sort({
        createdAt: -1,
      });

    if (!favourites) {
      response.status(200).send({ message: "Empty Wishlist" });
    } else {
      response.status(200).send(favourites);
    }
  })
);

export default wishlistRouter;
