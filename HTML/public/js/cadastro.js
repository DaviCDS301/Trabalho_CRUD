const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {

  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const serie = document.getElementById("serie").value;

  const usuario = {
    nome,
    idade: Number(idade),
    serie
  };
//a
  console.log(usuario)
  try {

    const resposta = await fetch("/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    if (!resposta.ok) {
      const erroTexto = await resposta.text();
      console.error("Erro do servidor:", erroTexto);
      throw new Error("Erro ao cadastrar aluno");
    }

    const dados = await resposta.json();

    mensagem.textContent = `Aluno ${dados.nome} cadastrado com sucesso!`;
    mensagem.style.color = "green";

    form.reset();

  } catch (erro) {

    mensagem.textContent = "Erro ao cadastrar usuário.";
    mensagem.style.color = "red";

    console.error(erro);
  }

});