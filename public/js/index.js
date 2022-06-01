//Verificar se o email foi preenchido:

// Capturar o elemento input do email
let inputEmail = document.querySelector('#registro > form input[type=email]');
console.log(inputEmail);

//Associar ao evento "perdeu o foco", uma função
// Avisar ao usuário que o campo de email foi deixado em branco.
const verificaCampoPreenchido = () => {
    if(inputEmail.value == "") {
        inputEmail.style.outline = "4px solid #663300";
        inputEmail.setAttribute("placeholder", "Digite o e-mail");
    } else{
        inputEmail.style.outline = "none";
        inputEmail.setAttribute("placeholder", "")

    }
}

inputEmail.addEventListener("blur", verificaCampoPreenchido);

