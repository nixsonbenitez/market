import express from "express";
import ordersRouter from "#api/orders"
import morgan from "morgan"
import productsRouter from "#api/products"
import usersRouter from "#api/users"
const app = express();
export default app;

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"))

app.use("/orders", ordersRouter);
app.use("/products", productsRouter)
app.use("/users", usersRouter)

app.use((err, req, res, next) => {
    switch (err.code) {
        case"22P02":
        return res.status(400).send(err.message);
        case"23505":
        case"23503":
        return res.status(400).send(err.detail);
        default:
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Sorry something went wrong.")
})