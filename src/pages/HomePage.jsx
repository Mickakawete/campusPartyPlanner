import { CitySelector } from "../components/CitySelector"
import "../styles/pages/home-page.css"
import { EventCard } from '../components/EventCard.jsx';
import {useContext, useEffect} from "react";
import {EventContext} from "../context/EventContext.jsx";
import {fetchEvents} from "../services/api.js";
import ("../styles/components/EventCard.css")

export const HomePage = () => {
    const { events, setEvents } =   useContext(EventContext);
    useEffect(() => {
        fetchEvents()
            .then(data => setEvents(data))
            .catch(error => console.error("Error fetching events:", error));
    }, [setEvents]);
  return (
    <>
        <h1>Trouvez facilement un évènement</h1>
        <CitySelector/>
        <h2>Événements à venir</h2>
        <div className="content-event">
            {events.length > 0 ? (
                events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))
            ) : (
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Aucun événement disponible pour le moment.
                </p>
            )}
        </div>
    </>
  )
}