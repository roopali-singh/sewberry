import express from "express";
import data from "./data.js";

// const { response } = express;
const app = express();

app.get("/api/products/:id", (request, response) => {
  const product = data.products.find((x) => x._id === request.params.id);
  if (product) {
    response.send(product);
  } else {
    response.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/products", (request, response) => {
  response.send(data.products);
});

app.get("/", (request, response) => {
  response.send("Server is Ready");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
