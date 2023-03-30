import express, { Application } from "express";
import {
  ensureProductExistMiddleware,
  objectPriceMarketPlace,
  existProductName,
} from "./middleware";
import {
  createProduct,
  deleteProduct,
  listAllProducts,
  retrieveProducts,
  updateProduct,
} from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/products", objectPriceMarketPlace, createProduct);

app.get("/products", objectPriceMarketPlace, listAllProducts);

app.get("/products/:id", ensureProductExistMiddleware, retrieveProducts);

app.delete("/products/:id", ensureProductExistMiddleware, deleteProduct);

app.patch(
  "/products/:id",
  existProductName,
  ensureProductExistMiddleware,
  updateProduct
);

app.listen(3000, () => {
  console.log("Server is running");
});
