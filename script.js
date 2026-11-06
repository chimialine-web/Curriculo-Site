document.addEventListener('DOMContentLoaded', () => {
  inicializarTema();
  inicializarHora();
  inicializarMusica();
  inicializarCursorPersonalizado();
  inicializarOlhosObservadores();
  inicializarRastroBolhas();
  inicializarMenuMobile();
});

/*MODO CLARO E ESCURO*/

function inicializarTema() {
  const pagina = document.body;
  const botaoTema = document.querySelector("#botaoTema, .botao-tema");
  const textoTema = document.querySelector("#textoTema");
  const iconeTema = document.querySelector("#botaoTema i");
  const rotuloSistema = document.querySelector("#rotuloSistema");

  if (!botaoTema) return;

  function aplicarVisuais(escuro) {
    if (escuro) {
      pagina.classList.add("modo-escuro");
      if (textoTema) textoTema.textContent = "⚠️";
      if (iconeTema) iconeTema.className = "fa-solid fa-sun";
      if (rotuloSistema) rotuloSistema.textContent = "Sistema: Weirdcore // Noite Ativa";
    } else {
      pagina.classList.remove("modo-escuro");
      if (textoTema) textoTema.textContent = "🫧";
      if (iconeTema) iconeTema.className = "fa-solid fa-moon";
      if (rotuloSistema) rotuloSistema.textContent = "Sistema: Frutiger Aero // Dia Ativo";
    }
  }

  const temaSalvo = localStorage.getItem("temaAline");
  if (temaSalvo === "escuro") {
    aplicarVisuais(true);
  }

  botaoTema.addEventListener("click", function () {
    const estaEscuro = !pagina.classList.contains("modo-escuro");
    aplicarVisuais(estaEscuro);
    localStorage.setItem("temaAline", estaEscuro ? "escuro" : "claro");
  });
}

function inicializarHora() {
  function atualizarHora() {
    const agora = new Date();
    const hora = agora.getHours();
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    const rodapeHora = document.querySelector(".rodape h6, #rodapeHora");
    if (rodapeHora) {
      rodapeHora.textContent = `Feito com HTML, CSS e JavaScript - ${hora}h${minutos}`;
    }
  }

  atualizarHora();
  setInterval(atualizarHora, 60000);
}

/*CONTROLE DE MÚSICA DA PÁGINA*/

function inicializarMusica() {
  const botaoMusica = document.querySelector('#botaoMusica');
  if (botaoMusica) {
    botaoMusica.addEventListener('click', alternarReproducaoMusica);
  }
}

function alternarReproducaoMusica() {
  const audio = document.querySelector('#audioFundo');
  const textoMusica = document.querySelector('#textoMusica');

  if (!audio) return;

  if (audio.paused) {
    audio.play().then(() => {
      textoMusica.textContent = '♬ˎˊ˗';
    }).catch(() => {
      textoMusica.textContent = '▶─•';
    });
  } else {
    audio.pause();
    textoMusica.textContent = '▶─•';
  }
}

/*CURSOR E RASTRO DO MOUSE*/

function inicializarCursorPersonalizado() {
  window.addEventListener('mousemove', moverCursor);
}

function moverCursor(evento) {
  const cursorRastro = document.querySelector('#cursorRastro');

  const x = evento.clientX;
  const y = evento.clientY;

  if (cursorRastro) {
    setTimeout(() => {
      cursorRastro.style.left = `${x}px`;
      cursorRastro.style.top = `${y}px`;
    }, 10);
  }
}

/* OLHOS QUE SEGUEM O MOUSE (MODO ESCURO) */

