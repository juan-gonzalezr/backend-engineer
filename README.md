# backend-engineer
backend-engineer-test

Descripción:

Se realiza la implementacion de backend-engineer-test

Tabla de contenido
Backend
Frontend
Base de Datos
herramientas, bibliotecas o frameworks utilizados para el desarrollo.
Docker compose
{
terminal 1 <br/>
cd frontend<br/>
npm run build<br/>
escribir el comando "docker build -t vite-react-app:latest ." para construir el build del frontend en vite<br/>
escribir el comando "docker run -p 5173:5173 vite-react-app:latest" para correr la imagen<br/>
frontend corriendo en "http://localhost:5173"<br/>

terminal 2<br/>
cd backend-engineer <br/>
escribir comando "docker-compose up" para correr el backend y la base de datos<br/>
}<br/>

Frontend:
Tecnologias:Vite react, Typescript
Backend:
Tecnologias: Node, Express, Typescript, Javascript
Base de datos:
Mongo db

Uso desde el frontend: <br/>
1. acceder al localhost:5173/sign-up y crear un usuario <br/>
2. acceder al localhost:5173/sign-in y iniciar sesion <br/>
3. acceder al localhost:5173/restaurants ingresar una ciudad en COLOMBIA y visualizar los resultados por consola con el inspector ctrl+shift+i <br/>
   al realizar la busqueda por ciudad se buscan 10 restaurantes cercanos a la ciudad, puede realizar las busquedas que desee en COLOMBIA<br/>
4. acceder al localhost:5173/restaurants/historical se observa el historial de busqueda de ciudad con fecha 

Endpoints de la API del Backend
Autenticación:

POST /sign-up: Registra nuevos usuarios. <br/>
POST /sign-in: Inicia sesión de usuarios existentes.<br/>
POST /sign-out: Cierra la sesión de un usuario autenticado.<br/>
GET /verify: Verifica la validez de un token de acceso.<br/>

Usuarios:
GET /profile: Recupera el perfil del usuario autenticado.
Restaurantes/Ciudades:
GET /restaurants: Recupera información de restaurantes dada la ciudad ingresada .<br/>
POST /restaurants: Guarda una búsqueda de ciudad realizada por el usuario.<br/>
GET /restaurants/history: Recupera el historial de búsquedas de ciudades del usuario autenticado.<br/>


Uso desde el backend <br/>
![image](https://github.com/juan-gonzalezr/backend-engineer/assets/62959602/7f01bdfe-d2ba-46b3-971f-ef02b8250a95)

