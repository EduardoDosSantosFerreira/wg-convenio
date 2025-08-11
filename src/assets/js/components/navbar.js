// Função para adicionar o HTML ao DOM
function adicionarLoginAoDOM() {
  var div = document.createElement("div");
  div.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
  <div class="container">

    <!-- Logo da Empresa -->
    <a class="navbar-brand d-flex align-items-center" href="#" style="padding: 0;">
      <img 
        src="./src/assets/img/logos/logo.png" 
        alt="Logotipo WG Convênios" 
        style="width: 100px; height: auto; max-width: 80vw;"
        class="me-2 logo-navbar-img"
      >
    </a>

    <!-- Botão de navegação responsiva -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegação">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Itens do menu -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto gap-2">
        <li class="nav-item"><a class="nav-link" href="index.html">Início</a></li>
        <li class="nav-item"><a class="nav-link" href="index.html#SobreNos">Quem Somos</a></li>
        <li class="nav-item"><a class="nav-link" href="src/pages/planos.html">Planos</a></li>
        <li class="nav-item"><a class="nav-link" href="src/pages/beneficios.html">Benefícios</a></li>
        <li class="nav-item"><a class="nav-link" href="src/pages/clinicas.html">Clínicas Credenciadas</a></li>
        <li class="nav-item"><a class="nav-link" href="src/pages/contato.html">Contato</a></li>
        
        <!-- Portal do Cliente: dropdown -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="portalClienteDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          </i> Portal do Cliente
          </a>
          <ul class="dropdown-menu" aria-labelledby="portalClienteDropdown">
            <li><a class="dropdown-item" href="src/pages/portal.html"><i class="fas fa-user me-2"></i>Área do Cliente</a></li>
            <li><a class="dropdown-item" href="src/pages/portal-familia.html"><i class="fas fa-users me-2"></i>Portal Família</a></li>
            <li><a class="dropdown-item" href="./admin/blog.html"><i class="fas fa-blog me-2"></i>Blog</a></li>
          </ul>
        </li>

        <li id="whats" class="nav-item">
          <a class="nav-link btn btn-success text-white ms-2 d-flex align-items-center gap-1" href="https://wa.me/5511981050511" target="_blank" aria-label="WhatsApp">
            <i class="fab fa-whatsapp fs-5"></i> WhatsApp
          </a>
        </li>

        <!-- Acessibilidade: botão dropdown -->
        <li class="nav-item dropdown ms-3">
          <button class="btn btn-outline-dark btn-sm dropdown-toggle d-flex align-items-center gap-2" id="acessibilidadeBtn" data-bs-toggle="dropdown"
            aria-expanded="false" title="Acessibilidade" aria-haspopup="true" aria-controls="acessibilidadeMenu">
            <i class="fas fa-universal-access fs-5"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow rounded p-2" aria-labelledby="acessibilidadeBtn" id="acessibilidadeMenu" style="min-width: 220px;">
            <li>
              <button class="dropdown-item d-flex align-items-center gap-2" onclick="ajustarFonte(-1)" aria-label="Diminuir fonte">
                <i class="fas fa-search-minus"></i> Diminuir Fonte
              </button>
            </li>
            <li>
              <button class="dropdown-item d-flex align-items-center gap-2" onclick="ajustarFonte(1)" aria-label="Aumentar fonte">
                <i class="fas fa-search-plus"></i> Aumentar Fonte
              </button>
            </li>
            <li>
            <button class="dropdown-item d-flex align-items-center gap-2" onclick="toggleDarkMode()">
             <i class='bx bx-moon'></i> <span id="modoEscuroTexto">Modo Escuro</span>
            </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

      `;

  document.body.appendChild(div);
}

adicionarLoginAoDOM();
