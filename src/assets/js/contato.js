document.getElementById("phone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  e.target.value = value;
});

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function enviarWhatsapp() {
  const nome = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("phone").value.trim();
  const mensagem = document.getElementById("message").value.trim();

  if (!nome) {
    alert("Por favor, preencha seu nome.");
    return;
  }

  if (!email) {
    alert("Por favor, preencha seu e-mail.");
    return;
  }

  if (!validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  if (!telefone) {
    alert("Por favor, preencha seu telefone.");
    return;
  }

  const telefoneNumerico = telefone.replace(/\D/g, "");
  if (telefoneNumerico.length < 10) {
    alert("Por favor, insira um telefone válido.");
    return;
  }

  if (!mensagem) {
    alert("Por favor, digite sua mensagem.");
    return;
  }

  const texto = `Olá, me chamo ${nome}.
Gostaria de mais informações.

E-mail: ${email}
Telefone: ${telefone}

Mensagem:
${mensagem}`;

  const textoEncode = encodeURIComponent(texto);
  const numero = "5511981050511";
  const url = `https://wa.me/${numero}?text=${textoEncode}`;

  window.open(url, "_blank");
}
