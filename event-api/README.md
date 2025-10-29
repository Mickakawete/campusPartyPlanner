# Campus Party Planner API

API REST pour le TP3 - Gestion d'événements étudiants pour les villes de Rennes et Le Mans.

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur :
```bash
npm start
```

Ou en mode développement avec rechargement automatique :
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## Documentation

La documentation Swagger est accessible à l'adresse :
**http://localhost:3000/api-docs**

## Endpoints disponibles

### Health Check

**GET** `/api/health`

Vérifie que l'API fonctionne correctement.

**Exemple de réponse** :
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2025-11-01T12:00:00.000Z"
}
```

---

### Récupérer les villes

**GET** `/api/cities`

Récupère la liste des villes disponibles.

**Exemple de réponse** :
```json
{
  "success": true,
  "data": ["Rennes", "Le Mans"]
}
```

---

### Récupérer tous les événements

**GET** `/api/events`

Récupère tous les événements.

**Paramètres de requête (optionnels)** :
- `city` : Filtre par ville (Rennes ou Le Mans)
- `category` : Filtre par catégorie (soirée, concert, festival, open-air)

**Exemples** :
```bash
# Tous les événements
GET /api/events

# Événements de Rennes uniquement
GET /api/events?city=Rennes

# Concerts du Mans
GET /api/events?city=Le%20Mans&category=concert
```

**Exemple de réponse** :
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Foam Party XXL",
      "date": "2025-11-15",
      "location": "Le Diapason",
      "city": "Rennes",
      "category": "soirée",
      "description": "La plus grosse soirée mousse de l'année !",
      "image": "https://picsum.photos/seed/foam1/400/250"
    }
  ],
  "count": 1
}
```

---

### Récupérer un événement par ID

**GET** `/api/events/:id`

Récupère les détails d'un événement spécifique.

**Exemple** :
```bash
GET /api/events/1
```

**Exemple de réponse** :
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Foam Party XXL",
    "date": "2025-11-15",
    "location": "Le Diapason",
    "city": "Rennes",
    "category": "soirée",
    "description": "La plus grosse soirée mousse de l'année !",
    "image": "https://picsum.photos/seed/foam1/400/250"
  }
}
```

---

### Récupérer les catégories

**GET** `/api/categories`

Récupère la liste des catégories d'événements.

**Exemple de réponse** :
```json
{
  "success": true,
  "data": ["soirée", "concert", "festival", "open-air"]
}
```

---

### Récupérer les statistiques

**GET** `/api/stats`

Récupère des statistiques sur les événements.

**Paramètres de requête (optionnels)** :
- `city` : Filtre les statistiques par ville

**Exemple** :
```bash
GET /api/stats?city=Rennes
```

**Exemple de réponse** :
```json
{
  "success": true,
  "data": {
    "totalEvents": 13,
    "eventsByCity": {
      "Rennes": 13
    },
    "eventsByCategory": {
      "soirée": 5,
      "concert": 4,
      "festival": 2,
      "open-air": 2
    }
  }
}
```

---

## Structure des données

### Event Object

```typescript
{
  id: string,           // ID unique
  name: string,         // Nom de l'événement
  date: string,         // Date (format YYYY-MM-DD)
  location: string,     // Lieu
  city: string,         // Ville (Rennes ou Le Mans)
  category: string,     // Catégorie (soirée, concert, festival, open-air)
  description: string,  // Description
  image: string         // URL de l'image
}
```

---

## Technologies utilisées

- **Node.js** : Runtime JavaScript
- **Express** : Framework web
- **CORS** : Gestion des requêtes cross-origin
- **Swagger** : Documentation API automatique
  - `swagger-jsdoc` : Génération de la spec OpenAPI
  - `swagger-ui-express` : Interface Swagger UI

---

## Données

L'API contient **26 événements fictifs** :
- **13 événements à Rennes** (5 soirées, 4 concerts, 2 festivals, 2 open-air)
- **13 événements au Mans** (5 soirées, 4 concerts, 2 festivals, 2 open-air)

Les données sont stockées dans `data/events.js`.

---

## CORS

L'API accepte les requêtes de toutes les origines (mode développement). En production, il faudrait restreindre les origines autorisées.

---

## Exemples d'utilisation avec fetch()

```javascript
// Récupérer tous les événements
fetch('http://localhost:3000/api/events')
  .then(res => res.json())
  .then(data => console.log(data.data));

// Récupérer les événements de Rennes
fetch('http://localhost:3000/api/events?city=Rennes')
  .then(res => res.json())
  .then(data => console.log(data.data));

// Récupérer un événement par ID
fetch('http://localhost:3000/api/events/1')
  .then(res => res.json())
  .then(data => console.log(data.data));

// Récupérer les statistiques
fetch('http://localhost:3000/api/stats')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

---

## Support

Pour toute question ou problème, contactez le 17.

---

**Bon code !** 🚀
