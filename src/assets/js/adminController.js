import {
  auth, db,
  collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp,
  onAuthStateChanged, signOut
} from '../../../admin/firebase/firebase.config.js';
import { getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Elementos do DOM
const postForm = document.getElementById('postForm');
const imageFileInput = document.getElementById('imageFile');
const imagemInput = document.getElementById('imagem');
const previewImage = document.getElementById('previewImage');
const tituloInput = document.getElementById('titulo');
const textoInput = document.getElementById('texto');
const postIdInput = document.getElementById('postId');
const postList = document.getElementById('postList');
const cancelEditBtn = document.getElementById('cancelEdit');
const logoutBtn = document.getElementById('logoutBtn');
const submitBtn = document.getElementById('submitBtn');
const toastEl = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastEl);

// Elementos do gerenciador de postagens
const postsContainer = document.getElementById('postsContainer') || postList;
const postsSearch = document.getElementById('postsSearch');
const postsFilter = document.getElementById('postsFilter');
const totalPosts = document.getElementById('totalPosts');
const loadingPosts = document.getElementById('loadingPosts');
const emptyPosts = document.getElementById('emptyPosts');
const createFirstPostBtn = document.getElementById('createFirstPost');

// Configurações
let currentImageFile = null;
const cloudName = "dgptuckf6";
const unsignedUploadPreset = "Eduardo";
const LIMITE_CARACTERES = 200;
const URL_BLOG = "./blog.html";

// Estilos para a pré-visualização de imagem
const previewStyles = `
  .image-preview-container {
    position: relative;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .preview-image {
    max-width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: none;
  }
  .preview-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #adb5bd;
    padding: 2rem;
    text-align: center;
  }
  .preview-placeholder i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #dee2e6;
  }
  .upload-progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .image-dimensions {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgba(0,0,0,0.7);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
  }
  .image-preview-container:hover {
    background-color: #e9ecef;
  }
`;

// Adiciona os estilos ao head do documento
const styleElement = document.createElement('style');
styleElement.innerHTML = previewStyles;
document.head.appendChild(styleElement);

