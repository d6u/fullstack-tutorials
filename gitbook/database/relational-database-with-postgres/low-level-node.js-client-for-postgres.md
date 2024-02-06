# Low Level Node.JS Client for Postgres

* In this section, we will try to interact with Postgres pragmatically by writing a Node.js script. We will re-use this technique later when loading data from the web server.
* We will be using **pg** npm package. **pg**, a.k.a. **node-postgres**, is a low level Postgres client that offers basic functionalities to connect and run queries against a Postgres server. This will offer essentaily understanding of how to work with postgres databases programmatically.
* We will introduce a more advanced ORM (Object Relationship Mapper) library to interact with Postgres, which will include a lot of convenient features, but also requires to learn more concept and write more code. Using ORM in product is high encouraged to avoid common problems are not familiarized by developers.

## Step 1

In the desired directory (highly recommend to keep using the same directly throughout this tutorial, e.g. **fullstack-tutorials**), initialized a `package.json` file by running:

```sh
npm init
```

You can use all default values for the `package.json`.

Once `package.json` is created, open it and add:

```json
"type": "module",
```

to it to enable modern syntax.

{% hint style="success" %}
Modern syntax allows you use `import` instead of `require`, `import` is used by most articles today.
{% endhint %}

## Step 2

Install **pg** package and save it to `package.json`:

```sh
npm i -S pg
```

## Step 3

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

Assume you have gone through this tutorial:

{% content-ref url="interact-with-postgres-without-writing-code.md" %}
[interact-with-postgres-without-writing-code.md](interact-with-postgres-without-writing-code.md)
{% endcontent-ref %}

You should already have records in the database table. You will see output like this:

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

You can also run `CREATE TABLE` command like you did in using `client.query()`:

{% content-ref url="interact-with-postgres-without-writing-code.md" %}
[interact-with-postgres-without-writing-code.md](interact-with-postgres-without-writing-code.md)
{% endcontent-ref %}
