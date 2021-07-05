import express from "express";
import Product from "../model/productModel.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (request, response) => {
    const products = await Product.find({});
    response.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (request, response) => {
    // await Product.deleteMany({}); //=> remove is deprecated
    // await Product.remove({}); //=> remove is deprecated
    const createdProducts = await Product.insertMany(data.products);
    response.send({ createdProducts });
  })
);

// if this one is put above "/seed" then seed will be treated as an 'id'
productRouter.get(
  "/:id",
  expressAsyncHandler(async (request, response) => {
    const product = await Product.findById(request.params.id);
    if (product) {
      response.send(product);
    } else {
      response.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
