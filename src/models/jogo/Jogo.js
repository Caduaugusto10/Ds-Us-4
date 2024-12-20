class Jogo {
    constructor() {
        this.alunos = [];
        this.jogadores = [];
        this.grupos = 6;
        this.chat = new Chat();
        this.timerVotacao = null;
        this.votacaoAtiva = false;
        this.quizzes = new Quiz();
    }

    verificarNomeExistente(nome) {
        if (/\d/.test(nome)) {
            throw new Error("Nome não pode conter números. Escolha outro.");
        }

        const nomeExistente = this.alunos.some(
            (a) => a.nome.toLowerCase() === nome.toLowerCase()
        );
        if (nomeExistente) {
            throw new Error(`Aluno com nome ${nome} já existe. Escolha outro.`);
        }
    }

    verificarApelidoExistente(apelido) { // Verifica se o apelido já existe na lista de alunos
        const apelidoExistente = this.alunos.some(
            (a) => String(a.apelido) === String(apelido)
        );
        if (apelidoExistente) { // Se o apelido já existir, lança um erro
            throw new Error(`Aluno com apelido ${apelido} já existe. Escolha outro.`);
        }
    }

    adicionarAluno(aluno) { // Adiciona um novo aluno à lista de alunos
        this.alunos.push(aluno);
    }

    mostrarAlunos(grupo = null, nome = null) { // Verifica se há alunos cadastrados, se não houver, lança um erro
        if (this.alunos.length === 0) {
            throw new Error("Não há alunos cadastrados.");
        }

        const alunosFiltrados = this.alunos.filter( // Filtra os alunos de acordo com os parâmetros de grupo e nome, se fornecidos
            (a) =>
                (!grupo || a.grupo == grupo) &&
                (!nome || a.nome.toLowerCase() === nome.toLowerCase())
        );

        if (alunosFiltrados.length === 0) {     // Se nenhum aluno for encontrado após o filtro, lança um erro
            throw new Error("Nenhum aluno encontrado para os filtros especificados.");
        }

        const alunosAgrupados = alunosFiltrados.reduce((acc, aluno) => {     // Agrupa os alunos filtrados (continuação do código não fornecida)
            const grupoKey = `Grupo ${aluno.grupo}`;
            if (!acc[grupoKey]) acc[grupoKey] = [];
            acc[grupoKey].push({
                Nome: aluno.nome,
                Apelido: aluno.apelido,
                EstaVivo: aluno.estaVivo,
                LocalAtual: aluno.localAtual,
            });
            return acc;
        }, {});

        // Ordena e formata os grupos e alunos para exibição
        const resultadoFinal = Object.entries(alunosAgrupados)
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .reduce((acc, [grupo, alunos]) => {
                const quantidade = alunos.length;
                acc[`${grupo} com ${quantidade} aluno${quantidade > 1 ? "s" : ""}`] =      // Adiciona a quantidade de alunos em cada grupo ao resultado final
                    alunos;
                return acc;
            }, {});

        // Cria uma tabela para exibição no console
        const tabelaConsole = alunosFiltrados
            .sort((a, b) => {
                if (a.grupo === b.grupo) {
                    return a.nome.localeCompare(b.nome);
                }
                return a.grupo - b.grupo;
            })
            .map((aluno) => ({
                Grupo: aluno.grupo,
                Nome: aluno.nome,
                Apelido: aluno.apelido,
                Senha: aluno.pegarSenha(),
                EstaVivo: aluno.estaVivo,
                LocalAtual: aluno.localAtual,
            }));

        console.table(tabelaConsole);

        return resultadoFinal;
    }

    removerAluno(nome) { //Encontra o aluno pelo nome e o remove da lista de alunos
        const aluno = this.alunos.findIndex((a) => a.nome === nome);
        if (aluno === -1) {
            return null;
        }
        return this.alunos.splice(aluno, 1)[0];
    }

    mostrarJogadores(dados) { // Cria uma tabela com os dados dos jogadores
        const tabelaComInstancia = dados.map((d) => {
            const {
                grupo,
                nome,
                apelido,
                estaVivo,
                localAtual,
                tempoDesocupado,
                votos,
            } = d;
            return {
                Grupo: grupo,
                Nome: nome,
                Apelido: apelido,
                Senha: d.pegarSenha(),
                LocalAtual: localAtual,
                Votos: votos,
                TempoDesocupado: tempoDesocupado,
                EstaVivo: estaVivo,
                Tipo: d.constructor.name,
            };
        });

        console.table(tabelaComInstancia);
    }

    iniciarJogo() {
        //Escolhe um grupo aleatório para ser o grupo dos sabotadores
        const grupoEscolhido = Math.floor(Math.random() * this.grupos) + 1;

        //Converte os alunos em jogadores, sendo os do grupo escolhido sabotadores e os demais desenvolvedores
        this.alunos.forEach((aluno) => {
            let jogador;

            if (aluno.grupo === grupoEscolhido) {
                jogador = new Sabotador(aluno);
            } else {
                jogador = new Dev(aluno);
            }

            this.jogadores.push(jogador);
        });

        this.mostrarJogadores(this.jogadores);
    }

    encontrarJogadorPorSenha(senha) { //Encontra um jogador pela senha
        const jogador = this.jogadores.find((j) => j.pegarSenha() === senha);
        if (!jogador) {
            throw new Error("Senha inválida ou jogador não encontrado.");
        }
        return jogador;
    }

    verPapel(senha) { //Encontra um jogador pela senha e retorna seu papel
        const jogador = this.encontrarJogadorPorSenha(senha);
        if (!jogador) {
            throw new Error("Senha inválida ou jogador não encontrado.");
        }
        return jogador.mostrarPapel();
    }

    verificarSeEstaVivo(jogador) {
        if (!jogador.estaVivo) {
            throw new Error(
                `O jovem ${jogador.apelido} está eliminado 💀 e não pode mais jogar 😢`
            );
        }
        return jogador;
    }

    iniciarVotacao() { //Inicia uma votação se não houver uma em andamento
        if (this.votacaoAtiva) {
            throw new Error(
                "Votação já em andamento. Corra para o Auditório, discuta no Chat e decida seu voto antes de encerrar a votação!!!"
            );
        }

        this.votacaoAtiva = true;
        this.jogadores.forEach((j) => {
            if (j.estaVivo) j.apelido += " - 🗳️";
        });

        this.timerVotacao = setTimeout(() => this.encerrarVotacao(), 6 * 60 * 1000);
    }

    encerrarVotacao() { // Encerra a votação, elimina os jogadores mais votados e reseta os votos
        const maxVotos = Math.max(...this.jogadores.map((j) => j.votos));
        const maisVotados = this.jogadores.filter(
            (j) => j.votos === maxVotos && j.estaVivo
        );

        maisVotados.forEach((jogador) => {
            jogador.estaVivo = false;
        });

        this.jogadores.forEach((j) => {
            j.votos = 0;
            j.apelido = j.apelido.replace(" - 🗳️", "");
            if (!j.estaVivo)
                j.apelido = j.apelido.includes("💀") ? j.apelido : j.apelido + " - 💀";
        });

        this.votacaoAtiva = false;
        clearTimeout(this.timerVotacao);
        this.timerVotacao = null;
        this.chat.mensagens = [];

        this.mostrarJogadores(this.jogadores);
    }
}

export default Jogo;
