import React, {useContext, useEffect} from 'react';

import {EventCard} from "./EventCard.jsx";
import EventContext from "../context/EventContext.jsx";
import {fetchEvents} from "../services/api.js";

export function EventList() {
    const { events, setEvents, selectedCity } =  useContext(EventContext);
    useEffect(() => {
        fetchEvents(selectedCity ? selectedCity : null )
            .then(data => setEvents(data))
            .catch(error => console.error("Error fetching events:", error));
    }, [selectedCity,setEvents]);
    return (
        <div className="content-event">
            {selectedCity ? (
                events.length > 0 ?(
                    events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))
                ) : (
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>
                        Aucun événement disponible pour le moment.
                    </p>
                )

            ) : (

                events.map(event => (
                    <EventCard key={event.id} event={ event } />
                ))

            )}
        </div>
    );
}