function inicializarOlhosObservadores() {
  const olhos = document.querySelectorAll('.olho');
  if (!olhos.length) return;

  window.addEventListener('mousemove', (evento) => {
    if (!document.body.classList.contains('modo-escuro')) return;

    const mouseX = evento.clientX;
    const mouseY = evento.clientY;

    olhos.forEach((olho) => {
      const pupila = olho.querySelector('.pupila');
      if (!pupila) return;

      const rect = olho.getBoundingClientRect();
      const olhoCentroX = rect.left + rect.width / 2;
      const olhoCentroY = rect.top + rect.height / 2;

      const deltaX = mouseX - olhoCentroX;
      const deltaY = mouseY - olhoCentroY;

      const angulo = Math.atan2(deltaY, deltaX);

      const distancia = Math.hypot(deltaX, deltaY);
      const raioMaximo = 7;
      const deslocamento = Math.min(raioMaximo, distancia / 16);

      const pupilaX = Math.cos(angulo) * deslocamento;
      const pupilaY = Math.sin(angulo) * deslocamento;

      pupila.style.transform = `translate(${pupilaX}px, ${pupilaY}px)`;
    });
  });

  iniciarPiscarNatural(olhos);
}
function iniciarPiscarNatural(olhos) {
  function piscar() {

    if (document.body.classList.contains('modo-escuro')) {
      olhos.forEach((olho) => olho.classList.add('piscando'));
      setTimeout(() => {
        olhos.forEach((olho) => olho.classList.remove('piscando'));
      }, 160);
    }

    const proximoIntervalo = Math.floor(Math.random() * 3500) + 3000;
    setTimeout(piscar, proximoIntervalo);
  }

  setTimeout(piscar, 3500);
}

/*RASTRO DE BOLHAS DE DIFERENTES TAMANHOS */

function inicializarRastroBolhas() {
  const conteiner = document.querySelector('#conteinerRastroBolhas');
  if (!conteiner) return;

  let ultimaPosicaoX = 0;
  let ultimaPosicaoY = 0;
  let ultimoMomento = 0;

  window.addEventListener('mousemove', (evento) => {
    const agora = Date.now();
    const x = evento.clientX;
    const y = evento.clientY;

    const distancia = Math.hypot(x - ultimaPosicaoX, y - ultimaPosicaoY);

    if (distancia > 14 && agora - ultimoMomento > 32) {
      criarBolha(x, y, conteiner);
      ultimaPosicaoX = x;
      ultimaPosicaoY = y;
      ultimoMomento = agora;
    }
  });
}

function criarBolha(x, y, conteiner) {
  const bolha = document.createElement('div');
  bolha.classList.add('bolha-cursor');

  const diametro = Math.floor(Math.random() * 23) + 8;

  const variacaoX = (Math.random() - 0.5) * 14;
  const variacaoY = (Math.random() - 0.5) * 14;

  const derivaX = (Math.random() - 0.5) * 28;

  const duracao = Math.floor(Math.random() * 350) + 750;

  bolha.style.width = `${diametro}px`;
  bolha.style.height = `${diametro}px`;
  bolha.style.left = `${x + variacaoX}px`;
  bolha.style.top = `${y + variacaoY}px`;
  bolha.style.setProperty('--desloc-x', `${derivaX}px`);
  bolha.style.setProperty('--duracao', `${duracao}ms`);

  conteiner.appendChild(bolha);

  bolha.addEventListener('animationend', () => {
    bolha.remove();
  }, { once: true });

  setTimeout(() => {
    if (bolha.parentElement) {
      bolha.remove();
    }
  }, duracao + 200);
}

/*MENU HAMBURGUER*/

const botaoMenu = document.querySelector("#botaoMenuMobile")
const menu = document.querySelector("#linksNavegacao")

function abrirMenu() {
  menu.classList.add("menu-aberto")
  botaoMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  botaoMenu.setAttribute("aria-expanded", "true")
}

function fecharMenu() {
  menu.classList.remove("menu-aberto")
  botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>'
  botaoMenu.setAttribute("aria-expanded", "false")
}

function alternarMenu() {
  if (menu.classList.contains("menu-aberto")) {
    fecharMenu()
  } else {
    abrirMenu()
  }
}

botaoMenu.addEventListener("click", alternarMenu)

menu.querySelectorAll(".link-menu").forEach((link) => {
  link.addEventListener("click", fecharMenu)
})