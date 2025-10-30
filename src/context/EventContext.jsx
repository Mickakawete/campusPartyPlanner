import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [likedEvents, setLikedEvents] = useState([]);

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

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
                selectedCity,
                setSelectedCity,
                likedEvents,
                setLikedEvents
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

export default EventContext;