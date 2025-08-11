document.addEventListener("input", function (e) {
  const target = e.target;

  if (target.id === "cpf") {
    target.value = mascaraCPF(target.value);
  }
  if (target.id === "telefone") {
    target.value = mascaraTelefone(target.value);
  }
  if (target.id === "cep") {
    target.value = mascaraCEP(target.value);
  }
  if (target.id === "rg") {
    target.value = mascaraRG(target.value);
  }
});

function mascaraCPF(cpf) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .substring(0, 14);
}

function mascaraTelefone(tel) {
  return tel
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
    .substring(0, 15);
}

function mascaraCEP(cep) {
  return cep
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{1,3})$/, "$1-$2")
    .substring(0, 9);
}

function mascaraRG(rg) {
  return rg.replace(/\D/g, "").substring(0, 12);
}

// ----- Validação CPF -----
function validarCPF(cpf) {
  const cpfLimpo = cpf.replace(/\D/g, "");
  if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let digito1 = 11 - (soma % 11);
  digito1 = digito1 >= 10 ? 0 : digito1;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  let digito2 = 11 - (soma % 11);
  digito2 = digito2 >= 10 ? 0 : digito2;

  return digito1 == cpfLimpo.charAt(9) && digito2 == cpfLimpo.charAt(10);
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefone(telefone) {
  const telLimpo = telefone.replace(/\D/g, "");
  return telLimpo.length >= 10 && telLimpo.length <= 11;
}

function validarCEP(cep) {
  const cepLimpo = cep.replace(/\D/g, "");
  return cepLimpo.length === 8;
}

function marcarCampoInvalido(id, valido) {
  const campo = document.getElementById(id);
  if (!valido) {
    campo.classList.add("invalido");
  } else {
    campo.classList.remove("invalido");
  }
}

function nextStep() {
  const plano = document.getElementById("plano").value;
  if (!plano) {
    alert("Por favor, selecione um plano.");
    return;
  }

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  step1.classList.add("fade-out");
  step1.addEventListener(
    "animationend",
    () => {
      step1.style.display = "none";
      step2.style.display = "block";
      step2.classList.add("fade-in");
    },
    { once: true }
  );

  document.getElementById("circle1").classList.remove("active");
  document.getElementById("circle2").classList.add("active");
}

function backStep() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  step2.classList.add("fade-out");
  step2.addEventListener(
    "animationend",
    () => {
      step2.style.display = "none";
      step1.style.display = "block";
      step1.classList.add("fade-in");
    },
    { once: true }
  );

  document.getElementById("circle2").classList.remove("active");
  document.getElementById("circle1").classList.add("active");
}

function enviarWhatsapp() {
  const campos = [
    "plano",
    "nome",
    "rg",
    "email",
    "telefone",
    "cpf",
    "nascimento",
    "profissao",
    "religiao",
    "endereco",
    "bairro",
    "cidade",
    "estadoCivil",
    "cep",
  ];

  const valores = {};
  let valido = true;

  campos.forEach((id) => {
    const valor = document.getElementById(id).value.trim();
    valores[id] = valor;
    if (!valor) {
      marcarCampoInvalido(id, false);
      valido = false;
    } else {
      marcarCampoInvalido(id, true);
    }
  });

  if (!valido) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!validarEmail(valores.email)) {
    alert("E-mail inválido.");
    marcarCampoInvalido("email", false);
    return;
  } else {
    marcarCampoInvalido("email", true);
  }

  if (!validarTelefone(valores.telefone)) {
    alert("Telefone inválido.");
    marcarCampoInvalido("telefone", false);
    return;
  } else {
    marcarCampoInvalido("telefone", true);
  }

  if (!validarCPF(valores.cpf)) {
    alert("CPF inválido.");
    marcarCampoInvalido("cpf", false);
    return;
  } else {
    marcarCampoInvalido("cpf", true);
  }

  if (!validarCEP(valores.cep)) {
    alert("CEP inválido.");
    marcarCampoInvalido("cep", false);
    return;
  } else {
    marcarCampoInvalido("cep", true);
  }

  const numeroWhatsapp = "5511981050511";

  const mensagem =
    `Olá, gostaria de contratar o seguinte plano:%0A%0A` +
    ` Plano: ${valores.plano}%0A%0A` +
    ` Meus dados:%0A` +
    `• Nome: ${valores.nome}%0A` +
    `• RG: ${valores.rg}%0A` +
    `• CPF: ${valores.cpf}%0A` +
    `• Data de Nascimento: ${valores.nascimento}%0A` +
    `• E-mail: ${valores.email}%0A` +
    `• Telefone: ${valores.telefone}%0A` +
    `• Profissão: ${valores.profissao}%0A` +
    `• Religião: ${valores.religiao}%0A` +
    `• Estado Civil: ${valores.estadoCivil}%0A` +
    `• Endereço: ${valores.endereco}%0A` +
    `• Bairro: ${valores.bairro}%0A` +
    `• Cidade: ${valores.cidade}%0A` +
    `• CEP: ${valores.cep}`;

  const url = `https://wa.me/${numeroWhatsapp}?text=${mensagem}`;

  window.open(url, "_blank");
}
