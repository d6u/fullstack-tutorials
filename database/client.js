import pg from "pg";

const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/postgres",
});

await client.connect();

export default client;
