# EJERICICIOS DE CODEHOUSE CURSO NODEJS CLASE 15 Proyecto Final

## Como ejecutar el proyecto

- ejecutar yarn o npm install
- ejecutar yarn build o npm run build
- ejectuar yarn dev (development) o yarn start (prod) || npm run dev o npm start

## Scripts

- start: node build/index.js
- dev: nodemon --exec babel-node src/index.js
- build: babel src -d build

## ENDPOINTS

### Productos

- http://localhost:8080/api/productos/listar
- http://localhost:8080/api/productos/listar/:id
- http://localhost:8080/api/productos/guardar
- http://localhost:8080/api/productos/actualizar/:id
- http://localhost:8080/api/productos/borrar/:id

### Carrito

- http://localhost:8080/api/carrito/listar
- http://localhost:8080/api/carrito/listar/:id
- http://localhost:8080/api/carrito/agregar/:id_producto
- http://localhost:8080/api/carrito/borrar/:id
