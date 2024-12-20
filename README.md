# minstagram-v1
A pet project for demonstrating use of service workers for caching static content and api responses.

## Development

### Installing Dependencies
```shell
cd minstagram-node
yarn install
cd minstagram-web
yarn install
```

### Start up mongoDB
```shell
cd minstagram-node
docker-compose up -d
```

## Seed Database
```shell
cd minstagram-node
yarn ts-node ./development/seed-db.ts
```
### Run locally
run the frontends for the demo
```shell

cd minstagram-web
yarn start
```
run the backend for the demo

```shell
cd minstagram-node
yarn start
```

This should start backend at ```http://localhost:4000/``` and frontend at ```http://localhost:9000/```
