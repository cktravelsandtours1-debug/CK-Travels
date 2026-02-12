// CK Travels Premium OS — Main Logic & Motion System
// Unified Global Animation Controller

document.addEventListener('DOMContentLoaded', () => {
    console.log("CK Travels Premium OS loaded.");

    // 1. Initialize Data Rendering (if on Home Page)
    if (document.getElementById('home-experiences-grid')) {
        const data = window.ckTravelsData || { flights: [], packages: [] };
        renderHomeExperiences(data.flights, data.packages);
    }

    // 2. Initialize Global Animations
    // We wait for window load to ensure all assets/layout are stable for GSAP
    window.addEventListener('load', () => {
        initGlobalAnimations();
    });
});

function initGlobalAnimations() {
    console.log("Initializing CK Travels Motion System...");

    // A) Global Navigation Logic
    const nav = document.getElementById('main-nav');
    if (nav) {
        // 1. Initial State: Slide down
        // 1. Initial State: Slide down (Force opacity 1 at end)
        gsap.fromTo(nav,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }
        );

        // 2. Scroll Transformation (The "Floating Glassmorphic Dock")
        // Only if ScrollTrigger is loaded
        if (typeof ScrollTrigger !== 'undefined') {
            const navContainer = document.getElementById('nav-container');
            ScrollTrigger.create({
                start: "top -50",
                onEnter: () => {
                    gsap.to(navContainer, {
                        backgroundColor: "rgba(0, 20, 61, 0.85)",
                        backdropFilter: "blur(25px)",
                        webkitBackdropFilter: "blur(25px)",
                        borderBottom: "2px solid #FF6B00",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        padding: "12px 40px",
                        marginTop: "12px",
                        duration: 0.5,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(navContainer, {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(0px)",
                        webkitBackdropFilter: "blur(0px)",
                        borderBottom: "2px solid transparent",
                        boxShadow: "none",
                        padding: "20px 40px",
                        marginTop: "0px",
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
        }
    }

    // B) Magnetic Buttons (Global)
    initMagneticButtons();

    // C) Page Transitions (Curtain Wipe)
    initPageTransitions();

    // D) Common Reveal Animations
    // Only target elements that are NOT manually animated by specific page scripts (like login cards)
    // We use a specific class 'reveal-up-global' or check if it's not handled elsewhere
    // For now, we apply to all .reveal-up unless they are in specific contexts if needed
    const reveals = document.querySelectorAll('.reveal-up');
    if (reveals.length > 0 && typeof ScrollTrigger !== 'undefined') {
        gsap.from(reveals, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: document.body,
                start: "top 80%", // Immediate if top of page
            }
        });
    }
}

// === COMPONENT: Magnetic Buttons ===
function initMagneticButtons() {
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
        const btn = wrap.querySelector('.magnetic-btn');
        if (!btn) return;

        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: "power2.out" });
        });

        wrap.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    });
}

// === COMPONENT: Page Transitions ===
function initPageTransitions() {
    // Ensure curtain exists
    if (!document.getElementById('page-curtain')) {
        const curtain = document.createElement('div');
        curtain.id = 'page-curtain';
        curtain.style.cssText = "position: fixed; top: 0; left: -100%; width: 100%; height: 100%; background-color: #FF6B00; z-index: 9999; pointer-events: none;";
        document.body.appendChild(curtain);
    }

    // Handle internal links
    // We select all links that look like pages
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        // Filter out non-navigation links
        if (!href || href === '#' || href.startsWith('javascript') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;

        // Add listener
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateWithCurtain(href);
        });
    });
}

function navigateWithCurtain(href) {
    gsap.to("#page-curtain", {
        left: 0,
        duration: 0.8,
        ease: "expo.inOut",
        onComplete: () => { window.location.href = href; }
    });
}

// === DATA RENDERING (Legacy Support) ===
function renderHomeExperiences(flights, packages) {
    const container = document.getElementById('home-experiences-grid');
    if (!container) return;

    // Combine some flights and packages for a mixed discovery experience
    const featuredPackages = packages.slice(0, 3);
    const featuredFlights = flights.slice(0, 3);

    container.innerHTML = '';

    // Render Packages first
    featuredPackages.forEach((pkg) => {
        const card = document.createElement('div');
        card.className = 'card-perspective reveal-up opacity-0';
        card.innerHTML = `
            <div class="hover-3d-tilt glass-dock rounded-[48px] overflow-hidden group cursor-pointer" onclick="window.location.href='package-details.html?id=${pkg.id}'">
                <div class="img-zoom-container h-80 relative overflow-hidden">
                    <img src="${pkg.image}" class="w-full h-full object-cover brightness-75 group-hover:brightness-100" alt="${pkg.location}">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0A1229] via-transparent to-transparent"></div>
                    <div class="absolute top-6 left-6 px-4 py-1.5 bg-brand/20 backdrop-blur-md border border-brand/30 rounded-full text-[8px] font-black text-white uppercase tracking-[0.2em]">${pkg.location}</div>
                </div>
                <div class="p-10 space-y-4">
                    <h3 class="text-3xl font-heading font-black italic text-white leading-tight group-hover:text-primary transition-colors">${pkg.title || 'Luxury Experience'}</h3>
                    <div class="flex justify-between items-center pt-6 border-t border-white/5">
                        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">${pkg.duration}</span>
                        <span class="text-2xl font-black text-white">$${pkg.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Render Flights
    featuredFlights.forEach((flight) => {
        const card = document.createElement('div');
        card.className = 'card-perspective reveal-up opacity-0';
        card.innerHTML = `
            <div class="hover-3d-tilt glass-dock rounded-[48px] p-10 space-y-8 group border border-white/5 hover:border-primary/30 transition-all">
                <div class="flex justify-between items-center">
                    <div class="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-primary text-xs">${flight.airline.substring(0, 2).toUpperCase()}</div>
                    <span class="text-[9px] font-black text-white/30 tracking-[0.3em] uppercase">${flight.flightNumber}</span>
                </div>
                <div class="flex items-center justify-between gap-6">
                    <div class="text-center">
                        <div class="text-4xl font-heading font-black text-white italic mb-1">${flight.from.split(' ')[0]}</div>
                        <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">${flight.departure}</div>
                    </div>
                    <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent relative">
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-heading font-black text-white italic mb-1">${flight.to.split(' ')[0]}</div>
                        <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">${flight.arrival}</div>
                    </div>
                </div>
                <div class="flex justify-between items-center pt-8 border-t border-white/5">
                    <span class="text-2xl font-black text-white">$${flight.price}</span>
                    <button onclick="window.location.href='booking.html?id=${flight.id}&type=flight'" 
                            class="bg-white/5 hover:bg-white text-white hover:text-black px-8 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all active:scale-90">Secure Seat</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
