const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

router.get("/", usuariosController.listarAlunos);

router.get("/:id", usuariosController.buscarAlunoPorId);

router.get('/api/alunos/total', usuariosController.alunosTotal);

router.post("/", usuariosController.criarAluno);

router.put("/:id", usuariosController.atualizarAluno);

router.delete("/:id", usuariosController.deletarAluno);

module.exports = router;