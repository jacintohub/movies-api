const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// Importar as rotas de filmes
const filmesRoutes = require("./routes/filmes");

// Carregar variáveis de ambiente do arquivo .env
require("dotenv").config();

// Configurar o servidor express
const app = express();

// Habilitar CORS para todas as rotas
app.use(cors());

// Middleware para processar JSON (não é mais necessário usar body-parser)
app.use(express.json());

// Conectar ao MongoDB usando a variável de ambiente
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB Atlas"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Usar as rotas de filmes
app.use("/api/filmes", filmesRoutes);

// Definir porta do servidor com fallback para 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
