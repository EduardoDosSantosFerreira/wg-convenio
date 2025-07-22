function nextStep() {
    const plano = document.getElementById('plano').value;
    if (!plano) {
        alert('Por favor, selecione um plano.');
        return;
    }

    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';

    document.getElementById('circle1').classList.remove('active');
    document.getElementById('circle2').classList.add('active');
}

function backStep() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';

    document.getElementById('circle2').classList.remove('active');
    document.getElementById('circle1').classList.add('active');
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.length === 11;
}

function validarTelefone(telefone) {
    const telLimpo = telefone.replace(/\D/g, '');
    return telLimpo.length >= 10 && telLimpo.length <= 11;
}

function validarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    return cepLimpo.length === 8;
}

function enviarWhatsapp() {
    const plano = document.getElementById('plano').value;
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const nascimento = document.getElementById('nascimento').value.trim();
    const cep = document.getElementById('cep').value.trim();

    if (!nome || !email || !telefone || !cpf || !nascimento || !cep) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    if (!validarTelefone(telefone)) {
        alert('Por favor, insira um telefone válido com DDD. Ex: (11) 91234-5678');
        return;
    }

    if (!validarCPF(cpf)) {
        alert('Por favor, insira um CPF válido com 11 números.');
        return;
    }

    if (!validarCEP(cep)) {
        alert('Por favor, insira um CEP válido com 8 números.');
        return;
    }

    const numeroWhatsapp = '5511981050511'; // ✅ Altere para o número desejado

    const mensagem =
        `Olá, gostaria de contratar o seguinte plano:%0A%0A` +
        `Plano: ${plano}%0A%0A` +
        `Meus dados são:%0A` +
        `• Nome: ${nome}%0A` +
        `• E-mail: ${email}%0A` +
        `• Telefone: ${telefone}%0A` +
        `• CPF: ${cpf}%0A` +
        `• Data de Nascimento: ${nascimento}%0A` +
        `• CEP: ${cep}`;

    const url = `https://wa.me/${numeroWhatsapp}?text=${mensagem}`;

    window.open(url, '_blank');
}


