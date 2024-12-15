# CursoCoder-Backend

#proyecto de Servidor Express con Handlebars, Socket.IO y Mongo DB

Este es el proyecto final del curso "Programacion BackendII: desarrollo avanzado de Backend.

En este proyecto se usa:

-Entorno de ejecutcion: Node.js
-Framework: Express
-Ejecucion en tiempo real: Socket.IO
-Persistencia: MongoDB

##Estructura del proyecto

1- 'Server.js': Archivo principal que configure y ejecute el servidor.
2- 'routes/': Carpeta que contiene los archivos de rutas para productos, carritos y vistas
3- 'public/': Carpeta de archivos estaticos (Css, JS)
4- 'views/': Carpeta para las vistas de Handlebars

##Instalacion

git clone: https://github.com/MauMucci


##
npm init -y 
npm i express nodemon mongoose passport cookie-parser jsonwebtoken dotenv passport-jwt joi nodemailer winston faker -D mocha chai supertest swagger-jsdoc swagger-ui-express

##TEST 

Para hacer test, ejecutar los comandos:

npm run test:users
npm run test:products


npm run test:supertest:users