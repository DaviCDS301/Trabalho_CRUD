const usuariosService = require("../services/usuariosService");

async function listarAlunos(req, res) {

    const usuarios = await usuariosService.listarUsuarios();

    res.json(usuarios);

}

async function buscarAlunoPorId(req, res) {

    const id = Number(req.params.id);

    const usuario = await usuariosService.buscarAlunoPorId(id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);

}

async function criarAluno(req, res) {

    try {

        const { nome, idade, serie } = req.body;

        const usuario = await usuariosService.criarAluno(nome, idade, serie);

        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario
        });

    } catch (erro) {

        res.status(400).json({
            erro: erro.message
        });

    }

}

async function atualizarAluno(req, res) {

    const id = Number(req.params.id);
    const { nome, idade, serie } = req.body;

    const usuario = await usuariosService.atualizarAluno(id, nome, idade, serie);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);

}

async function deletarAluno(req, res) {

    const id = Number(req.params.id);

    const removido = await usuariosService.deletarAluno(id);

    if (!removido) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.status(204).send();

}

async function alunosTotal(req, res) {
    try {
      const total = await usuariosService.contarUsuarios();
  
      res.json({ total });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao contar usuários' });
    }
  }

module.exports = {
    listarAlunos,
    buscarAlunoPorId,
    criarAluno,
    atualizarAluno,
    deletarAluno,
    alunosTotal
};
