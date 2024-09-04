const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Importar as rotas de filmes
const filmesRoutes = require("./routes/filmes");

// Configurar o servidor express
const app = express();

// Habilitar CORS para todas as rotas
app.use(cors()); // Adiciona o middleware CORS aqui

// Middleware para processar JSON
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose
  .connect("mongodb://localhost/filmesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Usar as rotas de filmes
app.use("/api/filmes", filmesRoutes);

// Definir porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
