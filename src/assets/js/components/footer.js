// Função para adicionar o HTML ao DOM
function adicionarLoginAoDOM() {
  var div = document.createElement("div");
  div.innerHTML = `
<!-- Footer -->
<footer id="Footer" class="bg-dark text-light py-5">
    <div class="container">
        <div class="row g-4">
            <!-- Sobre Nós -->
            <div class="col-md-4">
                <h5>Sobre Nós</h5>
                <p class="small">
                    O Grupo WG Convênios foi fundado em Itaquaquecetuba/SP na transição dos anos 1980,
                    com a missão de reduzir as desigualdades sociais. Oferecemos serviços funerários dignos,
                    antecipando custos e garantindo acolhimento, respeito e segurança para nossos clientes.
                </p>
            </div>

            <!-- Espaço vazio para centralizar o contato na extrema direita -->
            <div class="col-md-4 d-none d-md-block"></div>

            <!-- Contato alinhado à esquerda dos ícones -->
            <div class="col-md-4 d-flex flex-column align-items-start">
                <ul class="list-unstyled" style="font-size: 1.1rem;">
                    <li class="mb-2 d-flex align-items-center gap-2">
                        <h5 class="fw-bold mb-0" style="font-size: 1.6rem;">Contato</h5>
                    </li>
                    <li class="mb-2 d-flex align-items-center gap-2">
                        <i class="fas fa-envelope me-2"></i>
                        <span>wgconvenio@uol.com.br</span>
                    </li>
                    <li class="mb-2 d-flex align-items-center gap-2">
                        <i class="fas fa-phone me-2"></i>
                        <span>+55 11 98105-0511</span>
                    </li>
                    <li class="mb-2 d-flex align-items-center gap-2">
                        <i class="fas fa-map-marker-alt me-2"></i>
                        <span>
                            R. Uberlândia, 220 - Vila Virginia,<br>
                            Itaquaquecetuba/SP
                        </span>
                    </li>
                    <li class="mb-2 d-flex align-items-center gap-2">
                        <i class="fas fa-id-card me-2"></i>
                        <span>CNPJ: 58.980.426/0001-39</span>
                    </li>
                </ul>
            </div>
        </div>

        <hr class="my-4">

        <!-- Bottom Row -->
        <div class="row align-items-center">
            <div class="col-md-6 footer-bottom-text">
                <p class="mb-1">&copy; 2025 WG - Grupo de Convênios Funerários. Todos os direitos reservados.</p>
                <p class="mb-0">Desenvolvido por <a href="https://github.com/eduardodossantosferreira" target="_blank">Eduardo dos Santos Ferreira</a></p>
            </div>

            <div class="col-md-6 text-md-end social-icons d-flex justify-content-md-end align-items-center gap-3">
                <a href="https://www.facebook.com/wgconvenio/" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/wgconvenio/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="./admin/securaty.html" aria-label="Login do administrador">
                    <i class="fas fa-user-circle text-light" style="font-size: 1.8rem;"></i>
                </a>
            </div>
        </div>

        <!-- Verificações -->
        <div class="row mt-4">
            <div class="col text-center">
                <div class="d-flex flex-wrap justify-content-center gap-4 verification-section">
                    <div class="verification-item">
                        <i class="fas fa-shield-alt text-success fa-2x"></i>
                        <span>Site Blindado</span>
                    </div>
                    <div class="verification-item">
                        <i class="fas fa-smile text-warning fa-2x"></i>
                        <span>98% Satisfação</span>
                    </div>
                    <div class="verification-item">
                        <i class="fas fa-star text-warning fa-2x"></i>
                        <span>4.7/5.0 Avaliação</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
    `;

  document.body.appendChild(div);
}

adicionarLoginAoDOM();
