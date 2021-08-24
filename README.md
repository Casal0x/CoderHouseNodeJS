# EJERICICIOS DE CODEHOUSE CURSO NODEJS CLASE 15 Proyecto Final

## Como ejecutar el proyecto

- ejecutar yarn o npm install
- ejecutar yarn build o npm run build
- ejectuar yarn dev (development) o yarn start (prod) || npm run dev o npm start

## Scripts

- "start": "node dist/index.js"
- "start:build": "npm run build && node dist/index.js"
- "dev": "concurrently \"tsc -w\" \"nodemon dist/index.js\""
- "build": "tsc"

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
