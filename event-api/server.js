const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const events = require('./data/events');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Campus Party Planner API',
      version: '1.0.0',
      description: 'API REST pour gérer les événements étudiants de Rennes et Le Mans',
      contact: {
        name: 'Lenny LOUIS',
        email: 'contact@ekod.fr'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Serveur de développement'
      }
    ],
    tags: [
      {
        name: 'Events',
        description: 'Opérations liées aux événements'
      },
      {
        name: 'Cities',
        description: 'Opérations liées aux villes'
      },
      {
        name: 'Health',
        description: 'Endpoints de santé de l\'API'
      }
    ]
  },
  apis: ['./server.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Vérifie l'état de l'API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: L'API fonctionne correctement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: API is running
 *                 timestamp:
 *                   type: string
 *                   example: 2025-11-01T12:00:00.000Z
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /api/cities:
 *   get:
 *     summary: Récupère la liste des villes disponibles
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: Liste des villes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Rennes", "Le Mans"]
 */
app.get('/api/cities', (req, res) => {
  const cities = [...new Set(events.map(event => event.city))];
  res.json({
    success: true,
    data: cities
  });
});

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Récupère la liste des événements
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           enum: [Rennes, Le Mans]
 *         description: Filtre les événements par ville
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [soirée, concert, festival, open-air]
 *         description: Filtre les événements par catégorie
 *     responses:
 *       200:
 *         description: Liste des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 count:
 *                   type: integer
 *                   example: 26
 */
app.get('/api/events', (req, res) => {
  const { city, category } = req.query;

  let filteredEvents = [...events];

  if (city) {
    filteredEvents = filteredEvents.filter(event =>
      event.city.toLowerCase() === city.toLowerCase()
    );
  }

  if (category) {
    filteredEvents = filteredEvents.filter(event =>
      event.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.json({
    success: true,
    data: filteredEvents,
    count: filteredEvents.length
  });
});

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Récupère un événement par son ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: Événement non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Event not found
 */
app.get('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const event = events.find(e => e.id === id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }

  res.json({
    success: true,
    data: event
  });
});

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Récupère la liste des catégories d'événements
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Liste des catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["soirée", "concert", "festival", "open-air"]
 */
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(events.map(event => event.category))];
  res.json({
    success: true,
    data: categories
  });
});

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Récupère des statistiques sur les événements
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           enum: [Rennes, Le Mans]
 *         description: Filtre les statistiques par ville
 *     responses:
 *       200:
 *         description: Statistiques des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalEvents:
 *                       type: integer
 *                       example: 26
 *                     eventsByCity:
 *                       type: object
 *                       example: {"Rennes": 13, "Le Mans": 13}
 *                     eventsByCategory:
 *                       type: object
 *                       example: {"soirée": 10, "concert": 8, "festival": 4, "open-air": 4}
 */
app.get('/api/stats', (req, res) => {
  const { city } = req.query;

  let filteredEvents = [...events];
  if (city) {
    filteredEvents = filteredEvents.filter(event =>
      event.city.toLowerCase() === city.toLowerCase()
    );
  }

  const eventsByCity = filteredEvents.reduce((acc, event) => {
    acc[event.city] = (acc[event.city] || 0) + 1;
    return acc;
  }, {});

  const eventsByCategory = filteredEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      totalEvents: filteredEvents.length,
      eventsByCity,
      eventsByCategory
    }
  });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID unique de l'événement
 *           example: "1"
 *         name:
 *           type: string
 *           description: Nom de l'événement
 *           example: "Foam Party XXL"
 *         date:
 *           type: string
 *           format: date
 *           description: Date de l'événement (YYYY-MM-DD)
 *           example: "2025-11-15"
 *         location:
 *           type: string
 *           description: Lieu de l'événement
 *           example: "Le Diapason"
 *         city:
 *           type: string
 *           description: Ville de l'événement
 *           enum: [Rennes, Le Mans]
 *           example: "Rennes"
 *         category:
 *           type: string
 *           description: Catégorie de l'événement
 *           enum: [soirée, concert, festival, open-air]
 *           example: "soirée"
 *         description:
 *           type: string
 *           description: Description de l'événement
 *           example: "La plus grosse soirée mousse de l'année !"
 *         image:
 *           type: string
 *           format: uri
 *           description: URL de l'image de l'événement
 *           example: "https://picsum.photos/seed/foam1/400/250"
 */

// Route 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableRoutes: [
      'GET /api/health',
      'GET /api/cities',
      'GET /api/events',
      'GET /api/events/:id',
      'GET /api/categories',
      'GET /api/stats',
      'GET /api-docs (Swagger documentation)'
    ]
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🎉  Campus Party Planner API                               ║
║                                                               ║
║   ✓ Server running on http://localhost:${PORT}                  ║
║   ✓ API documentation: http://localhost:${PORT}/api-docs        ║
║                                                               ║
║   Available endpoints:                                        ║
║   • GET /api/health                                           ║
║   • GET /api/cities                                           ║
║   • GET /api/events                                           ║
║   • GET /api/events/:id                                       ║
║   • GET /api/categories                                       ║
║   • GET /api/stats                                            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
