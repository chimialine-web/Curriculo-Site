document.addEventListener('DOMContentLoaded', () => {
    inicializarFormularioContato();
});

/*VALIDAÇÕES*/

function validarNome(nome) {
    if (nome === "") {
        return "Digite o seu nome.";
    } else if (nome.length < 3) {
        return "O nome precisa ter pelo menos 3 letras.";
    } else {
        return "";
    }
}

function validarEmail(email) {
    if (email === "") {
        return "Digite o seu e-mail.";
    } else if (email.includes("@") === false) {
        return "O e-mail precisa ter @.";
    } else if (email.includes(".") === false) {
        return "O e-mail precisa ter um ponto, como em .com.";
    } else {
        return "";
    }
}

function validarAssunto(assunto) {
    if (assunto === "") {
        return "Escolha um assunto.";
    } else {
        return "";
    }
}

function validarMensagem(mensagem) {
    if (mensagem === "") {
        return "Escreva a sua mensagem.";
    } else if (mensagem.length < 10) {
        return "A mensagem precisa ter pelo menos 10 letras.";
    } else {
        return "";
    }
}

/*FORMULÁRIO DE CONTATO*/

function inicializarFormularioContato() {
    const formulario = document.querySelector("#formContato");
    if (!formulario) return;

    const campoNome = document.querySelector("#campoNome");
    const campoEmail = document.querySelector("#campoEmail");
    const campoAssunto = document.querySelector("#campoAssunto");
    const campoMensagem = document.querySelector("#campoMensagem");
    const aviso = document.querySelector("#avisoFormulario");

    function mostrarAviso(texto, tipo) {
        aviso.textContent = texto;
        aviso.classList.remove("erro");
        aviso.classList.remove("certo");
        aviso.classList.add(tipo);
    }

    function enviarMensagem(evento) {
        evento.preventDefault();

        const nome = campoNome.value.trim();
        const email = campoEmail.value.trim();
        const assunto = campoAssunto.value;
        const mensagem = campoMensagem.value.trim();

        const erroNome = validarNome(nome);
        const erroEmail = validarEmail(email);
        const erroAssunto = validarAssunto(assunto);
        const erroMensagem = validarMensagem(mensagem);

        if (erroNome !== "") {
            mostrarAviso(erroNome, "erro");
        } else if (erroEmail !== "") {
            mostrarAviso(erroEmail, "erro");
        } else if (erroAssunto !== "") {
            mostrarAviso(erroAssunto, "erro");
        } else if (erroMensagem !== "") {
            mostrarAviso(erroMensagem, "erro");
        } else {
            const corpo = `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`;
            const link = `mailto:chimialine@gmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

            mostrarAviso(`Quase lá, ${nome}! Seu app de e-mail vai abrir para você enviar.`, "certo");
            window.location.href = link;
            formulario.reset();
        }
    }

    formulario.addEventListener("submit", enviarMensagem);
}