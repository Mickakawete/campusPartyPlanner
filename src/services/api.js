
const API_URL = 'http://localhost:3000/api';

export async function fetchEvents(city = null) {
    const url = city ? `${API_URL}/events?city=${city}` : `${API_URL}/events`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

export async function fetchCities() {
    const url = `${API_URL}/cities`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}