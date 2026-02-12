// CK Travels Main Logic
// Uses global data from window.ckTravelsData

document.addEventListener('DOMContentLoaded', () => {
    const data = window.ckTravelsData || { flights: [], packages: [] };
    const auth = window.ckTravelsAuth;
    const flights = data.flights;
    const packages = data.packages;

    console.log('CK Travels Premium OS loaded.');

    if (auth && typeof auth.updateNavigation === 'function') {
        auth.updateNavigation();
    }

    renderHomeExperiences(flights, packages);
});

function renderHomeExperiences(flights, packages) {
    const container = document.getElementById('home-experiences-grid');
    if (!container) return;

    // Combine some flights and packages for a mixed discovery experience
    const featuredPackages = packages.slice(0, 3);
    const featuredFlights = flights.slice(0, 3);

    container.innerHTML = '';

    // Render Packages first
    featuredPackages.forEach((pkg, index) => {
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
    featuredFlights.forEach((flight, index) => {
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

    // Re-trigger GSAP for new items
    if (window.gsap) {
        gsap.to(".reveal-up", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: "#home-experiences-grid",
                start: "top 80%"
            }
        });
    }
}
