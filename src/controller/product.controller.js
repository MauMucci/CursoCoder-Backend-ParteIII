import { ProductService } from "../services/product.service.js";
import { faker } from "@faker-js/faker";
import winstonLogger from "../utils/winston.utils.js";
import errors from "../utils/errors/errors.js";
import CustomError from "../utils/errors/CustomError.js";

export class ProductController {
  static async getAllProductsAsync(req, res) {
    try {
      const products = await ProductService.getAllProductsAsync();

      if (products.length != null) {
        winstonLogger.info(products);
        res.status(200).json(products);
      } else {
        winstonLogger.error(products);
        CustomError.newError(errors.notFound);
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los productos",
        details: error.message,
      });
    }
  }

  static async getProductByIdAsync(req, res) {
    try {
      const { pid } = req.params;
      const product = await ProductService.getProductByIdAsync(pid);

      if (product) {
        return res.status(200).json(product);
      } else {
        winstonLogger.error(product);
        CustomError.newError(errors.notFound);
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el producto",
        details: error.message,
      });
    }
  }

  static async addProductAsync(req, res) {
    try {
      const { title, description, thumbnail, code, stock, price, category } =
        req.body;
      const product = await ProductService.addProductAsync({
        title,
        description,
        thumbnail,
        code,
        stock,
        price,
        category,
      });

      res.status(201).json(product);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear el producto", details: error.message });
    }
  }

  static async addMockProductAsync(req, res) {
    try {
      const mockProduct = {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        thumbnail: faker.image.avatar(),
        //code: `${title}${date}`,
        stock: faker.number.int({ min: 80000, max: 1000000 }),
        price: faker.commerce.price({ min: 1, max: 1000 }),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(),
      };

      await ProductService.addMockProductAsync(mockProduct);

      return res
        .status(201)
        .json({ response: mockProduct, message: "PRODUCTO MOCK CREADO" });
    } catch (error) {
      return res.status(500).json({
        error: "Error al crear producto mock",
        details: error.message,
      });
    }
  }

  static async updateProductAsync(req, res) {
    try {
      const { pid } = req.params;
      const productToReplace = req.body;

      // Llama al servicio para actualizar el producto
      const updatedProduct = await ProductService.updateProductAsync(
        pid,
        productToReplace
      );

      // Verifica que el producto se haya actualizado correctamente
      if (!updatedProduct) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      console.log("Producto modificado: ", updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
      res.status(500).json({
        error: "Error al actualizar el producto",
        details: error.message,
      });
    }
  }

  static async deleteProductAsync(req, res) {
    try {
      const { pid } = req.params;
  
      const deletedProduct = await ProductService.deleteProductAsync(pid);
  
      if (!deletedProduct) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }
  
      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
  
      res.status(500).json({
        error: "Error al eliminar el producto",
        details: error.message,
      });
    }
  }
  

  static async discountStockAsync(req, res) {
    try {
      const { pid, quantity } = req.params;

      if (!quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ error: "Cantidad inválida para descontar del stock" });
      }

      const updatedProduct = await ProductService.discountStockAsync(
        pid,
        quantity
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      res
        .status(error.message.includes("No hay suficiente stock") ? 400 : 404)
        .json({ error: error.message });
    }
  }

  static async addManyMocksProductsAsync(req, res) {
    try {
      const { quantity } = req.params;
      const products = [];

      for (let i = 0; i < quantity; i++) {
        const mockProduct = {
          title: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          thumbnail: faker.image.avatar(),
          //code: `${title}${date}`,
          stock: faker.number.int({ min: 80000, max: 1000000 }),
          price: faker.commerce.price({ min: 1, max: 1000 }),
          category: faker.commerce.department(),
          status: faker.datatype.boolean(),
        };

        products.push(mockProduct);
      }

      await ProductService.addManyMocksProductsAsync(products);
      res.status(201).json({
        message: `${quantity} PRODUCTOS mock creados y guardados en la base de datos`,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al crear usuarios mock",
        details: error.message,
      });
    }
  }
}
