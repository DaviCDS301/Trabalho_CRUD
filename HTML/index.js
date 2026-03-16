const express = require("express")
const app = express()

app.use(express.json())

let alunos = []
let proximoId = 1


// POST - Criar aluno
app.post("/alunos", (req, res) => {

  const { nome, idade, serie } = req.body

  if(!nome || !idade || !serie){
    return res.status(400).json({erro: "Preencha todos os campos"})
  }

  const aluno = {
    id: proximoId++,
    nome,
    idade,
    serie
  }

  alunos.push(aluno)

  res.status(201).json(aluno)

})


// GET - Listar todos alunos
app.get("/alunos", (req, res) => {

  res.json(alunos)

})


// GET - Buscar aluno por ID
app.get("/alunos/:id", (req, res) => {

  const id = parseInt(req.params.id)

  const aluno = alunos.find(a => a.id === id)

  if(!aluno){
    return res.status(404).json({erro: "Aluno não encontrado"})
  }

  res.json(aluno)

})


// PUT - Atualizar aluno
app.put("/alunos/:id", (req, res) => {

  const id = parseInt(req.params.id)

  const aluno = alunos.find(a => a.id === id)

  if(!aluno){
    return res.status(404).json({erro: "Aluno não encontrado"})
  }

  const { nome, idade, serie } = req.body

  aluno.nome = nome || aluno.nome
  aluno.idade = idade || aluno.idade
  aluno.serie = serie || aluno.serie

  res.json(aluno)

})


// DELETE - Remover aluno
app.delete("/alunos/:id", (req, res) => {

  const id = parseInt(req.params.id)

  const existe = alunos.some(a => a.id === id)

  if(!existe){
    return res.status(404).json({erro: "Aluno não encontrado"})
  }

  alunos = alunos.filter(a => a.id !== id)

  res.json({mensagem: "Aluno removido com sucesso"})

})


// Servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})