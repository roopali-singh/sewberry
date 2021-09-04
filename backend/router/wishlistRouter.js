import express from "express";
import Wishlist from "../model/wishlistModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const wishlistRouter = express.Router();

// wishlistRouter.post(
//   "/",
//   isAuth,
//   expressAsyncHandler(async (request, response) => {
//     const favourite = await Wishlist.find({
//       user: request.user._id,
//       product: request.body.productId,
//     });

//     if (favourite.length === 0) {
//       const addFavourite = new Wishlist({
//         user: request.user._id,
//         product: request.body.productId,
//       });

//       const favouriteAdded = await addFavourite.save();

//       response.status(201).send(favouriteAdded);
//     } else {
//       const favouriteRemoved = favourite.deleteOne();

//       response.status(201).send(favouriteRemoved);
//     }
//   })
// );

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
  "/deleteFavourite",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    const favourite = await Wishlist.find({
      user: request.user._id,
      product: request.body.productId,
    });

    if (favourite) {
      const favouriteDeleted = await favourite.deleteOne();

      response.status(200).send(favouriteDeleted);
    }
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

/* Wishlist => 
1) user info
2) product info

*WishlistIcon => 
1) Adding
2) Removing

find by user._id && product._id
if(found){ remove }
else { add }

*WishlistScreen => 
1) find by user._id
2) show matched populated products

*/

export default wishlistRouter;
