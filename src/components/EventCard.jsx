import { useContext, useCallback, useMemo } from 'react';
import { EventContext } from '../context/EventContext';

import "../styles/components/event-card.css";

// Cette extraction simplifie le JSX principal de EventCard
const LikeButton = ({ id, isLiked, toggleLike }) => {
    // Utilisation de useCallback pour optimiser la fonction de clic
    const handleLikeClick = useCallback((e) => {
        // Empêche le comportement par défaut (ex: soumission de formulaire)
        e.preventDefault(); 
        toggleLike(id);
    }, [id, toggleLike]);

    return (
        <button 
            className={`event-card__like-btn ${isLiked ? 'liked' : ''}`} 
            onClick={handleLikeClick} 
            aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            {isLiked ? '❤️' : '🤍'}
        </button>
    );
};

/**
 * Composant affichant une carte d'événement détaillée.
 * @param {object} props.event - Les données de l'événement.
 */
export function EventCard({ event }) {
    // Extraction des propriétés de l'événement (pour un accès direct)
    const { id, image, name, date, category, location, city } = event;

    // Accès au contexte global
    const { likedEvents, toggleLike } = useContext(EventContext);

    // Calcul de l'état (Information Importante)
    // useMemo garantit que ce calcul ne se refait que si likedEvents ou id change.
    const isLiked = useMemo(() => likedEvents.includes(id), [likedEvents, id]);
    
    return (
        <div className="event-card">
            {/* Conteneur d'image */}
            <div className='event-card__image-container'>
                <img src={image} alt={name} className="event-card__image-container__image" />
            </div>
            
            {/* Bouton de Like (Utilisation du sous-composant) */}
            <LikeButton id={id} isLiked={isLiked} toggleLike={toggleLike} />

            {/* Date de l'événement */}
            <span className="event-card__date">{date}</span>

            {/* Header / Titre et Catégorie */}
            <div className="event-card__header">
                {category && (
                    <span className="event-card__category">{category}</span>
                )}
                <h3 className="event-card__title">{name}</h3>
            </div>
                
            {/* Détails de Lieu et Ville (regroupement logique) */}
            <p className="event-card__location">
                <span className="event-card__icon">📍</span>
                {location}
            </p>
            
            <p className="event-card__location">
                <span className="event-card__icon">🏙️</span>
                {city}
            </p>

            {/* Bouton principal d'action */}
            <button className="event-card__button">
                Voir plus
            </button>
        </div>
    );
}