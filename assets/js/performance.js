// Otimizações de performance para o site AgForce
(function() {
    'use strict';
    
    // Lazy loading para imagens
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores sem suporte
            images.forEach(img => img.classList.add('loaded'));
        }
    }
    
    // Preload de recursos críticos
    function preloadCriticalResources() {
        const criticalImages = [
            './assets/img/agforce/ageforce logo certo.png',
            './assets/img/agforce/ageforce logo branco.png',
            './assets/img/agforce/imagem geral.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // Otimização de scroll suave
    function optimizeScrollPerformance() {
        let ticking = false;
        
        function updateScrollElements() {
            // Aqui você pode adicionar lógica para elementos que mudam durante o scroll
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // Debounce para eventos de resize
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Otimização de resize
    function optimizeResizePerformance() {
        const debouncedResize = debounce(() => {
            // Lógica para redimensionamento
            window.dispatchEvent(new Event('optimizedResize'));
        }, 250);
        
        window.addEventListener('resize', debouncedResize, { passive: true });
    }
    
    // Preload de páginas em hover (para links internos)
    function initLinkPreloading() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    // Preparar seção para visualização
                    target.style.willChange = 'transform';
                }
            }, { once: true });
            
            link.addEventListener('mouseleave', () => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.style.willChange = 'auto';
                }
            });
        });
    }
    
    // Otimização de animações
    function optimizeAnimations() {
        // Reduzir animações se o usuário preferir
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }
        
        // Pausar animações quando a aba não está ativa
        document.addEventListener('visibilitychange', () => {
            const animatedElements = document.querySelectorAll('[class*="animate"], [class*="scr_"]');
            
            if (document.hidden) {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    }
    
    // Otimização de Web Vitals
    function optimizeWebVitals() {
        // Melhorar CLS (Cumulative Layout Shift)
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            if (img.naturalWidth && img.naturalHeight) {
                const aspectRatio = img.naturalHeight / img.naturalWidth;
                img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
            }
        });
        
        // Melhorar FID (First Input Delay)
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Inicializar funcionalidades não críticas
                initLinkPreloading();
            });
        } else {
            setTimeout(() => {
                initLinkPreloading();
            }, 1000);
        }
    }
    
    // Service Worker para cache (se disponível)
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Aqui você registraria um service worker se tivesse um
                console.log('Service Worker support detected');
            });
        }
    }
    
    // Inicialização quando o DOM estiver pronto
    function init() {
        preloadCriticalResources();
        initLazyLoading();
        optimizeScrollPerformance();
        optimizeResizePerformance();
        optimizeAnimations();
        optimizeWebVitals();
        initServiceWorker();
    }
    
    // Executar quando o DOM estiver carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();