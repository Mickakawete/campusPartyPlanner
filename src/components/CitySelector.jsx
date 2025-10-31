import { useContext } from "react";
import EventContext from "../context/EventContext";

import "../styles/components/city-selector.css";

/**
 * Gère le changement de ville sélectionnée et met à jour le contexte.
 * @param {object} event - L'objet événement du DOM.
 * @param {function} setCity - La fonction de mise à jour du contexte.
 */
const handleCityChange = (event, setCity) => {
    // Si la valeur est vide (""), on passe null pour sélectionner "Tous les événements"
    const newCity = event.target.value || null; 
    setCity(newCity);
};

export const CitySelector = () => {
    // Extraction des données et des setters du contexte EventContext
    const { cities, selectedCity, setCity } = useContext(EventContext);

    // Détermine la valeur initiale du sélecteur. Utilise "" si aucune ville n'est sélectionnée (null).
    const dropdownValue = selectedCity || "";

    return (
        <select 
            className="city-selector-dropdown" 
            value={dropdownValue} 
            onChange={(e) => handleCityChange(e, setCity)}
        >
            {/* Option par défaut pour afficher tous les événements. Sa valeur est vide ("") */}
            <option value="">Tous les événements</option>
            
            {/* Mappage des options de ville */}
            {cities.map((city) => (
                <option 
                    key={city} 
                    className="city-selector-dropdown__option" 
                    value={city}
                >
                    {city}
                </option>
            ))}
        </select>
    );
};