import { createContext, useState, useEffect } from "react";
import { fetchCities } from "../services/api";

export const EventContext = createContext();

export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [likedEvents, setLikedEvents] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("likedEvents");
            if (raw) {
                setLikedEvents(JSON.parse(raw));
            }
        } catch (e) {
            console.error("loadLikes error", e);
        }
    }, []);

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
                cities
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

export default EventContext;