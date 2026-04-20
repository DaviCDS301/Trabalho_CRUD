const pool = require("../database/db");

let usuarios = [];
let proximoId = 1;

async function listarAlunos() {

    const resultado = await pool.query(
        "SELECT * FROM alunos ORDER BY id"
    );

    return resultado.rows;
}
//a
async function buscarAlunoPorId(id) {

    const resultado = await pool.query(
        "SELECT * FROM alunos WHERE id = $1",
        [id]
    );

    return resultado.rows[0];

}

async function criarAluno(nome, idade, serie) {

    if (!nome || nome.trim() === "") {
        throw new Error("Nome é obrigatório");
    }

    const resultado = await pool.query(
        `
        INSERT INTO alunos (nome, idade, serie)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [nome, idade, serie]
    );

    return resultado.rows[0];

}

async function atualizarAluno(id, nome, idade, serie) {

    const resultado = await pool.query(
        `
        UPDATE alunos
        SET nome = COALESCE($1, nome),
            idade = COALESCE($2, idade),
            serie = COALESCE($3, serie)
        WHERE id = $4
        RETURNING *
        `,
        [nome, idade, serie, id]
    );

    return resultado.rows[0];

}

async function deletarAluno(id) {

    const resultado = await pool.query(
        "DELETE FROM alunos WHERE id = $1",
        [id]
    );

    return resultado.rowCount > 0;

}

async function contarAlunos() {
    const resultado = await pool.query('SELECT COUNT(*) AS total FROM usuarios');
    return resultado.rows[0].total;
  }

module.exports = {
    listarAlunos,
    buscarAlunoPorId,
    criarAluno,
    atualizarAluno,
    deletarAluno,
    contarAlunos
};