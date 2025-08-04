// Função para adicionar o HTML ao DOM
function adicionarLoginAoDOM() {
  var div = document.createElement("div");
  div.innerHTML = `
      <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
  <div class="container">
    
    <!-- Logo da Empresa -->
    <a class="navbar-brand d-flex align-items-center" href="#" style="padding: 0;">
      <img 
        src="../assets/img/logos/logo.png" 
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
        <li class="nav-item"><a class="nav-link" href="../../index.html">Início</a></li>
        <li class="nav-item"><a class="nav-link" href="../../index.html#SobreNos">Quem Somos</a></li>
        <li class="nav-item"><a class="nav-link" href="../pages/planos.html">Planos</a></li>
        <li class="nav-item"><a class="nav-link" href="../pages/beneficios.html">Benefícios</a></li>
        <li class="nav-item"><a class="nav-link" href="../pages/clinicas.html">Clínicas Credenciadas</a></li>
        <li class="nav-item"><a class="nav-link" href="../pages/contato.html">Contato</a></li>    

        <!-- Portal do Cliente: dropdown -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="portalClienteDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false" aria-haspopup="true" aria-controls="menuPortalCliente">
            Portal do Cliente
          </a>
          <ul class="dropdown-menu" aria-labelledby="portalClienteDropdown" id="menuPortalCliente" role="menu">
            <li role="none"><a class="dropdown-item" href="../pages/portal.html" role="menuitem"><i class="fas fa-user me-2" aria-hidden="true"></i>Área do Cliente</a></li>
            <li role="none"><a class="dropdown-item" href="../pages/portal-familia.html" role="menuitem"><i class="fas fa-users me-2" aria-hidden="true"></i>Portal Família</a></li>
            <li><a class="dropdown-item" href="../../admin/blog.html"><i class="fas fa-blog me-2"></i>Blog</a></li>
          </ul>
        </li>

        <!-- Botão WhatsApp -->
        <li class="nav-item">
          <a class="nav-link btn btn-success text-white ms-2 d-flex align-items-center gap-1" href="https://wa.me/5511981050511" target="_blank" aria-label="WhatsApp">
            <i class="fab fa-whatsapp fs-5" aria-hidden="true"></i> WhatsApp
          </a>
        </li>

        <!-- Acessibilidade: botão dropdown -->
        <li class="nav-item dropdown ms-3">
          <button class="btn btn-outline-dark btn-sm dropdown-toggle d-flex align-items-center gap-2"
                  id="acessibilidadeBtn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-haspopup="menu"
                  aria-controls="acessibilidadeMenu"
                  title="Acessibilidade">
            <i class="fas fa-universal-access fs-5" aria-hidden="true"></i>
            <span class="visually-hidden">Abrir menu de acessibilidade</span>
          </button>

          <ul class="dropdown-menu dropdown-menu-end shadow rounded p-2"
              id="acessibilidadeMenu"
              aria-labelledby="acessibilidadeBtn"
              role="menu"
              style="min-width: 220px;">
            <li role="none">
              <button class="dropdown-item d-flex align-items-center gap-2"
                      onclick="ajustarFonte(-1)"
                      aria-label="Diminuir fonte"
                      role="menuitem">
                <i class="fas fa-search-minus" aria-hidden="true"></i> Diminuir Fonte
              </button>
            </li>
            <li role="none">
              <button class="dropdown-item d-flex align-items-center gap-2"
                      onclick="ajustarFonte(1)"
                      aria-label="Aumentar fonte"
                      role="menuitem">
                <i class="fas fa-search-plus" aria-hidden="true"></i> Aumentar Fonte
              </button>
            </li>
            <li role="none">
              <button class="dropdown-item d-flex align-items-center gap-2"
                      onclick="toggleDarkMode(this)"
                      aria-pressed="false"
                      aria-label="Alternar modo escuro"
                      role="menuitem">
                <i class="bx bx-moon" aria-hidden="true"></i> <span id="modoEscuroTexto">Modo Escuro</span>
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