import { Request, Response, NextFunction, request } from "express";
import market from "./database";
import { IAllMarketProduct, IProduct, IProductRequest } from "./interfaces";

const ensureProductExistMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = Number(request.params.id);

  const findIndex = market.findIndex((product) => product.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      error: "Produto não encontrado",
    });
  }
  response.locals.product = {
    idProduct: id,
    indexProduct: findIndex,
  };
  return next();
};

const existProductName = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const productData: IAllMarketProduct = request.body;

  market.map((product: IAllMarketProduct) => {
    if (productData.name === product.name) {
      return response.status(409).json({
        error: "Produto já registrado",
      });
    }
  });

  return next();
};

const objectPriceMarketPlace = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const totalPrice = market.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  const productRequest: IProductRequest = {
    total: totalPrice,
    marketProducts: market,
  };
  response.locals.productRequest = productRequest;
  return next();
};

export {
  ensureProductExistMiddleware,
  existProductName,
  objectPriceMarketPlace,
};
