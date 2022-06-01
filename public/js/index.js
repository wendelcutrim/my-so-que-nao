//Verificar se o email foi preenchido:

// Capturar o elemento input do email
let inputEmail = document.querySelector('#registro > form input[type=email]');
let inputSenha = document.querySelector('#registro > form input[type=password]');
let inputFile = document.querySelector('#registro > form input[type=file]');


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
}

const onFileChange = event => {
    let img = document.getElementById("output");
    img.src = URL.createObjectURL(event.target.files[0]);
   /*  img.style.marginTop = "20px" */
}

inputEmail.addEventListener("blur", verificaCampoPreenchido);
inputSenha.addEventListener("blur", verificaCampoPreenchido);
inputFile.addEventListener("change", onFileChange)

