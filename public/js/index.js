// Capturar os elementos do html para o JS
let inputNome = document.querySelector('#registro > form input[type=text]');
let inputEmail = document.querySelector('#registro > form input[type=email]');
let inputSenha = document.querySelector('#registro > form input[type=password]');
let inputConfirmacao = document.querySelector('#registro > form input[name=confirmacao]');
let inputFile = document.querySelector('#registro > form input[type=file]');
let form = document.getElementById('formularioCadastro');
let imgOutputRegister = document.querySelector("#output");
let formLogin = document.querySelector("#formularioLogin");
let divLogin = document.querySelector("#login");
let linkLogin = document.getElementById("link-login");
let linkRegistro = document.getElementById("link-registro");
let formNovaPublicacao = document.getElementById("formNovaPublicacao");
let listaDeAmigos = document.getElementById("listaDeAmigos");

//Associar ao evento "perdeu o foco", uma função
// Avisar ao usuário que o campo de email foi deixado em branco.

function onLinkRegistroClick(event){
    event.preventDefault();
    mostrarRegistro();
}

function onLinkLoginClick(event){
    event.preventDefault();
    mostrarLogin();
}

function mostrarRegistro(){
    document.querySelector("#registro").style.display = "block";
    document.querySelector("#login").style.display = "none";
    document.querySelector("#app").style.display = "none";
}

function mostrarLogin(){
    document.querySelector("#registro").style.display = "none";
    document.querySelector("#login").style.display = "block";
    document.querySelector("#app").style.display = "none";
}


const verificaCampoPreenchido = (event) => {
    console.log(event);
    
    if(event.target.value == "") {
        event.target.style.outline = "4px solid #663300";
        event.target.setAttribute("placeholder", `Preencha o campo: ${event.target.name}`);
    } else{
        event.target.style.outline = "none";
        event.target.setAttribute("placeholder", "")

    }
};

const onFileChange = event => {
    imgOutputRegister.style.display = "block";
    let img = document.getElementById("output");
    img.src = URL.createObjectURL(event.target.files[0]);
   /*  img.style.marginTop = "20px" */
};

inputNome.addEventListener("blur", verificaCampoPreenchido);
inputEmail.addEventListener("blur", verificaCampoPreenchido);
inputSenha.addEventListener("blur", verificaCampoPreenchido);
inputFile.addEventListener("change", onFileChange);
linkRegistro.addEventListener("click", onLinkRegistroClick);
linkLogin.addEventListener("click", onLinkLoginClick);


/* let corpoDaRequisicao = {
    nome: inputNome.value,
    email: inputEmail.value,
    senha: inputSenha.value
} */


//Adicionando evento de submit no form (quando clicar em entrar ou teclar enter, ele irá capturar);
form.addEventListener("submit", 
    async (evt) => {
        //Impedir o formulário de ser enviado
        evt.preventDefault();

        //Pegando os dados do formulário
        let formData = new FormData(form);

        //window.fetch() || fetch();
        // 2 parâmetros: 1º endereço, 2º os dados.
        //Enviando o formData para o servidor.
        let response = await fetch('http://localhost:3000/api/v1/usuarios', 
        {
            method: 'POST',
            body: formData,
            // headers: {'Content-Type': 'multipart/form-data'}
        });

        if(response.status == 409){alert("Usuário já cadastrado")};
        if(response.status == 500){alert("Servidor indisponível")};
        if(response.status == 201){
            let usuario = await response.json();
            mostrarApp(usuario);
        };

});

//Vai esconder a div do registro, mostrar a div do APP e preencher o campo contaienr com as informações do usuário.
function mostrarApp(usuario){
    console.log(usuario);
    //Esconder a div de registro
    document.querySelector("#registro").style.display = "none";
    document.querySelector("#login").style.display = "none";

    //Mostrar a div da aplicação
    document.querySelector("#app").style.display = "block";


    //Preencher os locais com as informações do usuário.
    //Nome
    document.getElementById('app-nome').innerText = usuario.nome;

    //Email
    const appEmail = document.getElementById('app-email');
    appEmail.innerText = usuario.email;
    appEmail.setAttribute("href", `mailto:${usuario.email}`);

    //Imagem
    let imgAvatar = document.getElementById('app-avatar');
    imgAvatar.setAttribute("alt", `Foto de ${usuario.nome}`);
    imgAvatar.setAttribute("src", `img/avatares/${usuario.foto}`);

}

//Função para logar o usuário
formLogin.addEventListener("submit", onFormLoginsubmit);

function onFormLoginsubmit(evt){
    evt.preventDefault();
    login();
}

async function login() {
    let email = document.getElementById('login-email').value;
    let senha = document.getElementById('login-senha').value;

    let response = await fetch("http://localhost:3000/api/v1/usuarios/login", {
        method: 'POST',
        body: JSON.stringify({email, senha}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //Verificar se o status da resposta é 200.
    if(response.status == 200){
        //Extraindo dados da response
        let corpoDaResposta = await response.json();
        // Salvar o token no localstorage
        sessionStorage.setItem('token', corpoDaResposta.token);
        sessionStorage.setItem('usuario', JSON.stringify(corpoDaResposta.usuario));
        //Mudar para a página interna
        mostrarApp(corpoDaResposta.usuario);

        //Carregar amigos do usuário
        loadAmigos();
    }
    
}

async function loadAmigos(){
    //disparar resuisição para get/amigos
    let response = await fetch('http://localhost:3000/api/v1/amigos', 
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    );
    let amigos = await response.json();
    console.log(amigos);
    mostrarAmigos(amigos);
    //exibir os amigos do usuário na tela.
}

function mostrarAmigos(amigos){
    let string = "";
    amigos.forEach(amigo => {
        string +=`
        <article>
            <img src="img/avatares/${amigo.foto}" alt="Foto de ${amigo.nome}">
            <span>${amigo.nome}</span>
            <a href="mailto:${amigo.email}">${amigo.email}</a>
        </article>
        `
    });
    listaDeAmigos.innerHTML = string;
}