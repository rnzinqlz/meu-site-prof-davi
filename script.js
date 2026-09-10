const SENHA_CORRETA = "123";
const minhaLista = new Set();

function criarCard(item, atraso){
    return `
        <div class="card" style="--atraso:${atraso}ms">
            <img src="${item.imagem}" alt="${item.titulo}">
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
            <div class="botoes">
                <button type="button" onclick="assistir('${item.titulo}')">&#9654; Assistir</button>
                <button type="button" onclick="favoritar('${item.titulo}')">+ Minha lista</button>
            </div>
        </div>
    `;
}

function renderizarMinhaLista(){
    const itensMinhaLista = document.getElementById("itensMinhaLista");
    const itens = Array.from(minhaLista);

    if(itens.length === 0){
        itensMinhaLista.innerHTML = '<p class="lista-vazia">Nenhum título adicionado ainda.</p>';
        return;
    }

    itensMinhaLista.innerHTML = itens.map(function(nome){
        return `
            <div class="item-favorito">
                <span>${nome}</span>
                <button type="button" onclick="removerFavorito('${nome}')" aria-label="Remover ${nome} da lista">Remover</button>
            </div>
        `;
    }).join("");
}

function mostrar(){
    const listaFilmes = document.getElementById("listaFilmes");
    const listaSeries = document.getElementById("listaSeries");

    listaFilmes.innerHTML = "";
    listaSeries.innerHTML = "";

    filmes.forEach(function(f, index){
        listaFilmes.innerHTML += criarCard(f, index * 90);
    });

    series.forEach(function(s, index){
        listaSeries.innerHTML += criarCard(s, index * 90);
    });
}

function trocarEtapa(atual, proxima){
    atual.classList.remove("ativa");
    atual.classList.add("saindo");

    setTimeout(function(){
        atual.classList.remove("saindo");
        proxima.classList.add("ativa");
    }, 260);
}

function liberarCatalogo(){
    const telaPerfil = document.getElementById("telaPerfil");
    const appStreaming = document.getElementById("appStreaming");
    const senhaPerfil = document.getElementById("senhaPerfil");
    const mensagemSenha = document.getElementById("mensagemSenha");

    senhaPerfil.classList.add("senha-certa");
    mensagemSenha.textContent = "Senha correta. Abrindo o catálogo...";

    setTimeout(function(){
        telaPerfil.classList.add("desbloqueando");
        appStreaming.classList.add("ativo");
        document.body.classList.remove("bloqueado");
    }, 650);

    setTimeout(function(){
        telaPerfil.style.display = "none";
    }, 1500);
}

function senhaIncorreta(){
    const painelSenha = document.getElementById("etapaSenha");
    const senhaPerfil = document.getElementById("senhaPerfil");
    const mensagemSenha = document.getElementById("mensagemSenha");

    mensagemSenha.textContent = "Senha incorreta. Tente novamente.";
    painelSenha.classList.remove("erro");
    void painelSenha.offsetWidth;
    painelSenha.classList.add("erro");
    senhaPerfil.value = "";
    senhaPerfil.focus();
}

function configurarEntrada(){
    const etapaEscolha = document.getElementById("etapaEscolha");
    const etapaConfirmacao = document.getElementById("etapaConfirmacao");
    const etapaSenha = document.getElementById("etapaSenha");
    const perfilPrincipal = document.getElementById("perfilPrincipal");
    const voltarPerfil = document.getElementById("voltarPerfil");
    const confirmarPerfil = document.getElementById("confirmarPerfil");
    const desbloquear = document.getElementById("desbloquear");
    const senhaPerfil = document.getElementById("senhaPerfil");

    perfilPrincipal.addEventListener("click", function(){
        trocarEtapa(etapaEscolha, etapaConfirmacao);
    });

    voltarPerfil.addEventListener("click", function(){
        trocarEtapa(etapaConfirmacao, etapaEscolha);
    });

    confirmarPerfil.addEventListener("click", function(){
        trocarEtapa(etapaConfirmacao, etapaSenha);
        setTimeout(function(){
            senhaPerfil.focus();
        }, 360);
    });

    desbloquear.addEventListener("click", function(){
        if(senhaPerfil.value === SENHA_CORRETA){
            liberarCatalogo();
        }else{
            senhaIncorreta();
        }
    });

    senhaPerfil.addEventListener("input", function(){
        const mensagemSenha = document.getElementById("mensagemSenha");
        mensagemSenha.textContent = "Dica: a senha tem 3 números.";
        if(senhaPerfil.value.length === 3){
            senhaPerfil.classList.add("digitando");
            setTimeout(function(){
                senhaPerfil.classList.remove("digitando");
            }, 300);
        }
    });

    senhaPerfil.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            desbloquear.click();
        }
    });

    document.getElementById("assistirDestaque").addEventListener("click", function(){
        assistir("Homem-Aranha: De Volta ao Lar");
    });

    document.getElementById("listaDestaque").addEventListener("click", function(){
        favoritar("Homem-Aranha: De Volta ao Lar");
    });
}

function assistir(nome){
    alert("Reproduzindo: " + nome);
}

function favoritar(nome){
    minhaLista.add(nome);
    renderizarMinhaLista();
    document.getElementById("minha-lista").scrollIntoView({ behavior:"smooth", block:"start" });
}

function removerFavorito(nome){
    minhaLista.delete(nome);
    renderizarMinhaLista();
}

mostrar();
configurarEntrada();
