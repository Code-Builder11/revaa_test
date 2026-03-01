document.addEventListener('DOMContentLoaded', () => {

    // 1. Form Submission & Email Capture
    const form = document.getElementById('notify-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const btn = document.getElementById('notify-btn');

        if (email) {
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            try {
                // GitHub Pages is static-only, so we use a free service like Formspree.
                // MOCK SUCCESS for demo — replace with your real Formspree endpoint below.
                await new Promise(r => setTimeout(r, 1000));
                const response = { ok: true };

                /*
                // REAL SUBMISSION (Formspree — free at https://formspree.io)
                // 1. Create a free Formspree account
                // 2. Create a new form and copy the endpoint URL
                // 3. Uncomment this block and delete the mock above
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                */

                if (response.ok) {
                    alert(`Thank you! We will notify ${email} when Revaa goes live online.`);
                    form.reset();
                } else {
                    alert('Something went wrong. Please try again later.');
                }
            } catch (error) {
                console.error('Subscription error:', error);
                alert('Could not process your request. Please try again later.');
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        }
    });

    // 2. Floating Gold Particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.bottom = `-10px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle();
        });
    }

    // 3. Subtle Parallax on Mouse Move (GPU-accelerated)
    const bgImage = document.querySelector('.background-image');
    if (bgImage) {
        let ticking = false;
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            if (!ticking) {
                requestAnimationFrame(() => {
                    bgImage.style.transform = `translate(${-mouseX}px, ${-mouseY}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
});