// Variáveis do gerenciador de postagens
let postsManager = {
  posts: [],
  filteredPosts: [],
  currentFilter: 'all',
  currentSearch: '',

  init: function () {
    this.setupEventListeners();
  },

  setupEventListeners: function () {
    if (postsSearch) {
      postsSearch.addEventListener('input', (e) => {
        this.currentSearch = e.target.value.trim().toLowerCase();
        this.filterAndRenderPosts();
      });
    }

    if (postsFilter) {
      postsFilter.addEventListener('change', (e) => {
        this.currentFilter = e.target.value;
        this.filterAndRenderPosts();
      });
    }

    if (createFirstPostBtn) {
      createFirstPostBtn.addEventListener('click', () => {
        document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  },

  updatePosts: function (posts) {
    this.posts = posts;
    this.updatePostsCount();
    this.filterAndRenderPosts();
  },

  updatePostsCount: function () {
    if (totalPosts) {
      totalPosts.textContent = this.posts.length;
    }
  },

  filterAndRenderPosts: async function () {
    this.showLoading();

    await new Promise(resolve => setTimeout(resolve, 200));

    try {
      this.filteredPosts = this.posts.filter(post => {
        const matchesSearch = !this.currentSearch ||
          (post.titulo && post.titulo.toLowerCase().includes(this.currentSearch)) ||
          (post.texto && post.texto.toLowerCase().includes(this.currentSearch));

        let matchesFilter = true;
        if (this.currentFilter === 'recent' && post.criadoEm) {
          matchesFilter = this.isRecentPost(post.criadoEm);
        } else if (this.currentFilter === 'oldest' && post.criadoEm) {
          matchesFilter = !this.isRecentPost(post.criadoEm);
        }

        return matchesSearch && matchesFilter;
      });

      this.renderPosts();

      if (this.filteredPosts.length === 0) {
        this.showEmptyState();
      } else {
        this.hideEmptyState();
      }
    } catch (error) {
      console.error("Erro ao filtrar postagens:", error);
    } finally {
      this.hideLoading();
    }
  },

  isRecentPost: function (timestamp) {
    try {
      const postDate = timestamp.toDate();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return postDate > sevenDaysAgo;
    } catch {
      return false;
    }
  },

  renderPosts: function () {
    if (!postsContainer) return;

    postsContainer.innerHTML = this.filteredPosts
      .map(post => this.createPostCard(post))
      .join('');

    this.setupPostActions();
  },

  createPostCard: function (post) {
    const formattedDate = formatDate(post.criadoEm);
    const updatedIndicator = post.atualizadoEm ? ' (atualizado)' : '';
    const excerpt = post.texto ?
      (post.texto.length > 100 ? post.texto.substring(0, 100) + '...' : post.texto) : '';

    return `
      <div class="post-card" data-id="${post.id}">
        <img src="${post.imagem || 'https://via.placeholder.com/300x180?text=Sem+Imagem'}" 
             alt="${post.titulo || 'Postagem sem título'}" 
             class="post-image"
             onerror="this.src='https://via.placeholder.com/300x180?text=Erro+na+Imagem'">
        <div class="post-body">
          <h3 class="post-title">${post.titulo || 'Sem Título'}</h3>
          <p class="post-excerpt">${excerpt}</p>
          <div class="post-meta">
            <span>${formattedDate}${updatedIndicator}</span>
          </div>
          <div class="post-actions">
            <button class="btn btn-sm btn-primary btn-edit">Editar</button>
            <button class="btn btn-sm btn-danger btn-delete">Excluir</button>
          </div>
        </div>
      </div>
    `;
  },

  setupPostActions: function () {
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const postId = btn.closest('.post-card').dataset.id;
        editPost(postId);
      });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const postId = btn.closest('.post-card').dataset.id;
        deletePost(postId);
      });
    });
  },

  showLoading: function () {
    if (loadingPosts) loadingPosts.classList.remove('d-none');
    if (postsContainer) postsContainer.classList.add('d-none');
  },

  hideLoading: function () {
    if (loadingPosts) loadingPosts.classList.add('d-none');
    if (postsContainer) postsContainer.classList.remove('d-none');
  },

  showEmptyState: function () {
    if (emptyPosts) emptyPosts.classList.remove('d-none');
    if (postsContainer) postsContainer.classList.add('d-none');
  },

  hideEmptyState: function () {
    if (emptyPosts) emptyPosts.classList.add('d-none');
    if (postsContainer) postsContainer.classList.remove('d-none');
  }
};

// Inicialização do sistema
init();

function init() {
  setupEventListeners();
  checkAuthState();
  postsManager.init();
}

function setupEventListeners() {
  imageFileInput.addEventListener('change', handleImageUpload);
  imagemInput.addEventListener('input', handleUrlInput);
  postForm.addEventListener('submit', handleFormSubmit);
  cancelEditBtn.addEventListener('click', cancelEdit);
  logoutBtn.addEventListener('click', handleLogout);
}

function checkAuthState() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "securaty.html";
      return;
    }
    loadPosts();
  });
}

async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', unsignedUploadPreset);
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    throw new Error('Falha no upload da imagem para Cloudinary');
  }
  const data = await response.json();
  return data.secure_url;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const titulo = tituloInput.value.trim();
  const texto = textoInput.value.trim();
  const postId = postIdInput.value;

  if (!titulo || !texto) {
    showToast('Preencha o título e a legenda!', 'warning');
    return;
  }

  if (!currentImageFile && !imagemInput.value.trim()) {
    showToast('Adicione uma imagem do PC ou insira uma URL!', 'warning');
    return;
  }

  try {
    toggleLoading(true);
    let imageUrl = imagemInput.value.trim();
    if (currentImageFile) {
      imageUrl = await uploadToCloudinary(currentImageFile);
    }

    const postData = {
      imagem: imageUrl,
      titulo,
      texto,
      atualizadoEm: serverTimestamp()
    };

    if (postId) {
      await updateDoc(doc(db, "posts", postId), postData);
      showToast('Postagem atualizada com sucesso!', 'success');
    } else {
      await addDoc(collection(db, "posts"), {
        ...postData,
        criadoEm: serverTimestamp()
      });
      showToast('Postagem criada com sucesso!', 'success');
    }

    resetForm();
    loadPosts();
  } catch (error) {
    console.error("Erro ao salvar postagem:", error);
    showToast(`Erro: ${error.message}`, 'danger');
  } finally {
    toggleLoading(false);
  }
}

