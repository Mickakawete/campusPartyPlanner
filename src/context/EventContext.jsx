import { createContext, useState, useEffect } from "react";
import { fetchCities, fetchEvents } from "../services/api";

export const EventContext = createContext();

export function EventProvider({ children }) {
    // États principaux
    const [events, setEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Gestion des événements likés (persistés dans localStorage)
    const [likedEvents, setLikedEvents] = useState(() => {
        try {
            const raw = localStorage.getItem("likedEvents");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("loadLikes error", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("likedEvents", JSON.stringify(likedEvents));
        } catch (e) {
            console.error("saveLikes error", e);
        }
    }, [likedEvents]);

    // Chargement des villes
    useEffect(() => {
        let isCancelled = false;

        async function loadCities() {
            try {
                const data = await fetchCities();
                if (!isCancelled) {
                    setCities(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error("fetchCities error", e);
                if (!isCancelled) setCities([]);
            }
        }

        loadCities();
        return () => { isCancelled = true };
    }, []);

    // Chargement des événements
    useEffect(() => {
        let isCancelled = false;

        async function loadEvents() {
            setLoading(true);
            try {
                const data = await fetchEvents(selectedCity);
                if (!isCancelled) {
                    setEvents(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error("fetchEvents error", e);
                if (!isCancelled) setEvents([]);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        }

        loadEvents();

        // Recharge les événements chaque fois que la ville change
        return () => { isCancelled = true };
    }, [selectedCity]);

    // Fonctions utilitaires
    const setCity = (city) => {
        setSelectedCity(city || null);
    };

    const toggleLike = (eventId) => {
        setLikedEvents(prev => {
            if (prev.includes(eventId)) {
                return prev.filter(id => id !== eventId);
            } else {
                return [...prev, eventId];
            }
        });
    };

    // Valeur du contexte
    const contextValue = {
        events,
        setEvents,
        selectedCity,
        setSelectedCity,
        setCity,
        likedEvents,
        setLikedEvents,
        cities,
        toggleLike,
        loading,
    };

    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    );
}

export default EventContext;
