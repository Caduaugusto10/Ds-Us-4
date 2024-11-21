import { Router } from "express";
import UsersRepository from "../models/users/UserRepository.js";

const alunosRoutes = Router();
const usersList = new UsersRepository()

//método get
alunosRoutes.get("/", (req, res) => {
    const alunos = aluList.getAllalu()

    return res.status(200).json({
        message: alunos.length == 0 ? "Não há usuários alunos" : `Total de alunos: ${alunos.length}`, alunos
    })
})

usuariosRoutes.post("/", (req, res) => {
    const { name, email, password } = req.body

    const user = usersList.addUser(name, email, password)
    return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user,
    })
})

alunosRoutes.get("/:id", (req, res) => {
    const { id } = req.params

    const aluno = usersList.getUserById(id)

    if(!user) {
        return res.status(404).json({
            message: `Usuário com id ${id} não encontrado`,
        })
    }

    return res.status(200).json ({
        message: `Usuário com id ${id} encontrado`,
        user,
    })
})

usuariosRoutes.put("/:id", (req, res) => {
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

usuariosRoutes.delete("/:id", (req, res) => {

})


export default usuariosRoutes;