async function loadPosts() {
  postsManager.showLoading();

  try {
    const q = query(collection(db, "posts"), orderBy("criadoEm", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      postsManager.updatePosts([]);
      return;
    }

    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    postsManager.updatePosts(posts);
  } catch (error) {
    console.error("Erro ao carregar postagens:", error);
    showToast(`Erro ao carregar postagens: ${error.message}`, 'danger');
  }
}

function formatarTextoComLeiaMais(texto, postId) {
  if (!texto) return '';
  if (texto.length <= LIMITE_CARACTERES) {
    return `<span class="post-text">${texto}</span>`;
  } else {
    const textoCortado = texto.slice(0, LIMITE_CARACTERES).trim();
    return `
      <span class="post-text">${textoCortado}...</span>
      <button class="btn btn-link btn-leia-mais" data-id="${postId}" style="padding:0; font-size:0.95em;">Leia mais</button>
    `;
  }
}

async function editPost(postId) {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) {
    const post = postSnap.data();
    imagemInput.value = post.imagem;
    tituloInput.value = post.titulo || '';
    textoInput.value = post.texto;
    postIdInput.value = postId;

    const img = new Image();
    img.onload = function () {
      previewImage.src = post.imagem;
      const dimensionsInfo = document.createElement('div');
      dimensionsInfo.className = 'image-dimensions';
      dimensionsInfo.textContent = `${this.width} × ${this.height}px`;
      const existingInfo = document.querySelector('.image-dimensions');
      if (existingInfo) existingInfo.remove();
      document.querySelector('.image-preview-container').appendChild(dimensionsInfo);
      previewImage.classList.remove('d-none');
      previewImage.classList.add('d-block');
      document.querySelector('.preview-placeholder').classList.add('d-none');
    };
    img.onerror = () => {
      previewImage.src = 'https://via.placeholder.com/120?text=Erro+na+imagem';
      previewImage.classList.remove('d-none');
      previewImage.classList.add('d-block');
      document.querySelector('.preview-placeholder').classList.add('d-none');
    };
    img.src = post.imagem;

    cancelEditBtn.style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

async function deletePost(postId) {
  if (confirm("Tem certeza que deseja excluir essa postagem?")) {
    try {
      await deleteDoc(doc(db, "posts", postId));
      showToast('Postagem excluída com sucesso!', 'success');
      loadPosts();
    } catch (error) {
      showToast(`Erro ao excluir: ${error.message}`, 'danger');
    }
  }
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    showToast('O arquivo é muito grande (máx. 5MB)', 'warning');
    e.target.value = '';
    return;
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    showToast('Formato de arquivo inválido. Use JPG, PNG ou GIF', 'warning');
    e.target.value = '';
    return;
  }

  currentImageFile = file;
  const reader = new FileReader();
  reader.onloadstart = () => {
    document.querySelector('.preview-placeholder').innerHTML = `
      <div class="upload-progress">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
        <p>Processando imagem...</p>
      </div>
    `;
  };

  reader.onload = (event) => {
    previewImage.src = event.target.result;
    const img = new Image();
    img.onload = function () {
      const dimensionsInfo = document.createElement('div');
      dimensionsInfo.className = 'image-dimensions';
      dimensionsInfo.textContent = `${this.width} × ${this.height}px`;
      const existingInfo = document.querySelector('.image-dimensions');
      if (existingInfo) existingInfo.remove();
      document.querySelector('.image-preview-container').appendChild(dimensionsInfo);
      previewImage.classList.remove('d-none');
      previewImage.classList.add('d-block');
      document.querySelector('.preview-placeholder').classList.add('d-none');
    };
    img.src = event.target.result;
  };

  reader.onerror = () => {
    showToast('Erro ao ler o arquivo de imagem', 'danger');
    document.querySelector('.preview-placeholder').innerHTML = `
      <i class="bi bi-exclamation-triangle"></i>
      <span>Erro ao carregar imagem</span>
    `;
  };

  reader.readAsDataURL(file);
  imagemInput.value = '';
}

function handleUrlInput(e) {
  const url = e.target.value.trim();

  if (url) {
    imageFileInput.value = '';
    currentImageFile = null;
    const isValidImageUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url);

    if (isValidImageUrl) {
      document.querySelector('.preview-placeholder').innerHTML = `
        <div class="upload-progress">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <p>Carregando imagem...</p>
        </div>
      `;

      const img = new Image();
      img.onload = function () {
        previewImage.src = url;
        const dimensionsInfo = document.createElement('div');
        dimensionsInfo.className = 'image-dimensions';
        dimensionsInfo.textContent = `${this.width} × ${this.height}px`;
        const existingInfo = document.querySelector('.image-dimensions');
        if (existingInfo) existingInfo.remove();
        document.querySelector('.image-preview-container').appendChild(dimensionsInfo);
        previewImage.classList.remove('d-none');
        previewImage.classList.add('d-block');
        document.querySelector('.preview-placeholder').classList.add('d-none');
      };

      img.onerror = () => {
        showToast('Não foi possível carregar a imagem da URL', 'warning');
        document.querySelector('.preview-placeholder').innerHTML = `
          <i class="bi bi-exclamation-triangle"></i>
          <span>URL inválida ou imagem não acessível</span>
        `;
        previewImage.src = '';
        previewImage.classList.add('d-none');
      };

      img.src = url;
    } else {
      showToast('URL de imagem inválida', 'warning');
      document.querySelector('.preview-placeholder').innerHTML = `
        <i class="bi bi-image"></i>
        <span>Pré-visualização aparecerá aqui</span>
      `;
      previewImage.src = '';
      previewImage.classList.add('d-none');
    }
  } else {
    document.querySelector('.preview-placeholder').innerHTML = `
      <i class="bi bi-image"></i>
      <span>Pré-visualização aparecerá aqui</span>
    `;
    previewImage.src = '';
    previewImage.classList.add('d-none');
    const dimensionsInfo = document.querySelector('.image-dimensions');
    if (dimensionsInfo) dimensionsInfo.remove();
  }
}

