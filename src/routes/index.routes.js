import { Router } from "express";


// Lista de importação das rotas do projeto

import alunosRoutes from "./alunos.routes.js";

import usuariosRoutes from "./jogo.routes.js";


const routes = Router();

// Rota raiz para teste
routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Vai Corinthians!" });
});

// Lista de uso das rotas do projeto
routes.use("/alunos", alunosRoutes);

const rotas = Router();

rotas.get("/", (req, res) => {
  res.status(200).send("Servidor rodando e pronto para uso!");
});


rotas.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

export default rotas;
