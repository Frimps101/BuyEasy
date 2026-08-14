import { Router } from "express";
import { deleteProduct, createProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller";

const router: Router = Router();

router.get("/test", (req, res)=>{
    res.json({message: "Hello World"});
})

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;