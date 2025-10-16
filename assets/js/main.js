window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
  showNavOnScroll()
  showBackTopButtonOnScroll()
}

function showNavOnScroll() {
  if (window.scrollY > 100) {
    $("#navigation").addClass("scroll")
  } else {
    $("#navigation").removeClass("scroll")
  }
}

function showBackTopButtonOnScroll() {
  if (window.scrollY > 600) {
    $('#backToTopButton').show(200)
  } else {
    $('#backToTopButton').hide(200)
  }
}

$(window).on("load", function(){
  $('#video').html(`
  <video width="848" height="480" class="embed-responsive-item" controls>
    <source src="./assets/video/madeireira_petyk.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  `)
  
  // Configurar botão WhatsApp
  setupWhatsAppButton()
  
  // Configurar número de telefone
  setupPhoneNumber()
});

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setupPageLoader();
    setupWhatsAppButton();
    setupPhoneNumber();
    setupScrollAnimations();
});

// Configuração do loader da página
function setupPageLoader() {
    const loader = document.getElementById('pageLoader');
    
    // Simula carregamento e esconde o loader
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
                // Remove o loader do DOM após a animação
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }
        }, 800); // Mostra o loader por pelo menos 800ms
    });
}

// Configuração de animações de scroll
function setupScrollAnimations() {
    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Anima elementos filhos com delay
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observa seções para animação
    const sections = document.querySelectorAll('section, .biomassa-card, .feedstock-card');
    sections.forEach(section => {
        section.classList.add('animate-element');
        observer.observe(section);
    });

    // Adiciona classe aos elementos filhos
    const cards = document.querySelectorAll('.biomassa-card, .feedstock-card');
    cards.forEach(card => {
        card.classList.add('animate-child');
    });
}

// Efeito de parallax suave para imagens
function setupParallaxEffect() {
    const images = document.querySelectorAll('.biomassa-image img, .section img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    });
}

function setupWhatsAppButton() {
  // Obter número do WhatsApp da variável CSS
  const whatsappNumber = getComputedStyle(document.documentElement)
    .getPropertyValue('--whatsapp-number')
    .replace(/"/g, '')
    .trim()
  
  // Configurar botão WhatsApp flutuante
  const whatsappButton = document.getElementById('whatsappButton')
  if (whatsappButton && whatsappNumber) {
    const message = encodeURIComponent('Olá! Gostaria de mais informações sobre os produtos da AgForce.')
    whatsappButton.href = `https://wa.me/${whatsappNumber}?text=${message}`
  }
  
  // Configurar botão WhatsApp na seção de contato
  const contactWhatsappButton = document.getElementById('contactWhatsappButton')
  if (contactWhatsappButton && whatsappNumber) {
    const contactMessage = encodeURIComponent('Olá!! Vi seu site e queria saber mais sobre seus produtos!')
    contactWhatsappButton.href = `https://wa.me/send?phone=${whatsappNumber}&text=${contactMessage}`
   }
}

function setupPhoneNumber() {
  // Obter número de telefone da variável CSS
  const phoneNumber = getComputedStyle(document.documentElement)
    .getPropertyValue('--phone-number')
    .replace(/"/g, '')
    .trim()
  
  // Atualizar elemento do telefone
  const phoneElement = document.getElementById('phoneNumber')
  if (phoneElement && phoneNumber) {
    phoneElement.textContent = phoneNumber
  }
}