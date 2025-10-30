import { EventProvider } from './context/EventContext.jsx';
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import './App.css'
import { HomePage } from './pages/HomePage.jsx';
import { StatsPage } from './pages/StatsPage.jsx';

function App() {

  return (
    <>
      <EventProvider>
        <BrowserRouter>
          <nav>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/stats">Statistique</NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </BrowserRouter>
      </EventProvider>
    </>
  )
}

export default App