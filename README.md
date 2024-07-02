# backend-engineer
backend-engineer-test

Descripción:

Se realiza la implementacion de backend-engineer-test utilizando para el backend node en typescript, con los respectivos endpoints incluidos en la prueba y usando un pequeño frontend en vite react 


Frontend:
Tecnologias:Vite react, Typescript
Backend:
Tecnologias: Node, Express, Typescript, Javascript
Base de datos:
Mongo db
Docker compose
{<br/>
terminal 1 <br/>
1. cd frontend<br/>
2. npm run build<br/>
3. escribir el comando "docker build -t vite-react-app:latest ." para construir el build del frontend en vite<br/>
4. escribir el comando "docker run -p 5173:5173 vite-react-app:latest" para correr la imagen<br/>
frontend corriendo en "http://localhost:5173"<br/>

terminal 2<br/>
1. cd backend-engineer <br/>
2. escribir comando "docker-compose up" para correr docker'compose.yml el cual contiene el backend y la base de datos<br/>
}<br/>



Uso desde el frontend: <br/>
1. acceder al localhost:5173/sign-up y crear un usuario <br/>
2. acceder al localhost:5173/sign-in y iniciar sesion <br/>
3. acceder al localhost:5173/restaurants ingresar una ciudad en COLOMBIA y visualizar los resultados por consola con el inspector ctrl+shift+i <br/>
   al realizar la busqueda por ciudad se buscan 10 restaurantes cercanos a la ciudad, puede realizar las busquedas que desee en COLOMBIA<br/>
4. acceder al localhost:5173/restaurants/historical se observa el historial de busqueda de ciudad con fecha 




Uso desde el backend <br/>
Endpoints de la API del Backend
Autenticación:

POST /sign-up: Registra nuevos usuarios. <br/>
![image](https://github.com/juan-gonzalezr/backend-engineer/assets/62959602/5dfb2417-bb58-4159-ae41-d2042406663d)

POST /sign-in: Inicia sesión de usuarios existentes.<br/>
![image](https://github.com/juan-gonzalezr/backend-engineer/assets/62959602/6317a3c6-756f-4bd5-b795-c24dea5181bf)

POST /sign-out: Cierra la sesión de un usuario autenticado.<br/>
GET /verify: Verifica la validez de un token de acceso.<br/>

Usuarios:
GET /profile: Recupera el perfil del usuario autenticado y visualizar que si se guardo el usuario en la base de datos.
Restaurantes/Ciudades:
GET /restaurants: Recupera información de restaurantes dada la ciudad ingresada .<br/> en este caso para el teste
![image](https://github.com/juan-gonzalezr/backend-engineer/assets/62959602/a4763110-8fdd-4ea6-85da-588ab6454a21)

POST /restaurants: Guarda una búsqueda de ciudad realizada por el usuario.<br/>
![image](https://github.com/juan-gonzalezr/backend-engineer/assets/62959602/4aa3183c-cd28-4209-8a33-e9eda2f2d45e)

GET /restaurants/history: Recupera el historial de búsquedas de ciudades del usuario autenticado.<br/>
![image](https://github.com/juan-gonzalezr/backend-engineer/assets/62959602/cc635100-c3a4-4a97-a836-249517b84697)


NOTA: la implementacion de las cordenadas en la busqueda no fue realizada por temas practicos. Gracias por su tiempo<br/>
