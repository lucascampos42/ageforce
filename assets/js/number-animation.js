document.addEventListener("DOMContentLoaded", () => {
    const counters = [
        { id: 'counter-hectares', suffix: ' Ha' },
        { id: 'counter-madeira', suffix: ' M³' },
        { id: 'counter-carvao', suffix: ' M³' }
    ];

    const formatNumber = (num) => {
        return new Intl.NumberFormat('pt-BR').format(num);
    };

    const animate = (element) => {
        const target = +element.getAttribute('data-target');
        const suffix = element.getAttribute('data-suffix') || '';
        
        let current = 0;
        const duration = 2000; // 2 segundos
        const stepTime = 16; // Aproximadamente 60fps
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const updateCount = () => {
            current += increment;
            if (current >= target) {
                current = target;
                element.innerText = `+${formatNumber(Math.floor(current))}${suffix}`;
                clearInterval(interval);
            } else {
                element.innerText = `+${formatNumber(Math.floor(current))}${suffix}`;
            }
        };

        const interval = setInterval(updateCount, stepTime);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                animate(element);
                observer.unobserve(element); // Para a animação não repetir
            }
        });
    }, {
        threshold: 0.5 // Inicia quando 50% do elemento está visível
    });

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            observer.observe(element);
        }
    });
});
