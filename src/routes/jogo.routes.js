import { Router } from "express";


const cadastroRoutes = Router();

cadastroRoutes.post("/adicionar", (req, res) => {

});

cadastroRoutes.get("/listar", (req, res) => {

});

cadastroRoutes.put("/atualizar", (req, res) => {

});

cadastroRoutes.delete("/remover", (req, res) => {

});



import UsersRepository from "../models/jogo/JogoRepository.js";

const alunosRoutes = Router();
const alunoList = new UsersRepository()
const jogosRoutes = express.Router();
const jogo = new Jogo();

//método get
jogosRoutes.get("/", (req, res) => {
    try {
        const alunos = jogo.mostrarAlunos();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

jogosRoutes.post("/", (req, res) => {
    const { nome, apelido, grupo } = req.body;

    try {
        jogo.verificarNomeExistente(nome);
        jogo.verificarApelidoExistente(apelido);
        const novoAluno = { nome, apelido, grupo, estaVivo: true, localAtual: null };
        jogo.adicionarAluno(novoAluno);
        res.status(201).json({ message: "Aluno adicionado com sucesso", aluno: novoAluno });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

jogosRoutes.get("/:nome", (req, res) => {
    const { nome } = req.params;

    try {
        const aluno = jogo.alunos.find((a) => a.nome.toLowerCase() === nome.toLowerCase());
        if (!aluno) {
            return res.status(404).json({
                message: `Aluno com nome ${nome} não encontrado`,
            });
        }

        return res.status(200).json({
            message: `Aluno com nome ${nome} encontrado`,
            aluno,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para atualizar um aluno por nome (PUT)
jogosRoutes.put("/:nome", (req, res) => {
    const { nome } = req.params;
    const { novoNome, apelido, grupo } = req.body;

    try {
        const alunoIndex = jogo.alunos.findIndex((a) => a.nome.toLowerCase() === nome.toLowerCase());
        if (alunoIndex === -1) {
            return res.status(404).json({
                message: `Aluno com nome ${nome} não encontrado`,
            });
        }

        jogo.verificarNomeExistente(novoNome);
        jogo.verificarApelidoExistente(apelido);

        jogo.alunos[alunoIndex] = { ...jogo.alunos[alunoIndex], nome: novoNome, apelido, grupo };
        return res.status(200).json({
            message: `Aluno com nome ${nome} atualizado com sucesso`,
            aluno: jogo.alunos[alunoIndex],
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

jogosRoutes.delete("/:nome", (req, res) => {
    const { nome } = req.params;

    try {
        const alunoRemovido = jogo.removerAluno(nome);
        if (!alunoRemovido) {
            return res.status(404).json({
                message: `Aluno com nome ${nome} não encontrado`,
            });
        }

        return res.status(200).json({
            message: `Aluno com nome ${nome} removido com sucesso`,
            aluno: alunoRemovido,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default alunosRoutes;

