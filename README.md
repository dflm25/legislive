# Legislive

Tienes que seguir los siguientes pasos

1. npm i -g @adonisjs/cli # instalar adonis js
2. clonar el proyecto git clone https://github.com/dflm25/legislive.git
3. cd legislive
4. npm install
5. crear una base de datos mysql o sqlite
6. crear el archivo .env en la raiz del proyecto con la siguiente informacion y crear el APP_KEY con el siguiente comando adonis key:generate
```
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Lae01.
DB_DATABASE=legislive
SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt
```

7. correr migraciones adonis migration:run
