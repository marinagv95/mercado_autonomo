interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

interface IFoodProduct extends IProduct {
  calories: number;
}

interface ICleaningProducts extends IProduct {}

interface IProductRequest {
  total: number;
  marketProducts: IProduct[];
}

type IAllMarketProduct = Omit<IProduct, "id" | "expirationDate">;

export {
  IProduct,
  IFoodProduct,
  ICleaningProducts,
  IAllMarketProduct,
  IProductRequest,
};
