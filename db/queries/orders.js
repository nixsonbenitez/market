import db from "#db/client";

/*This creates the order */
export async function createOrder(date, note, user_id){
const sql =`
INSERT INTO orders
(date, note, user_id)
VALUES 
($1, $2, $3)
RETURNING *
`;
const {
    rows: [order],
} = await db.query(sql, [date, note, user_id]);
return order;
}

/*This gets  the order*/
export async function getOrders(){
 const sql =`
 SELECT * FROM orders
 `;
 const {rows: orders} = await db.query(sql);
 return orders;
}

/*this grabs the specific order. */
export async function getOrderById(id){
    const sql = `
    SELECT * FROM orders WHERE id = $1
    `;
    const {
        rows: [order]
    } = await db.query(sql,[id]);
    return order;

}

//This gets the product inside the order
export async function getOrdersByUserId(user_id){
    const sql =`
    SELECT * FROM orders 
    WHERE user_id = $1
    `;
    const {rows: orders} = await db.query(sql, [user_id]);
    return orders;
}