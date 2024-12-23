import { MockProductModel } from "../Mongo/Models/mockProduct.model.js";
import { productModel } from "../Mongo/Models/product2.model.js";

export class ProductsDao {
  static getAllProductsAsync = async () => {
    return await ProductModel.find();
  };

  static getProductByIdAsync = async (pid) => {
    return await productModel.findById(pid);
  };

  static addProductAsync = async ({
    title,
    description,
    thumbnail,
    code,
    stock,
    price,
    status,
    category,
  }) => {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !category
    ) {
      console.log("DATOS INCOMPLETOS PARA AGREGAR EL PRODUCTO");
      return null;
    }

    return await productModel.create({
      title,
      description,
      thumbnail,
      code,
      stock,
      price,
      status,
      category,
    });
  };

  static addMockProductAsync = async (mockProduct) => {
    try {
      const newMockProduct = new MockProductModel(mockProduct);
      return await newMockProduct.save();
    } catch (error) {
      console.error(`Error al crear el producto mock: ${error.message}`);
      throw error;
    }
  };

  static addManyMocksProductsAsync = async (products) => {
    return await MockProductModel.insertMany(products);
  };

  static updateProductAsync = async (pid, productToReplace) => {
    if (
      !productToReplace.title ||
      !productToReplace.description ||
      !productToReplace.price ||
      !productToReplace.thumbnail ||
      !productToReplace.code ||
      !productToReplace.stock
    ) {
      console.log("DATOS INCOMPLETOS PARA SOBRESCRIBIR EL PRODUCTO");
      return null;
    }

    return await productModel.findOneAndUpdate({ _id: pid }, productToReplace);
  };

  static deleteProductAsync = async (pid) => {
    return await productModel.deleteOne({ _id: pid });
  };

  static async discountStockAsync(pid, quantity) {
    try {
      const product = await productModel.findById(pid);

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      if (product.stock < quantity) {
        throw new Error(
          "No hay suficiente stock disponible para este producto"
        );
      }

      product.stock -= quantity;

      await product.save();

      return product;
    } catch (error) {
      console.error(`Error al descontar stock del producto: ${error.message}`);
      throw new Error(
        `Error al descontar stock del producto: ${error.message}`
      );
    }
  }
}
