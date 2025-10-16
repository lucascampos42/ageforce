window.sr = ScrollReveal({ reset: false })

sr.reveal(`
  .scr_top
`, {
  origin: 'top',
  distance: '50px',
  duration: 500,
  easing: 'ease'
})

sr.reveal(`
  .scr_right
`, {
  origin: 'right',
  distance: '50px',
  duration: 600,
  easing: 'ease-out',
  delay: 100
})

sr.reveal(`
  .scr_left
`, {
  origin: 'left',
  distance: '70px',
  duration: 500,
  easing: 'ease'
})

sr.reveal(`
  .scr_left_slow_1
`, {
  origin: 'left',
  distance: '70px',
  duration: 700,
  easing: 'ease'
})

sr.reveal(`
  .scr_left_slow_2
`, {
  origin: 'left',
  distance: '70px',
  duration: 900,
  easing: 'ease'
})

sr.reveal(`
  .scr_left_slow_3
`, {
  origin: 'left',
  distance: '70px',
  duration: 1100,
  easing: 'ease'
})

// Função para animar contagem crescente
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60 FPS
  const suffix = element.getAttribute('data-suffix') || '';
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      // Formatar número com pontos para milhares
      const formattedNumber = Math.floor(start).toLocaleString('pt-BR');
      element.textContent = `+${formattedNumber}${suffix}`;
      requestAnimationFrame(updateCounter);
    } else {
      // Valor final
      const formattedNumber = target.toLocaleString('pt-BR');
      element.textContent = `+${formattedNumber}${suffix}`;
    }
  }
  
  updateCounter();
}

// Intersection Observer para ativar animação quando seção ficar visível
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-target]');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
      });
      // Desconectar observer após animação para evitar repetição
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar a seção de números quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const numbersSection = document.querySelector('.validation-numbers');
  if (numbersSection) {
    counterObserver.observe(numbersSection);
  }
});