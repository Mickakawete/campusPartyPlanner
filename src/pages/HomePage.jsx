import React from 'react';
import { CitySelector } from "../components/CitySelector"
import { EventList } from "../components/EventList.jsx";

import "../styles/pages/home-page.css"

/* Composant de page d'accueil */
export const HomePage = () => {
    return (
        <main className="home-page-main"> {/* Utilisation de <main> pour l'accessibilité */}
            {/* Section du Sélecteur de Ville (Titre et Filtre) */}
            <section className="section-city-selector">
                <h1 className="section-city-selector__title">
                    L'événement parfait <br/>commence ici.
                </h1>
                {/* Composant de filtre */}
                <CitySelector/>
            </section>

            {/* Section de la Liste des Événements */}
            <section className="home-page-container__section-card">
                {/* Composant de la liste des événements */}
                <EventList/>
            </section>
        </main>
    )
}