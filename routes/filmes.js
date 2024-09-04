// routes/filmes.js
const express = require("express");
const Filme = require("../models/Filme");
const router = express.Router();

// Criar um ou vários filmes (POST)
router.post("/", async (req, res) => {
  try {
    // Verificar se a requisição é um array ou um objeto único
    if (Array.isArray(req.body)) {
      // Se for um array, use insertMany para cadastrar vários filmes
      const filmes = await Filme.insertMany(req.body);
      res.status(201).send(filmes);
    } else {
      // Se for um único objeto, use save normalmente
      const filme = new Filme(req.body);
      await filme.save();
      res.status(201).send(filme);
    }
  } catch (error) {
    res.status(400).send({ message: "Erro ao processar a requisição", error });
  }
});

// Listar todos os filmes (GET)
router.get("/", async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.send(filmes);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar filmes", error });
  }
});

// Buscar um filme por ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const filme = await Filme.findById(req.params.id);
    if (!filme) {
      return res.status(404).send({ message: "Filme não encontrado" });
    }
    res.send(filme);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o filme", error });
  }
});

// Atualizar um filme por ID (PATCH)
router.patch("/:id", async (req, res) => {
  try {
    const filme = await Filme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!filme) {
      return res.status(404).send({ message: "Filme não encontrado" });
    }
    res.send(filme);
  } catch (error) {
    res.status(400).send({ message: "Erro ao atualizar o filme", error });
  }
});

// Deletar um filme por ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const filme = await Filme.findByIdAndDelete(req.params.id);
    if (!filme) {
      return res.status(404).send({ message: "Filme não encontrado" });
    }
    res.send({ message: "Filme deletado com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar o filme", error });
  }
});

// Deletar todos os filmes (DELETE)
router.delete("/", async (req, res) => {
  try {
    await Filme.deleteMany({}); // Deleta todos os documentos da coleção "filmes"
    res.send({ message: "Todos os filmes foram deletados com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar os filmes", error });
  }
});

module.exports = router;