function cancelEdit() {
  resetForm();
  showToast('Edição cancelada.', 'info');
}

function resetForm() {
  postForm.reset();
  postIdInput.value = "";
  cancelEditBtn.style.display = "none";
  previewImage.src = '';
  previewImage.classList.add('d-none');
  currentImageFile = null;
  document.querySelector('.preview-placeholder').innerHTML = `
    <i class="bi bi-image"></i>
    <span>Pré-visualização aparecerá aqui</span>
  `;
  document.querySelector('.preview-placeholder').classList.remove('d-none');
  const dimensionsInfo = document.querySelector('.image-dimensions');
  if (dimensionsInfo) dimensionsInfo.remove();
}

function formatDate(timestamp) {
  if (!timestamp) return 'Data desconhecida';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString('pt-BR');
}

function toggleLoading(isLoading) {
  const spinner = submitBtn.querySelector('.loading');
  const btnText = submitBtn.querySelector('.btn-text');
  if (isLoading) {
    spinner.style.display = 'inline-block';
    btnText.textContent = 'Processando...';
    submitBtn.disabled = true;
  } else {
    spinner.style.display = 'none';
    btnText.textContent = postIdInput.value ? 'Atualizar Postagem' : 'Publicar Postagem';
    submitBtn.disabled = false;
  }
}

function showToast(message, type = 'success') {
  const toastBody = toastEl.querySelector('.toast-body');
  toastBody.textContent = message;
  toastEl.className = `toast text-bg-${type}`;
  toast.show();
}

function handleLogout() {
  signOut(auth).then(() => {
    window.location.href = "securaty.html";
  }).catch(error => {
    showToast(`Erro ao sair: ${error.message}`, 'danger');
  });
}