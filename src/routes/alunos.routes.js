import { Router } from "express";
import UsersRepository from "../models/users/UserRepository.js";

const alunosRoutes = Router();
const alunoList = new UsersRepository()

//método get
alunosRoutes.get("/", (req, res) => {
    const aluno = alunoList.getAllUsers()

    return res.status(200).json({
        message: alunos.length == 0 ? "Não há alunos" : `Total de alunos: ${alunos.length}`, aluno
    })
})

alunosRoutes.post("/", (req, res) => {
    const { name, email, password } = req.body

    const aluno = alunoList.addUser(name, email, password)
    return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        aluno,
    })
})

alunosRoutes.get("/:id", (req, res) => {
    const { id } = req.params

    const aluno = alunosList.getUserById(id)

    if(!aluno) {
        return res.status(404).json({
            message: `Usuário com id ${id} não encontrado`,
        })
    }

    return res.status(200).json ({
        message: `Usuário com id ${id} encontrado`,
        user,
    })
})

alunosRoutes.put("/:id", (req, res) => {
    const { id } = req.params

    const { name, email, password } = req.body

    const user = usersList.updateUser(id, name, email, password)

    if (!user) {
        return res.status(404).json({
            message: `Usuário com id ${id} não encontrado`,
        })
    }

    return res.status(200).json ({
        message: `Usuário com id ${id} encontrado`,
        user,
    })

})

alunosRoutes.delete("/:id", (req, res) => {

})


export default alunosRoutes;
