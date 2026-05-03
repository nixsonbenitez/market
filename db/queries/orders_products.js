import db from "#db/client";


/*This creates the orderproduct for the shared tables.*/
export async function createOrderProduct(order_id, product_id, quantity){
    const sql =`
    INSERT INTO orders_products
    (order_id, product_id, quantity)
    VALUES 
    ($1, $2, $3)
    RETURNING *
    `;
    const {
        rows: [orderProduct],
    } = await db.query(sql, [order_id, product_id, quantity]);
    return orderProduct;
}

/*This gets the orderId from our junction table*/
export async function getProductsByOrderId(order_id){
    const sql = `
   SELECT products.* FROM products
   JOIN orders_products ON products.id = orders_products.product_id
   WHERE orders_products.order_id = $1
    `;
    const {
    rows: products
    } = await db.query(sql, [order_id]);
    return products;
}