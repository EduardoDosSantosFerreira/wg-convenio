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

            <!-- Links Rápidos -->
            <div class="col-md-4">
                <h5>Links Rápidos</h5>
                <ul class="list-unstyled">
                    <li><a href="#">Início</a></li>
                    <li><a href="#servicos">Serviços</a></li>
                    <li><a href="#sobre">Sobre Nós</a></li>
                    <li><a href="pages/politica.html">Política de Privacidade</a></li>
                </ul>
            </div>

            <!-- Contato -->
            <div class="col-md-4">
                <h5>Contato</h5>
                <ul class="list-unstyled">
                    <li><i class="fas fa-envelope"></i> wgconvenio@uol.com.br</li>
                    <li><i class="fas fa-phone"></i> +55 11 98105-0511</li>
                    <li><i class="fas fa-map-marker-alt"></i> R. Uberlândia, 220 - Vila Virginia, Itaquaquecetuba/SP</li>
                    <li><i class="fas fa-id-card"></i> CNPJ: 58.980.426/0001-39</li>
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
                <a href="../../../../../wg-convenio/admin/securaty.html" aria-label="Login do administrador">
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
