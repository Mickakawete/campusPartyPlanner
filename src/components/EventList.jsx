import { useContext, useEffect, useState } from 'react';
import EventContext from "../context/EventContext.jsx";
import { fetchEvents } from "../services/api.js";

import { EventCard } from "./EventCard.jsx";
import "../styles/components/event-list.css";

// (Extrait la logique de rendu conditionnel)
const StatusMessage = ({ message, isError = false }) => (
    <div 
        className={isError ? "event-list-error" : "event-list-message"} 
        style={isError ? {} : { color: '#666', fontSize: '1.1rem' }}
    >
        {message}
    </div>
);

export function EventList() {
    // Accès au Contexte (Données et Setters)
    const { events, setEvents, selectedCity } = useContext(EventContext);
    
    // Gestion de l'État Local (pour l'API)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Logique de Récupération des Données (Information Importante)
    useEffect(() => {
        // Démarre l'état de chargement
        setIsLoading(true);
        setError(null);

        // Détermine le paramètre de ville à passer à l'API (null pour "toutes")
        const cityParam = selectedCity || null; 

        // Fonction asynchrone interne pour la gestion de l'appel API
        const loadEvents = async () => {
            try {
                const data = await fetchEvents(cityParam);
                setEvents(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des événements :", err);
                setError("Impossible de charger les événements pour le moment.");
                setEvents([]); // Vide les événements en cas d'échec
            } finally {
                setIsLoading(false);
            }
        };

        loadEvents();
        // Dépendances : setEvents est stable (vient de useContext), selectedCity est la variable de trigger.
    }, [selectedCity, setEvents]); 

    // Rendu Conditionnel (État de l'Application)
    if (isLoading) {
        return <StatusMessage message="Chargement des événements..." />;
    }

    if (error) {
        return <StatusMessage message={error} isError={true} />;
    }

    if (events.length === 0) {
        const message = selectedCity
            ? `Aucun événement trouvé à ${selectedCity}.`
            : "Aucun événement disponible pour le moment.";

        return <StatusMessage message={message} />;
    }
    
    // Rendu de la Liste (État Normal)
    return (
        <div className="event-list"> 
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}