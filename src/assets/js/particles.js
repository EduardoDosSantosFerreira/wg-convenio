
  document.addEventListener('DOMContentLoaded', function () {
    // Animação de contagem para estatísticas
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const duration = 2000; // 2 segundos

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const increment = target / (duration / 16);
      let current = 0;

      const updateNumber = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = target;
        }
      };

      // Inicia a animação quando o elemento estiver visível
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateNumber();
          observer.unobserve(stat);
        }
      });

      observer.observe(stat);
    });

    // Cria partículas dinâmicas
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 5 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = `rgba(0, 180, 255, ${Math.random() * 0.5 + 0.1})`;
      particle.style.borderRadius = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particlesContainer.appendChild(particle);
    }
  });
