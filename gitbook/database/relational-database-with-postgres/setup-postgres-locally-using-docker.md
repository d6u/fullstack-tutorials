# Setup Postgres Locally using Docker

## Prerequisite

Make sure you have followed this guide to prepare your system with necessary software and configurations first:

{% content-ref url="../../prepare-your-system.md" %}
[prepare-your-system.md](../../prepare-your-system.md)
{% endcontent-ref %}

## Step 1

Make sure docker is up and running by running these in terminal:

```sh
docker version
```

You should see something like:

```
Client:
 Cloud integration: v1.0.35+desktop.5
 Version:           24.0.7
 ......

Server: Docker Desktop 4.26.0 (130397)
 Engine:
  Version:          24.0.7
 ......
```

This means docker is ready to go.

If you see connection issues like this:

{% code overflow="wrap" fullWidth="false" %}
```
Cannot connect to the Docker daemon at unix:///Users/daiweilu/.docker/run/docker.sock. Is the docker daemon running?
Client:
 Cloud integration: v1.0.35+desktop.5
 Version:           24.0.7
 ......
```
{% endcode %}

This means docker engine is not current running, trying start Docker app located in your Application, wait for it to full start, then try `$ docker version` command again.

## Step 2

We will be using docker compose to start a postgres container locally.

In a directory you desire, e.g. **fullstack-tutorials**, create a `compose.yml` file with content:

```yaml
version: '3.1'

services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: example
    ports:
      - 5432:5432

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

For Postgres:

* The user name will default to `postgres`.
* The password is configure to be `example` (through `POSTGRES_PASSWORD` environment).
* A default database called `postgres` will be created.
* The port will be `5432`.

Use docker compose to start containers in terminal:

```shell
docker compose up
```

{% hint style="info" %}
Make sure other Postgres processes are stopped to avoid conflicting on port 5432.
{% endhint %}

Wait a little bit, after you see:

```
LOG:  database system is ready to accept connections
```

in the output, open Docker app, navigate to **Containers** tab on the left sidebar, you should be able to see **fullstack-tutorials** (this is the same of the directory used at the beginning of Step 2, we used **fullstack-tutorials** here) item in the **Containers** list.

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

You should be able to see two contains running. This means this step is successful.

Keep `docker compose up` running in the terminal for now and move to next page.

{% hint style="info" %}
If you want to stop contains from running, just press CTRL + C to stop `docker compose up` process. Next time just run `docker compose up` to start contains again.
{% endhint %}
