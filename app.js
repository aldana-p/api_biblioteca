const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middleware/errorHandler");

// Configuración middleware con el servidor de autorización
const autenticacion = auth({
  audience: "http://localhost:3000/api/productos", /// REVISAR
  issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
  tokenSigningAlg: "RS256",
});

const app = express();
app.use(express.json());

// Importar el router de libros
const librosRouter = require("./routes/libros");

// Configurar el middleware de autenticacion
app.use("/libros", autenticacion, librosRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
