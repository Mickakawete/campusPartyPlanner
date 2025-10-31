import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { EventProvider } from './context/EventContext.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { StatsPage } from './pages/StatsPage.jsx';

import './App.css'
import DarkModeProvider from "./context/DarkModeContext.jsx";
import ToggleDarkMode from "./components/ToggleDarkMode.jsx";

// Fonction pour définir le style de la NavLink en fonction de l'état "isActive"
const getNavLinkStyle = ({ isActive }) => ({
  border: isActive ? "1px solid #cc9c4366" : "1px solid #cc9c4333",
});

function App() {
  return (
    <>
      {/* 1. Fournisseur de Contexte : Englobe l'application pour l'accès aux données globales */}
        <DarkModeProvider>
          <EventProvider>
            {/* 2. Router : Nécessaire pour gérer la navigation */}
            <BrowserRouter>

              {/* En-tête de l'application (Titre et Navigation) */}
              <header>
                <h1 className='site-title'>Campus Party <span>Planner</span></h1>
                <nav className='site-navbar'>
                  {/* Liens de Navigation (NavLink utilise la fonction de style) */}
                  <NavLink
                    className="site-navbar__navbar-link"
                    style={getNavLinkStyle}
                    to="/"
                  >
                    Accueil
                  </NavLink>
                  <NavLink
                    className="site-navbar__navbar-link"
                    style={getNavLinkStyle}
                    to="/stats"
                  >
                    Statistique
                  </NavLink>
                    <ToggleDarkMode/>
                </nav>
              </header>

              {/* Définition des Routes de l'application */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stats" element={<StatsPage />} />
              </Routes>
            </BrowserRouter>
          </EventProvider>
        </DarkModeProvider>
    </>
  )
}

export default App