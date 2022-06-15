//Verificar se o email foi preenchido:

// Capturar os elementos do html para o JS
let inputNome = document.querySelector('#registro > form input[type=text]');
let inputEmail = document.querySelector('#registro > form input[type=email]');
let inputSenha = document.querySelector('#registro > form input[type=password]');
let inputFile = document.querySelector('#registro > form input[type=file]');
let form = document.getElementById('formularioCadastro');


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
    let img = document.getElementById("output");
    img.src = URL.createObjectURL(event.target.files[0]);
   /*  img.style.marginTop = "20px" */
};

inputEmail.addEventListener("blur", verificaCampoPreenchido);
inputSenha.addEventListener("blur", verificaCampoPreenchido);
inputFile.addEventListener("change", onFileChange);

let corpoDaRequisicao = {
    nome: inputNome.value,
    email: inputEmail.value,
    senha: inputSenha.value
}

//Adicionando evento de submit no form (quando clicar em entrar ou teclar enter, ele irá capturar);
form.addEventListener("submit", (evt) => {
    //Impedir o formulário de ser enviado
    evt.preventDefault();
    
    //Levantando os dados do formulário:
    // let formData = new FormData(form);

    //window.fetch() || fetch();
    // 2 parâmetros: 1º endereço, 2º os dados.
    fetch('http://localhost:3000/api/v1/usuarios', 
    {
        method: 'POST',
        body: JSON.stringify(corpoDaRequisicao),
        headers: {'Content-Type': 'application/json'}
    });


});