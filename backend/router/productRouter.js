import express from "express";
import Product from "../model/productModel.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";
import fs from "fs";
import path from "path";

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

productRouter.get(
  "/admin/list",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (request, response) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    response.send(products);
  })
);

productRouter.post(
  "/create",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (request, response) => {
    const newProduct = new Product({
      image: request.body.formData.imageSrc,
      category: request.body.formData.category,
      name: request.body.formData.name,
      alt: request.body.formData.imageAlt,
      price: { lower: request.body.formData.price },
      countInStock: request.body.formData.countInStock,
      description: {
        color: request.body.formData.color,
        neckline: request.body.formData.neckline,
        type: request.body.formData.type,
        fabric: request.body.formData.fabric,
        waist_line: request.body.formData.waistLine,
        lining: request.body.formData.lining,
      },
    });

    const createdProduct = await newProduct.save();

    response.status(201).send(createdProduct);
  })
);

productRouter.put(
  "/edit/:productId",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (request, response) => {
    const changeProduct = await Product.findById(request.params.productId);
    if (changeProduct) {
      changeProduct.image = request.body.formData.imageSrc;
      changeProduct.category = request.body.formData.category;
      changeProduct.name = request.body.formData.name;
      changeProduct.alt = request.body.formData.imageAlt;
      changeProduct.price = { lower: request.body.formData.price };
      changeProduct.countInStock = request.body.formData.countInStock;
      changeProduct.description = {
        color: request.body.formData.color,
        neckline: request.body.formData.neckline,
        type: request.body.formData.type,
        fabric: request.body.formData.fabric,
        waistLine: request.body.formData.waistLine,
        lining: request.body.formData.lining,
      };

      const updatedProduct = await changeProduct.save();

      response.status(201).send(updatedProduct);
    } else {
      response.status(404).send({ message: "Product to be changed not found" });
    }
  })
);

productRouter.delete(
  "/deleteProduct/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (request, response) => {
    const productToDelete = await Product.findById(request.params.id);
    if (productToDelete) {
      const __dirname = path.resolve();
      fs.unlink(__dirname + productToDelete.image, (error) => {
        if (error) throw error;
      });
      const productDeleted = await productToDelete.remove();
      response.status(201).send(productDeleted);
    } else {
      response.status(404).send({ message: "Product to be deleted not found" });
    }
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
