# minstagram-v1
A pet project for demonstrating use of service workers for caching static content and api responses.

## Development

### Installing Dependencies
```shell
cd minstagram-node
npm install
cd minstagram-web
npm install
```

### Start up mongoDB
```shell
cd minstagram-node
docker-compose up -d
```
### Run locally
run the frontends for the demo
```shell

cd minstagram-web
npm start
```
run the backend for the demo

```shell
cd minstagram-node
npm start
```

This should start backend at ```http://localhost:3000/``` and frontend at ```http://localhost:8000/```
