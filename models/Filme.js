// models/Filme.js
const mongoose = require("mongoose");

// Definir o esquema do Filme
const FilmeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  anoLancamento: { type: Number, required: true },
  genero: { type: String, required: true },
  diretor: { type: String, required: true },
  duracao: { type: Number, required: true },
  sinopse: { type: String, required: true },
  classificacaoIndicativa: { type: String, required: true },
  imagemUrl: { type: String, required: false }, // Campo para armazenar a URL da imagem
});

// Exportar o modelo Filme
module.exports = mongoose.model("Filme", FilmeSchema);
