// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create matrix background
function createMatrix() {
    const matrixBg = document.getElementById('matrixBg');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 100; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = characters[Math.floor(Math.random() * characters.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDelay = Math.random() * 8 + 's';
        char.style.animationDuration = (5 + Math.random() * 5) + 's';
        matrixBg.appendChild(char);
    }
}

// Cursor trail effect
const trails = [];
const trailLength = 20;

for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = (1 - i / trailLength) * 0.5;
    trail.style.transform = 'scale(' + (1 - i / trailLength) + ')';
    document.body.appendChild(trail);
    trails.push(trail);
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateTrails() {
    trails.forEach((trail, index) => {
        if (index === 0) {
            trail.style.left = mouseX + 'px';
            trail.style.top = mouseY + 'px';
        } else {
            const prevTrail = trails[index - 1];
            const prevX = parseFloat(prevTrail.style.left);
            const prevY = parseFloat(prevTrail.style.top);
            
            trail.style.left = prevX + (mouseX - prevX) * 0.3 + 'px';
            trail.style.top = prevY + (mouseY - prevY) * 0.3 + 'px';
        }
    });
    requestAnimationFrame(updateTrails);
}

// Active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Stagger animation for child elements
            const children = entry.target.querySelectorAll('.stat-card, .skill-category, .project-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px) scale(0.95)';
    section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
});

// Initialize child elements
document.querySelectorAll('.stat-card, .skill-category, .project-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px) scale(0.9)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Typing animation for subtitle
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.classList.add('typing-animation');

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            subtitle.classList.remove('typing-animation');
        }
    };
    
    // Start typing animation after load
    setTimeout(typeWriter, 3000);
}

// Enhanced hover effects for skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Parallax effect for header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    const parallaxSpeed = 0.3;
    header.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    
    updateActiveNavLink();
});

// 3D Tilt effect for cards (reduced intensity)
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createMatrix();
    updateTrails();
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
    updateActiveNavLink();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});
