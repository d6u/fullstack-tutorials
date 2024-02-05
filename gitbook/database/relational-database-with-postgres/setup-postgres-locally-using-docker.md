# Setup Postgres Locally using Docker

## Prerequisite

Make sure you have followed this guide to prepare your system with necessary software and configurations first:

{% content-ref url="../../prepare-your-system.md" %}
[prepare-your-system.md](../../prepare-your-system.md)
{% endcontent-ref %}

## Step 1

Make sure docker is up and running by running these in terminal:

```sh
$ docker version
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

In a directory you desire, e.g. fullstack-tutorials, create a `compose.yml` file with content:

```yaml
version: '3.1'

services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: example

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

* The user name will default to `postgres`.
* The password is configure to be `example`.
* A default database called `postgres` will be created.

