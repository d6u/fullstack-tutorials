import pg from "pg";

const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/postgres",
});

await client.connect();

const res = await client.query("SELECT * FROM example_books");

console.log(res.rows);

await client.end();
