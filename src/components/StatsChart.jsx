import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import EventContext from "../context/EventContext.jsx";

import '../styles/components/stats-chart.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function StatsChart() {
    const { events = [], likedEvents = [], loading } = useContext(EventContext);

    // si les données ne sont pas encore prêtes
    if (loading) {
        return <p className="no-data-message">Chargement des statistiques...</p>;
    }

    // si `events` n’est pas un tableau
    if (!Array.isArray(events) || events.length === 0) {
        return <p className="no-data-message">Aucune donnée disponible pour afficher les statistiques.</p>;
    }

    // Calcul des statistiques
    const categoryCounts = events.reduce((acc, event) => {
        if (event && event.category) {
            acc[event.category] = (acc[event.category] || 0) + 1;
        }
        return acc;
    }, {});

    const categoryLikes = events.reduce((acc, event) => {
        if (event && event.category && likedEvents.includes(event.id)) {
            acc[event.category] = (acc[event.category] || 0) + 1;
        }
        return acc;
    }, {});

    const categories = Object.keys(categoryCounts);

    // Données du graphique
    const data = {
        labels: categories,
        datasets: [
            {
                label: "Nombre d'événements",
                data: categories.map(cat => categoryCounts[cat]),
                backgroundColor: '#cc9c4325',
                borderColor: '#cc9c43b5',
                borderWidth: 1,
                borderRadius: 5, 
            },
            {
                label: 'Événements likés',
                data: categories.map(cat => categoryLikes[cat] || 0),
                backgroundColor: '#ff3a3a25',
                borderColor: '#ff3a3ab5',
                borderWidth: 1,
                borderRadius: 5, 
            }
        ]
    };

    // Options du graphique
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    font: {
                        size: 14,
                        weight: '200',
                    },
                    color: "#ffffff",
                    boxWidth: 20,
                }
            },
            title: {
                display: true,
                text: 'Statistiques des événements par catégorie',
                font: {
                    size: 40,
                    weight: '900',
                },
                color: '#ffffff',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            tooltip: { 
                backgroundColor: '#0b1937ff',
                borderColor: '#323948ff',
                borderWidth: 1,
                bodyFont: {
                    size: 15
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 12 } }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    font: { size: 12 },
                    color: '#ffffff'
                },
                grid: { color: '#ffffff28' }
            }
        }
    };

    // Rendu final
    return (
        <div className="stats-chart-card">
            <Bar data={data} options={options} />

            <div className="stats-chart-card__stats-container">
                <div className="stats-chart-card__stats-container__stat-box">
                    <h3 className="stats-chart-card__stats-container__stat-box__stat-title">Total Événements</h3>
                    <p className="stats-chart-card__stats-container__stat-box__stat-value stat-value-total">{events.length}</p>
                </div>
                <div className="stats-chart-card__stats-container__stat-box">
                    <h3 className="stats-chart-card__stats-container__stat-box__stat-title">Événements Likés</h3>
                    <p className="stats-chart-card__stats-container__stat-box__stat-value stat-value-liked">{likedEvents.length}</p>
                </div>
                <div className="stats-chart-card__stats-container__stat-box">
                    <h3 className="stats-chart-card__stats-container__stat-box__stat-title">Catégories Uniques</h3>
                    <p className="stats-chart-card__stats-container__stat-box__stat-value stat-value-total">{categories.length}</p>
                </div>
            </div>
        </div>
    );
}

export default StatsChart;
