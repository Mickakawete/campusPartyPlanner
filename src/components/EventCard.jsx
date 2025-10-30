import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import "../styles/components/event-card.css";

export function EventCard({ event }) {
    const  { likedEvents, toggleLike} = useContext(EventContext);

    const isLiked = likedEvents.includes(event.id);

    function handleLikeClick(e){
        e.preventDefault();
        toggleLike(event.id);
    }
    return (
        <div className="event-card">
            <div className="event-card__image-wrapper">
                <img src={event.image} alt={event.name} className="event-card__image" />
                <span className="event-card__date">{event.date}</span>
                <button
                    className={`event-card__like-btn ${isLiked ? 'liked' : ''}`}
                    onClick={handleLikeClick}
                    aria-label={isLiked ? "Unlike event" : "Like event"}
                >
                    {isLiked ? '❤️' : '🤍'}

                </button>
            </div>
            <div className="event-card__content">
                <div className="event-card__header">
                    <h3 className="event-card__title">{event.name}</h3>
                    {event.category && (
                        <span className="event-card__category">{event.category}</span>
                    )}
                </div>
                <p className="event-card__location">
                    <span className="event-card__icon">📍</span>
                    {event.location}
                </p>
                <p className="event-card__location">
                    <span className="event-card__icon">📍</span>
                    {event.city}
                </p>
                <button className="event-card__button">
                    Voir plus
                </button>
            </div>
        </div>
    );
}

