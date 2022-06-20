//Verificar se o email foi preenchido:

// Capturar os elementos do html para o JS
let inputNome = document.querySelector('#registro > form input[type=text]');
let inputEmail = document.querySelector('#registro > form input[type=email]');
let inputSenha = document.querySelector('#registro > form input[type=password]');
let inputFile = document.querySelector('#registro > form input[type=file]');
let form = document.getElementById('formularioCadastro');
let imgOutputRegister = document.querySelector("#output");

//Associar ao evento "perdeu o foco", uma função
// Avisar ao usuário que o campo de email foi deixado em branco.
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

    //Mostrar a div da aplicação
    document.querySelector("#app").style.display = "block";


    //Preencher os locais com as informações do usuário.
    //Nome
    document.getElementById('app-nome').innerText = usuario.nome;

    //Email
    const appEmail = document.getElementById('app-email');
    appEmail.email.innerText = usuario.email;
    appEmail.setAttribute("href", `mailto:${usuario.email}`);

    //Imagem
    let imgAvatar = document.getElementById('app-avatar');
    imgAvatar.setAttribute("alt", `Foto de ${usuario.nome}`);
    imgAvatar.setAttribute("src", `img/avatares/${usuario.foto}`);

}