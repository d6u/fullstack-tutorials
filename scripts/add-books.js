import client from "../database/client.js";

await client.query(`
  insert into example_books (name, description)
  values ('Fullstack Tutorials pt1', 'A tutorial for fullstack development'),
  ('Fullstack Tutorials pt2', 'A tutorial for even more fullstack development');
`);

await client.end();
