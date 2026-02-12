/**
 * CK Travels - Main Entry Point
 */
import { flights, packages } from './data.js';
import { updateNavigation } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('CK Travels Premium OS loaded.');

    // Update navigation based on auth state
    updateNavigation();

    // 🛠️ Date Input Fix for Floating Labels
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }

    // Render Home Page Content
    renderHomeFlights();
    renderHomePackages();
});

function renderHomeFlights() {
    const container = document.getElementById('home-flights-container');
    if (!container) return;

    // Take first 2 flights
    const homeFlights = flights.slice(0, 2);
    container.innerHTML = '';

    homeFlights.forEach(flight => {
        const card = document.createElement('div');
        card.className = 'flight-card';
        card.style.background = '#fff';
        card.innerHTML = `
            <div class="flex-center" style="gap: 12px; justify-content: flex-start;">
                <div style="font-weight: 700; font-size: 1.2rem;">${flight.from.split(' ')[0]}</div> <!-- Simplified Logic for demo -->
                <div style="flex-grow: 1; height: 1px; background: #ccc; width: 40px;"></div>
                <div style="font-weight: 700; font-size: 1.2rem;">${flight.to.split(' ')[0]}</div>
            </div>
            <div style="margin-top: 12px; color: var(--sh-black); font-size: 0.9rem;">
                <div style="margin-bottom: 4px;"><strong>${flight.departure}</strong> - ${flight.arrival}</div>
                <div style="color: #666; font-size: 0.8rem;">${flight.stops} • ${flight.duration}</div>
            </div>
            <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700;">$${flight.price}</div>
                <a href="booking.html?id=${flight.id}&type=flight" class="btn btn-secondary btn-sm" style="padding: 6px 16px;">Book</a>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderHomePackages() {
    const container = document.getElementById('home-packages-container');
    if (!container) return;

    // Take first 3 packages
    const homePackages = packages.slice(0, 3);
    container.innerHTML = '';

    homePackages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.onclick = () => window.location.href = `package-details.html?id=${pkg.id}`;

        card.innerHTML = `
            <div class="package-bg"
                style="background-image: url('${pkg.image}');">
            </div>
            <div class="package-overlay">
                <h3 style="font-size: 1.2rem; margin-bottom: 4px;">${pkg.location}</h3>
                <div class="flex-between">
                    <span style="opacity: 0.7;">${pkg.duration}</span>
                    <span style="font-weight: 700; font-size: 1.1rem;">$${pkg.price}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
