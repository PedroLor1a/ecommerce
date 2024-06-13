import { sql } from "@vercel/postgres";

export async function createProductsDb() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/");
    const data = await res.json();
    const products = data;

    for (const item of products) {
      const newPrice = parseFloat(item.price);
      await sql`
        INSERT INTO products (title, description, category, image, price, stock)
        VALUES (${item.title}, ${item.description}, ${item.category}, ${item.image}, ${item.price}, ${item.rating.count});
      `;
    }

    console.log("Productos insertados correctamente en la base de datos.");
  } catch (error) {
    console.error({ error: error.message });
    throw new Error("Error al crear productos en la base de datos");
  }
}

createProductsDb();

export async function getProducts() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = await sql`SELECT * FROM products`;
    return data.rows;
  } catch (error) {
    console.error("API Error", error);
  }
}

export async function getProductsByName(query) {
  try {
    const products = await sql`SELECT
    products.id,
    products.title,
    products.description,
    products.category,
    products.image,
    products.price,
    products.stock
FROM products
WHERE
    products.title ILIKE ${`%${query}%`}
    ORDER BY products.title DESC
    LIMIT 6`;
    return products.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function getProductsFilterAsc() {
  try {
    const productsAsc = await sql`SELECT
    products.id,
    products.title,
    products.description,
    products.category,
    products.image,
    products.price,
    products.stock
    FROM products
    ORDER BY products.price DESC`;
    return productsAsc.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function getProductsFilterDesc() {
  try {
    const productsAsc = await sql`SELECT
    products.id,
    products.title,
    products.description,
    products.category,
    products.image,
    products.price,
    products.stock
    FROM products
    ORDER BY products.price ASC`;
    return productsAsc.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
