import {
  auth, db,
  collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp,
  onAuthStateChanged, signOut
} from '../../../admin/firebase/firebase.config.js';

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

let currentImageFile = null;

const cloudName = "dgptuckf6";
const unsignedUploadPreset = "Eduardo";

// Defina o limite de caracteres para exibir o "Leia mais"
const LIMITE_CARACTERES = 200; // ajuste conforme necessário
const URL_BLOG = "./blog.html"; // ajuste para o endereço real do blog

init();

function init() {
  setupEventListeners();
  checkAuthState();
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
  postList.innerHTML = '<div class="text-center my-4"><div class="spinner-border" role="status"><span class="visually-hidden">Carregando...</span></div></div>';

  try {
    const q = query(collection(db, "posts"), orderBy("criadoEm", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      postList.innerHTML = '<p class="text-muted text-center">Nenhuma postagem.</p>';
      return;
    }

    postList.innerHTML = snapshot.docs.map(doc => createPostElement(doc)).join('');
    setupPostActions();
  } catch (error) {
    console.error("Erro ao carregar postagens:", error);
    postList.innerHTML = '<p class="text-danger text-center">Erro ao carregar postagens.</p>';
  }
}

// Função para truncar texto e adicionar "Leia mais" se necessário
function formatarTextoComLeiaMais(texto, postId) {
  if (!texto) return '';
  if (texto.length <= LIMITE_CARACTERES) {
    return `<span class="post-text">${texto}</span>`;
  } else {
    // Trunca o texto e adiciona "..." e botão de leia mais
    const textoCortado = texto.slice(0, LIMITE_CARACTERES).trim();
    return `
      <span class="post-text">${textoCortado}...</span>
      <button class="btn btn-link btn-leia-mais" data-id="${postId}" style="padding:0; font-size:0.95em;">Leia mais</button>
    `;
  }
}

function createPostElement(doc) {
  const post = { id: doc.id, ...doc.data() };
  return `
    <div class="post" data-id="${post.id}">
      <img src="${post.imagem}" alt="Imagem" onerror="this.src='https://via.placeholder.com/120?text=Erro+na+imagem'" />
      <div class="post-details">
        <h5><strong>${post.titulo || 'Sem Título'}</strong></h5>
        <p>
          ${formatarTextoComLeiaMais(post.texto, post.id)}
        </p>
        <small class="text-muted">
          ${formatDate(post.criadoEm)}
          ${post.atualizadoEm ? ' (atualizado)' : ''}
        </small>
        <br/>
        <button class="btn btn-sm btn-primary btn-edit">Editar</button>
        <button class="btn btn-sm btn-danger btn-delete">Excluir</button>
      </div>
    </div>
  `;
}

function setupPostActions() {
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => editPost(btn.closest('.post').dataset.id));
  });

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deletePost(btn.closest('.post').dataset.id));
  });

  // Adiciona evento para os botões "Leia mais"
  document.querySelectorAll('.btn-leia-mais').forEach(btn => {
    btn.addEventListener('click', () => {
      // Redireciona para o blog (pode passar o id do post como parâmetro se desejar)
      window.location.href = URL_BLOG;
    });
  });
}

import { getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function editPost(postId) {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    const post = postSnap.data();
    imagemInput.value = post.imagem;
    tituloInput.value = post.titulo || '';
    textoInput.value = post.texto;
    postIdInput.value = postId;
    previewImage.src = post.imagem;
    previewImage.classList.remove('d-none');
    previewImage.classList.add('d-block');
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

  currentImageFile = file;

  const reader = new FileReader();
  reader.onload = (event) => {
    previewImage.src = event.target.result;
    previewImage.classList.remove('d-none');
    previewImage.classList.add('d-block');
  };
  reader.readAsDataURL(file);

  imagemInput.value = '';
}

function handleUrlInput(e) {
  const url = e.target.value.trim();

  // Se tem URL, limpa o upload
  if (url) {
    imageFileInput.value = '';
    currentImageFile = null;

    const isValidImageUrl = /^https:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(url);

    if (isValidImageUrl) {
      previewImage.src = url;
      previewImage.classList.remove('d-none');
      previewImage.classList.add('d-block');
    } else {
      previewImage.src = '';
      previewImage.classList.add('d-none');
    }
  } else {
    // Se a URL estiver vazia
    previewImage.src = '';
    previewImage.classList.add('d-none');
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
    btnText.textContent = 'Salvar Postagem';
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
