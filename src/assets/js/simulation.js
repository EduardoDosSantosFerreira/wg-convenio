document.addEventListener('DOMContentLoaded', function() {
    // Variáveis do simulador
    const totalQuestions = 5;
    let currentQuestion = 1;
    let userAnswers = [];
    let bronzeScore = 0;
    let silverScore = 0;
    let goldScore = 0;
    
    // Elementos da interface
    const questionsContainer = document.getElementById('questions-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentQuestionEl = document.getElementById('current-question');
    const progressBar = document.getElementById('quiz-progress');
    const resultsSection = document.getElementById('results-section');
    const bronzeResult = document.getElementById('bronze-result');
    const silverResult = document.getElementById('silver-result');
    const goldResult = document.getElementById('gold-result');
    const comparisonTable = document.getElementById('comparison-table');
    const compareBtns = document.querySelectorAll('#compare-btn');
    const backToResultsBtn = document.getElementById('back-to-results');
    
    // Atualiza a exibição da pergunta atual
    function updateQuestionDisplay() {
        // Esconde todas as perguntas
        document.querySelectorAll('.question-card').forEach(card => {
            card.style.display = 'none';
        });
        
        // Mostra apenas a pergunta atual
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
        
        // Atualiza o contador
        currentQuestionEl.textContent = currentQuestion;
        
        // Atualiza a barra de progresso
        progressBar.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
        
        // Atualiza os botões de navegação
        prevBtn.disabled = currentQuestion === 1;
        nextBtn.textContent = currentQuestion === totalQuestions ? 'Ver Resultado' : 'Próxima';
    }
    
    // Avança para a próxima pergunta
    function nextQuestion() {
        // Verifica se uma opção foi selecionada
        const currentCard = document.getElementById(`question-${currentQuestion}`);
        const selectedOption = currentCard.querySelector('.option-btn.selected');
        
        if (!selectedOption && currentQuestion <= totalQuestions) {
            alert('Por favor, selecione uma opção antes de continuar.');
            return;
        }
        
        // Armazena a resposta do usuário
        if (selectedOption) {
            userAnswers.push({
                question: currentQuestion,
                value: selectedOption.dataset.value
            });
            
            // Atualiza os scores com base na resposta
            switch(selectedOption.dataset.value) {
                case 'bronze':
                    bronzeScore += 1;
                    break;
                case 'silver':
                    silverScore += 1;
                    break;
                case 'gold':
                    goldScore += 1;
                    break;
            }
        }
        
        // Verifica se é a última pergunta
        if (currentQuestion === totalQuestions) {
            showResults();
            return;
        }
        
        // Avança para a próxima pergunta
        currentQuestion++;
        updateQuestionDisplay();
    }
    
    // Volta para a pergunta anterior
    function prevQuestion() {
        if (currentQuestion > 1) {
            // Remove a última resposta do array
            if (userAnswers.length > 0 && userAnswers[userAnswers.length - 1].question === currentQuestion - 1) {
                const lastAnswer = userAnswers.pop();
                
                // Ajusta os scores
                switch(lastAnswer.value) {
                    case 'bronze':
                        bronzeScore -= 1;
                        break;
                    case 'silver':
                        silverScore -= 1;
                        break;
                    case 'gold':
                        goldScore -= 1;
                        break;
                }
            }
            
            currentQuestion--;
            updateQuestionDisplay();
            
            // Restaura a seleção anterior se existir
            const previousAnswer = userAnswers.find(answer => answer.question === currentQuestion);
            if (previousAnswer) {
                const currentCard = document.getElementById(`question-${currentQuestion}`);
                const options = currentCard.querySelectorAll('.option-btn');
                
                options.forEach(option => {
                    option.classList.remove('selected');
                    if (option.dataset.value === previousAnswer.value) {
                        option.classList.add('selected');
                    }
                });
            }
        }
    }
    
    // Mostra os resultados finais
    function showResults() {
        questionsContainer.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Determina o plano recomendado com base nos scores
        let recommendedPlan = 'bronze';
        
        if (silverScore > bronzeScore && silverScore >= goldScore) {
            recommendedPlan = 'silver';
        } else if (goldScore > silverScore && goldScore > bronzeScore) {
            recommendedPlan = 'gold';
        }
        
        // Mostra o resultado correspondente
        document.getElementById(`${recommendedPlan}-result`).style.display = 'block';
    }
    
    // Mostra a tabela de comparação
    function showComparison() {
        resultsSection.style.display = 'none';
        comparisonTable.style.display = 'block';
    }
    
    // Volta para os resultados
    function backToResults() {
        comparisonTable.style.display = 'none';
        resultsSection.style.display = 'block';
    }
    
    // Event Listeners
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    
    // Seleção de opções
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a seleção de outras opções na mesma pergunta
            this.parentElement.querySelectorAll('.option-btn').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Seleciona a opção clicada
            this.classList.add('selected');
        });
    });
    
    // Botões de comparação
    compareBtns.forEach(btn => {
        btn.addEventListener('click', showComparison);
    });
    
    backToResultsBtn.addEventListener('click', backToResults);
    
    // Inicializa o simulador
    updateQuestionDisplay();
});