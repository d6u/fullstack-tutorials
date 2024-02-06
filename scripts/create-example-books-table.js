import client from "../database/client.js";

await client.query(`
  create table example_books (
    id serial primary key,
    name varchar not null,
    description varchar
  );
`);

await client.end();
