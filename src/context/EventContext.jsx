import { createContext, useState, useEffect } from "react";
import { fetchCities } from "../services/api";

export const EventContext = createContext();

export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cities, setCities] = useState([]);
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
                if (!isCancelled) {
                    setCities([]);
                }
            }
        }
        loadCities();
        return () => {
            isCancelled = true;
        };
    }, []);

    const setCity = (city) => {
        setSelectedCity(city || null);
    };

    const toggleLike = (eventId) => {
        const isCurrentlyLiked = likedEvents.includes(eventId);

        if (isCurrentlyLiked) {
            setLikedEvents(prev => prev.filter(id => id !== eventId));
        } else {
            setLikedEvents(prev => [...prev, eventId]);
        }
    }

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
                selectedCity,
                setSelectedCity,
                setCity,
                likedEvents,
                setLikedEvents,
                cities,
                toggleLike,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

export default EventContext;