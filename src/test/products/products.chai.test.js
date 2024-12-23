import { expect } from "chai";
import { envConfig } from "../../config/env.config.js";
import { ProductService } from "../../services/product.service.js";
import { dbConnect } from "../../utils/dbConnect.utils.js";
import assert  from "assert";


describe(
    "ñ las funcionalidades de Products con CHAI",
    () => {
        const exampleProduct = {
            title: "Example 1",
            description: "description example ",
            thumbnail: "https://example.com/iphnone-thumbnail.jpg",
            code: "EX",
            stock: 20,
            price: 11111,
            category: "Smartphones",
            status: true

        }
        let pid = null

        before(async () => await dbConnect(envConfig.MONGO_URI))



        it("El producto debe tener un precio mayor a 0", () => {
            assert.ok(exampleProduct.price > 0);
          });

        it("El producto deberia tener la propiedad 'title",
            async () => {
            expect(exampleProduct).to.have.property("title")
        })

        it("El producto deberia crearse y devolver un ObjectId",
            async () => {
                const newProduct = await ProductService.addProductAsync(exampleProduct)
                pid = newProduct._id
                console.log(pid)
                assert.ok(newProduct._id)
            }
        )

        it("El producto deberia eliminarse correctamente", 
            async () => {
                await ProductService.deleteProductAsync(pid)
                const deletedProduct = await ProductService.getProductByIdAsync(pid)
                assert.strictEqual(deletedProduct,null)

        })


    }
)