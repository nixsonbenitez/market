import db from "#db/client";
import bcrypt from "bcrypt"
import {createUser} from "#db/queries/users"
import {createProduct} from "#db/queries/products"
import {createOrderProduct} from "#db/queries/orders_products";
import {createOrder} from "#db/queries/orders"

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  

  const hashedPassword = await bcrypt.hash("password", 10);
  const user = await createUser("user", hashedPassword)


  //this will add the product that belonds to the user
  const product1 = await createProduct("Apple", "fresh apple", 1.99)
  const product2 = await createProduct("Banana", "Fresh Banana", 0.99)
  const product3 = await createProduct("Kiwi", "Fresh Kiwi", 1.00)
  const product4 = await createProduct("Orange", "organic orange", 1.99)
  const product5 = await createProduct("berries", "black berries", 0.99)
  const product6 = await createProduct("potatoes", "For fries", 1.00)
  const product7 = await createProduct("olives", "for pizza", 1.99)
  const product8 = await createProduct("broom", "to sweep", 0.99)
  const product9 = await createProduct("light bulp", "To light a room", 1.00)
  const product10 = await createProduct("Pineapple", "For pizza", 1.00)

  //This created an order beofre linking products
  const order = await createOrder("2024-01-01", "My first order", user.id);
  
  // This will add the 5 distinct products
   await createOrderProduct(order.id, product1.id, 1)
   await createOrderProduct(order.id, product10.id, 2)
   await createOrderProduct(order.id, product2.id, 3)
   await createOrderProduct(order.id, product3.id, 4)
   await createOrderProduct(order.id, product8.id, 5)

  
}
