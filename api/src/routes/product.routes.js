import { deleteProductData, get, getId, update, create } from "../controller/product.controller";
import uploadImage from "../utils/saveLocalImage"

const productRoutes = app => {
    app.get("/product", get);
    app.get("/product/:id", getId);
    app.put("/product/:id", uploadImage, update);
    app.delete("/product/:id", deleteProductData);
    app.post("/create", uploadImage, create);
}

export default productRoutes;
