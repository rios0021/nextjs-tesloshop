# Next.js Telo Shop
To run locally the database is needed
```
docker-compose up -d
```

* The -d means  __detached__



## Configurar las variables de entorno
Rename the file __.env.template__ to __.env__
* Local MongoDB URL:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

* Rebuild node modules and get the app running
```
yarn install
yarn dev
```


## Fill the db with testing data

Call:
```
http://localhost:3000/api/seed
```