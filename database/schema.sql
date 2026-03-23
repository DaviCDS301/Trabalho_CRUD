CREATE DATABASE sistema_escola;

CREATE TABLE alunos (
	id serial PRIMARY KEY,
	nome VARCHAR(100),
	idade INTEGER,
	serie VARCHAR(100)
);