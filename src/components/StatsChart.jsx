import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import EventContext from "../context/EventContext.jsx";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function StatsChart() {
    const { events, likedEvents } = useContext(EventContext);


    const categoryCounts = events.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1;
        return acc;
    }, {});


    const categoryLikes = events.reduce((acc, event) => {
        if (likedEvents.includes(event.id)) {
            acc[event.category] = (acc[event.category] || 0) + 1;
        }
        return acc;
    }, {});


    const categories = Object.keys(categoryCounts);

    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Nombre d\'événements',
                data: categories.map(cat => categoryCounts[cat]),
                backgroundColor: '#2f8ea3',
            },
            {
                label: 'Événements likés',
                data: categories.map(cat => categoryLikes[cat] || 0),
                backgroundColor: '#ff6b6b',
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statistiques des événements par catégorie',
                font: {
                    size: 18
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    if (events.length === 0) {
        return <p>Aucune donnée disponible pour afficher les statistiques.</p>;
    }

    return (
        <>
            <Bar data={data} options={options} />

            <div>
                <div>
                    <h3>Total Événements</h3>
                    <p>{events.length}</p>
                </div>
                <div>
                    <h3>Événements Likés</h3>
                    <p>{likedEvents.length}</p>
                </div>
                <div>
                    <h3>Catégories</h3>
                    <p>{categories.length}</p>
                </div>
            </div>
        </>
    );
}

export default StatsChart;