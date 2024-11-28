class Jogo {
    constructor() {
        this.alunos = [];
        this.jogadores = [];
        this.grupos = 6;
        this.chat = new Chat();
    }
    generateId() {
        return Math.floor(Math.random() * 999) + 1
    }
    verificarNomeExistente(nome) {
        const nomeUnico = !this.alunos.some(aluno => aluno.nome === nome);
        const nomeValido = /^[a-zA-Z]+$/.test(nome);
        return nomeUnico && nomeValido;
    }
    verificarApelidoExistente(apelido) {
        return !this.alunos.some(aluno => aluno.apelido === apelido);
    }

    adicionarAluno(aluno) {
        if (this.verificarNomeExistente(aluno.nome) && this.verificarApelidoExistente(aluno.apelido)) {
            this.alunos.push(aluno);
            return true;
        }
        return false;
    }
}

class Chat {
    constructor() {
        this.historico = [];
    }

    adicionarMensagem(mensagem) {
        this.historico.push(mensagem);
    }
}

export default Jogo;