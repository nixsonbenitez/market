import express from "express";
import getUserFromToken from "#middleware/getUserFromToken"
import requireUser from "#middleware/requireUser"
import{createOrder, getOrders, getOrderById, getOrdersByUserId} from  "#db/queries/orders"
import{createOrderProduct, getProductsByOrderId} from "#db/queries/orders_products"
import{getProductById} from "#db/queries/products"

const router = express.Router();
router.use(getUserFromToken);
router.use(requireUser);


// this would send orders 
router.post("/", async (req, res) => {
    const{date, note} = req.body;
    if(!date) return res.status(400).send("date is required")
    const orders = await createOrder(date, note, req.user.id);
    res.status(201).send(orders)
})

//This receives the orders form the user logged in
router.get("/", async (req, res) => {
    const orders = await getOrdersByUserId(req.user.id)
    res.send(orders)
})

// this gets the orders but only if the user is loggedin. 
router.get("/:id", async (req, res) => {
    const orders = await getOrderById(req.params.id);
    if(!orders) return res.status(404).send("Your order was not found")
    if(orders.user_id !== Number(req.user.id)) return res.status(403).send("No thank you")
    res.send(orders);
});

//This has 4  checks to make sure if a user makes a post the following conditions are met before approved. 
//This was probably the hardest one.
router.post("/:id/products", async (req, res) => {
    const order = await getOrderById(req.params.id);
    if(!order) return res.status(404).send("Order not found");
    if(order.user_id !== Number(req.user.id)) return res.status(403).send("Not allowed")
    const {productId, quantity} = req.body;
    if (!productId || !quantity) return res.status(400).send("productId and quantity does not exists")
    const product = await getProductById(productId);
    if(!product) return res.status(400).send("Not found!")
    const orderProduct = await createOrderProduct(order.id, productId, quantity);
    res.status(201).send(orderProduct);
    
})

//This has two checks and allows a user to get products by order id
router.get("/:id/products", async (req, res) => {
    const order = await getOrderById(req.params.id);
    if(!order)return res.status(404).send("Order not found")
    if(order.user_id !== Number(req.user.id)) return res.status(403).send("Not allowed")
    const products = await getProductsByOrderId(order.id);
    res.send(products)
})

export default router;