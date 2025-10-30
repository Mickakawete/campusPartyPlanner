import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();


export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [likedEvents, setLikedEvents] = useState(() => {
        try {
            const raw = localStorage.getItem("likedEvents");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("loadLikes error", e);
            return [];
        }
    });
    const [likeCounts, setLikeCounts] = useState(() => {
        try {
            const counts = localStorage.getItem("likeCounts");
            return counts ? JSON.parse(counts) : {};
        } catch (e) {
            console.error("loadLikeCounts error", e);
            return {};
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
        try {
            localStorage.setItem("likeCounts", JSON.stringify(likeCounts));
        } catch (e) {
            console.error("saveLikeCounts error", e);
        }
    }, [likeCounts]);

    const toggleLike = (eventId) => {
        const isCurrentlyLiked = likedEvents.includes(eventId);

        if (isCurrentlyLiked) {
            // Unlike: retirer de la liste et décrémenter
            setLikedEvents(prev => prev.filter(id => id !== eventId));
            setLikeCounts(prev => ({
                ...prev,
                [eventId]: Math.max(0, (prev[eventId] || 0) - 1)
            }));
        } else {
            // Like: ajouter à la liste et incrémenter
            setLikedEvents(prev => [...prev, eventId]);
            setLikeCounts(prev => ({
                ...prev,
                [eventId]: (prev[eventId] || 0) + 1
            }));
        }
    }

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
                selectedCity,
                setSelectedCity,
                likedEvents,
                setLikedEvents,
                toggleLike,
                likeCounts,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default EventContext;