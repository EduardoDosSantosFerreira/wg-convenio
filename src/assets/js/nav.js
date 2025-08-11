document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  navbar.style.transition = "top 0.8s ease, opacity 0.8s ease";
  navbar.classList.add("hidden");

  setTimeout(() => {
    navbar.classList.remove("hidden");
    setTimeout(() => {
      navbar.style.transition =
        "top 0.3s ease-in-out, opacity 0.3s ease-in-out";
    }, 800);
  }, 100);

  aplicarPreferencias();
});

let prevScrollPos = window.pageYOffset;
window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector(".navbar");

  if (prevScrollPos < currentScrollPos) {
    navbar.style.top = "-100px";
    navbar.style.opacity = "0";
    navbar.style.pointerEvents = "none";
  } else {
    navbar.style.top = "0";
    navbar.style.opacity = "1";
    navbar.style.pointerEvents = "auto";
  }

  prevScrollPos = currentScrollPos;
});

function ajustarFonte(incremento) {
  const html = document.documentElement;
  const estiloAtual = window.getComputedStyle(html).fontSize;
  const tamanhoAtual = parseFloat(estiloAtual);
  let novoTamanho = tamanhoAtual + incremento;

  if (novoTamanho < 12) novoTamanho = 12;
  if (novoTamanho > 24) novoTamanho = 24;

  html.style.fontSize = `${novoTamanho}px`;
  localStorage.setItem("tamanhoFonte", novoTamanho);
}

function toggleDarkMode(button = null) {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  localStorage.setItem("modoEscuro", isDark);

  if (button) {
    button.setAttribute("aria-pressed", isDark);
  }

  atualizarTextoModoEscuro(isDark);
}

function atualizarTextoModoEscuro(isDark) {
  const textoBtn = document.querySelector("#modoEscuroTexto");
  if (textoBtn) {
    textoBtn.textContent = isDark ? "Modo Claro" : "Modo Escuro";
  }
}

function aplicarPreferencias() {
  const fonteSalva = localStorage.getItem("tamanhoFonte");
  if (fonteSalva) {
    document.documentElement.style.fontSize = `${fonteSalva}px`;
  }

  const modoEscuro = localStorage.getItem("modoEscuro") === "true";

  if (modoEscuro) document.body.classList.add("dark-mode");

  atualizarTextoModoEscuro(modoEscuro);
}
