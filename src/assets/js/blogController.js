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

// Inicialização
loadPosts();

function loadPosts() {
  loadingPosts.style.display = 'block';
  feed.innerHTML = '';

  const q = query(collection(db, "posts"), orderBy("criadoEm", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    loadingPosts.style.display = 'none';

    if (snapshot.empty) {
      feed.innerHTML = '<div class="alert alert-info">Nenhuma postagem encontrada.</div>';
      return;
    }

    console.log("Snapshot size:", snapshot.size);
    snapshot.docs.forEach(doc => {
      console.log("Post:", doc.data());
    });

    feed.innerHTML = snapshot.docs.map(doc => createPostElement(doc)).join('');
  }, (error) => {
    console.error("Erro:", error);
    loadingPosts.style.display = 'none';
    feed.innerHTML = '<div class="alert alert-danger">Erro ao carregar postagens.</div>';
  });

  return unsubscribe;
}

function createPostElement(doc) {
  const post = doc.data();
  const dataFormatada = formatDate(post.criadoEm);
  const imagem = post.imagem || 'https://via.placeholder.com/800x400?text=Sem+Imagem';

  return `
    <div class="post">
      <img src="${imagem}" alt="Imagem da postagem" onerror="this.src='https://via.placeholder.com/800x400?text=Imagem+não+carregada'" />
      <div class="post-content">
        <p>${post.texto || ''}</p>
        <div class="post-date">
          <i class="bi bi-clock"></i> ${dataFormatada}
        </div>
      </div>
    </div>
  `;
}

function formatDate(timestamp) {
  if (!timestamp) return 'Data desconhecida';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString('pt-BR');
}
