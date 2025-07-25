// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all sections
    const sections = document.querySelectorAll('.section');
    const centerCircle = document.querySelector('.center-circle');
    
    // Add click event listeners to each section
    sections.forEach((section, index) => {
        section.addEventListener('click', function() {
            // Remove active class from all sections
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked section
            this.classList.add('active');
            
            // Add pulse animation to center circle
            centerCircle.classList.add('pulse');
            setTimeout(() => {
                centerCircle.classList.remove('pulse');
            }, 600);
            
            // Log section info (you can customize this)
            console.log(`Section ${index + 1} clicked`);
        });
        
        // Add mouse enter and leave effects
        section.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(1.05)';
        });
        
        section.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '');
            }
        });
    });
    
    // Add floating animation to sections
    function addFloatingAnimation() {
        sections.forEach((section, index) => {
            const delay = index * 200; // Stagger the animations
            
            setTimeout(() => {
                section.style.animation = `float 3s ease-in-out infinite`;
                section.style.animationDelay = `${index * 0.5}s`;
            }, delay);
        });
    }
    
    // Initialize floating animation
    addFloatingAnimation();
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all sections and center circle
    sections.forEach(section => observer.observe(section));
    observer.observe(centerCircle);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const currentActive = document.querySelector('.section.active');
        let nextSection;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                if (currentActive) {
                    nextSection = currentActive.nextElementSibling?.classList.contains('section') 
                        ? currentActive.nextElementSibling 
                        : sections[0];
                } else {
                    nextSection = sections[0];
                }
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
                if (currentActive) {
                    nextSection = currentActive.previousElementSibling?.classList.contains('section') 
                        ? currentActive.previousElementSibling 
                        : sections[sections.length - 1];
                } else {
                    nextSection = sections[sections.length - 1];
                }
                break;
                
            case 'Enter':
            case ' ':
                if (currentActive) {
                    currentActive.click();
                }
                e.preventDefault();
                break;
        }
        
        if (nextSection) {
            sections.forEach(s => s.classList.remove('active'));
            nextSection.classList.add('active');
            nextSection.focus();
        }
    });
    
    // Make sections focusable for keyboard navigation
    sections.forEach((section, index) => {
        section.setAttribute('tabindex', '0');
        section.setAttribute('role', 'button');
        section.setAttribute('aria-label', `Infographic section ${index + 1}`);
    });
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
            50% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.6s ease-in-out;
        }
        
        .section.active {
            transform: scale(1.1) rotate(0deg) !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3) !important;
            z-index: 6 !important;
        }
        
        .section.animate-in {
            animation: slideIn 0.8s ease-out forwards;
        }
        
        .center-circle.animate-in {
            animation: zoomIn 0.8s ease-out forwards;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.5);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .section:focus {
            outline: 3px solid #fff;
            outline-offset: 5px;
        }
    `;
    document.head.appendChild(style);
    
    // Set CSS custom properties for rotation
    document.querySelector('.section-1').style.setProperty('--rotation', '-10deg');
    document.querySelector('.section-2').style.setProperty('--rotation', '10deg');
    document.querySelector('.section-3').style.setProperty('--rotation', '-5deg');
    document.querySelector('.section-4').style.setProperty('--rotation', '10deg');
    document.querySelector('.section-5').style.setProperty('--rotation', '-10deg');
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('Infographic initialized successfully!');
});