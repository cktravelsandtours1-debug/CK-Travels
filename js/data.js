/**
 * Mock Data for CK Travels
 * Simulating backend database
 */

export const flights = [
    {
        id: 'f1',
        airline: 'Emirates',
        flightNumber: 'EK202',
        from: 'JFK',
        to: 'LHR',
        departure: '18:30',
        arrival: '06:30 (+1)',
        duration: '7h 00m',
        price: 850,
        stops: 'Non-stop',
        class: 'Economy'
    },
    {
        id: 'f2',
        airline: 'British Airways',
        flightNumber: 'BA112',
        from: 'JFK',
        to: 'LHR',
        departure: '21:00',
        arrival: '09:00 (+1)',
        duration: '7h 00m',
        price: 920,
        stops: 'Non-stop',
        class: 'Economy'
    },
    {
        id: 'f3',
        airline: 'Virgin Atlantic',
        flightNumber: 'VS004',
        from: 'JFK',
        to: 'LHR',
        departure: '19:00',
        arrival: '07:20 (+1)',
        duration: '7h 20m',
        price: 780,
        stops: 'Non-stop',
        class: 'Economy'
    },
    {
        id: 'f4',
        airline: 'Delta',
        flightNumber: 'DL401',
        from: 'JFK',
        to: 'LHR',
        departure: '17:00',
        arrival: '08:00 (+1)',
        duration: '10h 00m',
        price: 650,
        stops: '1 Stop (BOS)',
        class: 'Economy'
    }
];

export const packages = [
    {
        id: 'p1',
        title: 'Santorini Sunset Escape',
        location: 'Santorini, Greece',
        duration: '5 Days / 4 Nights',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1613395877344-13d4c79e4284?q=80&w=2000&auto=format&fit=crop',
        rating: 4.8,
        features: ['Flights Included', 'Luxury Villa', 'Daily Breakfast']
    },
    {
        id: 'p2',
        title: 'Kyoto Cultural Immersion',
        location: 'Kyoto, Japan',
        duration: '7 Days / 6 Nights',
        price: 1850,
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop',
        rating: 4.9,
        features: ['Guided Tours', 'Tea Ceremony', '4-Star Hotel']
    },
    {
        id: 'p3',
        title: 'Maui Beach Paradise',
        location: 'Maui, Hawaii',
        duration: '6 Days / 5 Nights',
        price: 999,
        image: 'https://images.unsplash.com/photo-1542259659439-429f100069a7?q=80&w=2000&auto=format&fit=crop',
        rating: 4.7,
        features: ['Beachfront Resort', 'Car Rental', 'Luau Dinner']
    },
    {
        id: 'p4',
        title: 'Swiss Alps Adventure',
        location: 'Interlaken, Switzerland',
        duration: '5 Days / 4 Nights',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop',
        rating: 4.9,
        features: ['Train Pass', 'Mountain Excursion', 'Spa Access']
    }
];
