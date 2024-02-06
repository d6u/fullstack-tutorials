import client from "../database/client.js";

const res = await client.query("SELECT * FROM example_books");

console.log(res.rows);

await client.end();
