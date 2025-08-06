// src/assets/js/blogController.js
import {
  db,
  collection,
  query,
  orderBy,
  onSnapshot
} from '../../../admin/firebase/firebase.config.js';

const feed = document.getElementById('feed');
const loadingPosts = document.getElementById('loadingPosts');

const LIMITE_CARACTERES = 350;

criarModalImagem();

loadPosts();

function loadPosts() {
  loadingPosts.style.display = 'block';
  feed.innerHTML = '';

  const q = query(collection(db, "posts"), orderBy("criadoEm", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    loadingPosts.style.display = 'none';

    if (snapshot.empty) {
      feed.innerHTML = '<div class="alert alert-info text-center">Nenhuma postagem encontrada.</div>';
      return;
    }

    feed.innerHTML = snapshot.docs.map(doc => createPostElement(doc)).join('');

    document.querySelectorAll('.btn-leia-mais').forEach(btn => {
      btn.addEventListener('click', function () {
        const postId = this.getAttribute('data-id');
        const textoCompleto = this.getAttribute('data-texto');
        const textoContainer = this.closest('.card-body').querySelector('.card-text');
        textoContainer.innerHTML = textoCompleto;
        this.style.display = 'none';
      });
    });

    document.querySelectorAll('.card-img-top[data-img-full]').forEach(img => {
      img.addEventListener('click', function () {
        abrirModalImagem(this.getAttribute('data-img-full'));
      });
    });
  }, (error) => {
    console.error("Erro ao carregar postagens:", error);
    loadingPosts.style.display = 'none';
    feed.innerHTML = '<div class="alert alert-danger text-center">Erro ao carregar postagens.</div>';
  });

  return unsubscribe;
}

function createPostElement(doc) {
  const post = doc.data();
  const dataFormatada = formatDate(post.criadoEm);
  const imagem = post.imagem || 'https://via.placeholder.com/800x400?text=Sem+Imagem';
  const titulo = post.titulo || 'Postagem sem título';
  const texto = post.texto || '';
  const postId = doc.id;

  let textoHtml = '';
  if (texto.length > LIMITE_CARACTERES) {
    const textoCortado = texto.slice(0, LIMITE_CARACTERES).trim();
    textoHtml = `
      ${textoCortado}...
      <button class="btn btn-link btn-leia-mais p-0" data-id="${postId}" data-texto="${encodeHtml(texto)}" style="font-size:0.98em; color: #415ce1 !important;">Leia mais</button>
    `;
  } else {
    textoHtml = encodeHtml(texto);
  }

  // Adiciona data-img-full para identificar imagens clicáveis
  return `
    <div class="card post shadow-sm mb-4">
      <img src="${imagem}" class="card-img-top" alt="Imagem da postagem" data-img-full="${imagem}" style="cursor: zoom-in;" onerror="this.src='https://via.placeholder.com/800x400?text=Imagem+não+carregada'" />
      <div class="card-body">
        <h5 class="card-title text-primary">${encodeHtml(titulo)}</h5>
        <p class="card-text">${textoHtml}</p>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <small class="text-muted">
            <i class="bi bi-clock me-1"></i>${dataFormatada}
          </small>
        </div>
      </div>
    </div>
  `;
}

// Função para escapar HTML e evitar XSS
function encodeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return m;
    }
  }).replace(/\n/g, '<br>');
}

function formatDate(timestamp) {
  if (!timestamp) return 'Data desconhecida';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString('pt-BR');
}

// Cria o modal de visualização de imagem (apenas uma vez)
function criarModalImagem() {
  if (document.getElementById('modalImagemBlog')) return;
  const modalHtml = `
    <div class="modal fade" id="modalImagemBlog" tabindex="-1" aria-labelledby="modalImagemBlogLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-transparent border-0">
          <div class="modal-body p-0 d-flex justify-content-center align-items-center" style="background: rgba(0,0,0,0.85); border-radius: 10px;">
            <img id="imagemModalBlog" src="" alt="Visualização da imagem" style="max-width: 100%; max-height: 80vh; border-radius: 8px; box-shadow: 0 2px 16px rgba(0,0,0,0.3);" />
            <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Função para abrir o modal e mostrar a imagem em tamanho grande
function abrirModalImagem(url) {
  const img = document.getElementById('imagemModalBlog');
  if (img) {
    img.src = url;
    // Usa o Bootstrap Modal
    const modal = new bootstrap.Modal(document.getElementById('modalImagemBlog'));
    modal.show();
  }
}