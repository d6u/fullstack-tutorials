# Low Level Node.JS Client for Postgres

* In this section, we will try to interact with Postgres pragmatically by writing a Node.js script. We will re-use this technique later when loading data from the web server.
* We will be using **pg** npm package. **pg**, a.k.a. **node-postgres**, is a low level Postgres client that offers basic functionalities to connect and run queries against a Postgres server. This will offer essentaily understanding of how to work with postgres databases programmatically.
* We will introduce a more advanced ORM (Object Relationship Mapper) library to interact with Postgres, which will include a lot of convenient features, but also requires to learn more concept and write more code. Using ORM in product is high encouraged to avoid common problems are not familiarized by developers.

You can skip this page and jump into the ORM tutorial:

{% content-ref url="orm-object-relationship-mapper-with-postgres.md" %}
[orm-object-relationship-mapper-with-postgres.md](orm-object-relationship-mapper-with-postgres.md)
{% endcontent-ref %}

## Step 1

In the desired directory (highly recommend to keep using the same directly throughout this tutorial, e.g. **fullstack-tutorials**), initialized a `package.json` file by running:

```sh
npm init
```

You can use all default values for the `package.json`.

Once `package.json` is created, open it in an editor and add:

```json
"type": "module",
```

to it to enable modern features.

{% hint style="success" %}
Modern syntax allows you use `import` instead of `require`, `import` is used by most articles today.
{% endhint %}

The `package.json` should look like:

```json
{
  "name": "fullstack-tutorials",
  "type": "module",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## Step 2

Install **pg** package and save it to `package.json`:

```sh
npm i -S pg
```

You should see a new `dependencies` entry in `package.json`:

```json
  "dependencies": {
    "pg": "^8.11.3"
  }
```

## Step 3: Select Rows

Create a JavaScript file at `scripts/select-all-books.js`:

```javascript
import pg from "pg";

const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/postgres",
});

// Connect this client with database server.
await client.connect();

// Run SQL command against the database connected.
const res = await client.query("SELECT * FROM example_books");

// res.rows will contain all rows selected by above SQL command.
console.log(res.rows);

// Disconnect the client to end the script.
await client.end();

// In a web server, we usually don't need to call client.end(),
// because we usually assume the web server are running forever.
```

* `"postgres://postgres:example@localhost:5432/postgres"`: This connection string contains the user name, password, host, port, and target database that we need to provide to connect with a postgres server. The format of the connection string is basically:
  * `postgres://[username]:[password]@[host]:[port]/[database]`
  * Replace to different values to connect with different Postgres server.

Execute the script:

```sh
node scripts/select-books.js
```

If you haven't gone through this tutorial:

{% content-ref url="interact-with-postgres-without-writing-code.md" %}
[interact-with-postgres-without-writing-code.md](interact-with-postgres-without-writing-code.md)
{% endcontent-ref %}

You will see error output:

```
error: relation "example_books" does not exist
```

Don't worry just go to Step 4.

If have complete that tutorial, you should already have records in the database table. You will see output like this:

```javascript
[
  {
    id: 1,
    name: 'Fullstack Tutorials',
    description: 'A tutorial for fullstack development'
  }
]
```

If you change the SQL query to `SELECT id, name FROM example_books`, and run the script again, you should get:

```javascript
[ { id: 1, name: 'Fullstack Tutorials' } ]
```

If you haven't gone through the previous tutorial, continue in Step 4.

## Step 4: Create Table

If you haven't gone through the previous tutorial, you won't have a table yet. You can create the table using a script.

Create a JavaScript file at `scripts/create-example-books-table.js`:

```javascript
import pg from "pg";

const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/postgres",
});
await client.connect();

await client.query(`
  create table example_books (
    id serial primary key,
    name varchar not null,
    description varchar
  );
`);

await client.end();
```

Run the script:

```sh
node scripts/create-example-books-table.js
```

The command should finish silently without any error.

Go to [http://localhost:8080/](http://localhost:8080/) (you might need to refresh) and go to select view, you should see an table with no rows:

<figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

This means the table is successfully created.

## Step 5: Insert Rows

Create a JavaScript file at `scripts/add-books.js`:

```javascript
import pg from "pg";

const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/postgres",
});
await client.connect();

await client.query(`
  insert into example_books (name, description)
  values ('Fullstack Tutorials pt1', 'A tutorial for fullstack development'),
  ('Fullstack Tutorials pt2', 'A tutorial for even more fullstack development');
`);

await client.end();
```

Run the script:

```sh
node scripts/add-books.js
```

Go to [http://localhost:8080/](http://localhost:8080/), you should see:

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

If you run the select script:

```sh
node scripts/select-books.js
```

You should see a couple records in the output:

```javascript
[
  {
    id: 1,
    name: 'Fullstack Tutorials pt1',
    description: 'A tutorial for fullstack development'
  },
  {
    id: 2,
    name: 'Fullstack Tutorials pt2',
    description: 'A tutorial for even more fullstack development'
  }
]
```

## Step 6: Refactor

You might have noticed we have repeated some code three times in our scripts. We can use some refactoring here.

Create a JavaScript file at `database/client.js`:

```javascript
import pg from "pg";

const client = new pg.Client({
  connectionString: "postgres://postgres:example@localhost:5432/postgres",
});

await client.connect();

export default client;
```

We can then replace some code in `scripts/select-books.js`, it will become:

```javascript
import client from "../database/client.js";

const res = await client.query("SELECT * FROM example_books");

console.log(res.rows);

await client.end();
```

You can repeat this for other files as well.

Run the script to confirm it's working:

```sh
node scripts/select-books.js
```
