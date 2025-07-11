document.addEventListener('DOMContentLoaded', function () {
    const tempoParaExibir = 7000;
    const whatsappCard = document.getElementById('whatsappCard');
    const whatsappOverlay = document.getElementById('whatsappOverlay');
    const closeCard = document.getElementById('closeCard');
    const captureForm = document.getElementById('captureForm');

    // Máscaras (mantido igual)
    document.getElementById('userPhone').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        if (value.length > 0) {
            value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
        }
        e.target.value = value;
    });

    document.getElementById('userCPF').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        if (value.length > 0) {
            value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2}).*/, '$1.$2.$3-$4');
        }
        e.target.value = value;
    });

    function showCard() {
        whatsappOverlay.classList.remove('hidden');
        whatsappCard.classList.remove('hidden');
    }

    function hideCard() {
        whatsappOverlay.classList.add('hidden');
        whatsappCard.classList.add('hidden');
    }

    setTimeout(showCard, tempoParaExibir);

    // ÚNICAS maneiras de fechar:
    // 1. Clicando no X
    closeCard.addEventListener('click', hideCard);

    // 2. Enviando o formulário (já implementado)
    captureForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('userName').value;
        const telefone = document.getElementById('userPhone').value;
        const email = document.getElementById('userEmail').value;
        const cpf = document.getElementById('userCPF').value;
        const plano = document.getElementById('userPlan').value;

        const mensagem = `*Novo Interessado nos Planos!*%0A%0A` +
            `*Nome:* ${encodeURIComponent(nome)}%0A` +
            `*Telefone:* ${encodeURIComponent(telefone)}%0A` +
            `*E-mail:* ${encodeURIComponent(email)}%0A` +
            `*CPF:* ${encodeURIComponent(cpf)}%0A` +
            `*Plano Escolhido:* ${encodeURIComponent(plano)}%0A%0A` +
            `_Mensagem enviada automaticamente do site_`;

        window.open(`https://wa.me/5511981050511?text=${mensagem}`, '_blank');
        hideCard(); // Fecha APÓS envio
    });

    // Impede qualquer fechamento clicando fora
    whatsappOverlay.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});