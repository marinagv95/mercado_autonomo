import { IAllMarketProduct, IProduct, IProductRequest } from "./interfaces";
import { Request, Response } from "express";
import market from "./database";

let nextId = 1;

const createProduct = (request: Request, response: Response): Response => {
  const productsData: IAllMarketProduct[] = request.body;
  const newProducts: IProduct[] = [];

  productsData.forEach((productData) => {
    const existingProduct = market.find(
      (product) => product.name === productData.name
    );

    if (existingProduct) {
      return response.status(409).json({
        error: "Produto já registrado",
      });
    }

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const newProduct: IProduct = {
      id: nextId,
      ...productData,
      expirationDate,
    };

    newProducts.push(newProduct);
    nextId += 1;
  });

  market.push(...newProducts);

  const totalPrice = market.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  const productRequest: IProductRequest = {
    total: totalPrice,
    marketProducts: market,
  };

  return response.status(201).json(productRequest);
};

const listAllProducts = (request: Request, response: Response): Response => {
  const productRequest: IProductRequest = response.locals.productRequest;

  return response.status(200).json(productRequest);
};

const retrieveProducts = (request: Request, response: Response): Response => {
  const index = response.locals.market.indexProduct;
  return response.status(200).json(market[index]);
};

const deleteProduct = (request: Request, response: Response): Response => {
  const index = response.locals.market.indexProduct;
  market.splice(index, 1);
  return response.status(204).json();
};

const updateProduct = (request: Request, response: Response): Response => {
  const index = response.locals.market.indexProduct;
  const updateData = request.body;

  market[index] = {
    ...market[index],
    ...updateData,
  };
  return response.json(market[index]);
};

export {
  createProduct,
  listAllProducts,
  retrieveProducts,
  deleteProduct,
  updateProduct,
};
