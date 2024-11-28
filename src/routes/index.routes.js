import { Router } from "express";

// Lista de importação das rotas do projeto

import alunosRoutes from "./alunos.routes.js";

import jogosRoutes from "./jogos.routes.js";


const routes = Router();

// Rota raiz para teste
routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Vai Corinthians!" });
});

// Lista de uso das rotas do projeto
routes.use("/alunos", alunosRoutes);

export default routes;