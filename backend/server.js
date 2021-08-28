import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import data from "./data.js";
import path from "path";
import uploadRouter from "./router/uploadRouter.js";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";

// const { response } = express;

dotenv.config(); // to use .env file content
const app = express();
// adding new middleware => parsing json data in the body of http request => to not get error in postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// accepts 2 parameters
// 1) the address of database or mongoDB uri, 2) the options
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/sewberry", {
  useNewUrlParser: true, // to get rid of duplicated warnings
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// app.get("/api/products/:id", (request, response) => {
//   const product = data.products.find((x) => x._id === request.params.id);
//   if (product) {
//     response.send(product);
//   } else {
//     response.status(404).send({ message: "Product not found" });
//   }
// });

// app.get("/api/products", (request, response) => {
//   response.send(data.products);
// });

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/config/stripe", (request, response) => {
  response
    .status(200)
    .send(
      process.env.STRIPE_PUBLISHABLE_KEY ||
        "stripe publishable key doesn't exist"
    );
});

app.get("/", (request, response) => {
  response.send("Server is Ready");
});

// this middleware will catch error from userRouter as it was wraped in expressAsyncHandler
app.use((error, request, response, next) => {
  response.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
