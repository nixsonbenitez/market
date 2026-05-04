import express from "express";
import getUserFromToken from "#middleware/getUserFromToken"
import requireUser from "#middleware/requireUser"
import {getProducts} from "#db/queries/products"
import {getProductById} from "#db/queries/products"
import {getOrdersByProductId} from "#db/queries/orders"


const router = express.Router();
export default router;

//This will fetch out products
router.get("/", async (req, res)=> {
    const products = await getProducts();
    res.send(products);
})


//This will fetch specific products
router.get("/:id", async (req, res) => {
    const products = await getProductById(req.params.id);
    if(!products) return res.status(404).send("This product is not found!")
    res.send(products)
})

//This calls on the order.js queries
router.get("/:id/orders", getUserFromToken, requireUser, async (req, res) => {
    const product = await getProductById(req.params.id);
    if(!product) return res.status(404).send("Product was not found")
    const orders = await getOrdersByProductId(req.params.id, req.user.id);
    res.send(orders)
})