console.log("Tudo que o meu javascript quiser!");

//Criando um array de amigos
let amigos = [{
        id: 1,
        nome: "Wendel Cutrim",
        email: "wendel@digitalhouse.com",
        foto: `http://lorempixel.com.br/500/400/?${Math.random() + 1}`
    },
    {
        id: 2,
        nome: "Sérgio Moura",
        email: "ssiqueira@digitalhouse.com",
        foto: `http://lorempixel.com.br/500/400/?${Math.random() + 1}`
    },
    {
        id: 3,
        nome: "Silvia Fiacador",
        email: "silvia@digitalhouse.com",  
        foto: `http://lorempixel.com.br/500/400/?${Math.random() + 1}`
    },
    {
        id: 4,
        nome: "Willian Paulino",
        email: "will@digitalhouse.com",  
        foto: `http://lorempixel.com.br/500/400/?${Math.random() + 1}`
    }
]

//Localizar/carregar elementos do HTML aqui para o mundo JS.
//Exemplo: Carregar elemento que mostra a lista de amigos
let listaDeAmigos = document.getElementById('listaDeAmigos');
console.log(listaDeAmigos);

// 1 - Criar uma string com a estrutura html que exiba um usuário

let string = "";
/* for (let i = 0; i < amigos.length; i++) {
    const amigo = amigos[i];
    string += `
    <article>
          <img src="img/${amigo.foto}" alt="${amigo.nome}">
          <span>${amigo.nome}</span>
          <a href="mailto:${amigo.email}">${amigo.email}</a>
    </article>
    `;
}; */

amigos.forEach(amigo => {
    string += `
    <article>
        <img src="${amigo.foto}" alt="${amigo.nome}">
        <span>${amigo.nome}</span>
        <a href="mailto:${amigo.email}">${amigo.email}</a>
    </article>
    `
})
console.log(string);

//2 - Injetar essa string no elemento lista de amigos

listaDeAmigos.innerHTML = string;

//Alterar elementos:
//Exemplo 1: Sumindo o corpo da página
// document.body.innerHTML = "Essa página foi hackeada"

//Remover elementos

//Criar elementos

