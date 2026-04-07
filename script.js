// FILMES
let filmes = [

    {
    titulo: "Interestellar",
    imagem: "Imagens/Interstellar_Filme.png",
    descricao: "Um grupo de astronautas viaja através de um buraco de minhoca em busca de um novo lar para a humanidade."
    }
    
    ];
    
    // SÉRIES
    let series = [
    
    {
    titulo: "Stranger Things",
    imagem: "Imagens/StrangerThings_Filme.jpg",
    descricao: "Um grupo de crianças enfrenta forças sobrenaturais e experimentos secretos em uma pequena cidade."
    }

    
    ];
    
    function mostrar(){
    
    let listaFilmes = document.getElementById("listaFilmes");
    let listaSeries = document.getElementById("listaSeries");
    
    filmes.forEach(function(f){
    
    listaFilmes.innerHTML += `
    <div class="card">
    <img src="${f.imagem}">
    <h3>${f.titulo}</h3>
    <p>${f.descricao}</p>
    </div>
    `;
    
    });
    
    series.forEach(function(s){
    
    listaSeries.innerHTML += `
    <div class="card">
    <img src="${s.imagem}">
    <h3>${s.titulo}</h3>
    <p>${s.descricao}</p>
    </div>
    `;
    
    });
    
    }
    
    mostrar();



