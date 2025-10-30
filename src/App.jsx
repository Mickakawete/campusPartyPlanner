import { EventProvider } from './context/EventContext.jsx';
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import { HomePage } from './pages/HomePage.jsx';
import { StatsPage } from './pages/StatsPage.jsx';
import './App.css'

function App() {

  return (
    <>
      <EventProvider>
        <BrowserRouter>
          <nav>
            <h1 className='nav__title'>Campus Party Planner</h1>
            <ul className='nav__list'>
              <NavLink className='nav__link' style={({isActive}) => ({backgroundColor : isActive ? "#0000000c" : "transparent"})} to="/">Accueil</NavLink>
              <NavLink className='nav__link' style={({isActive}) => ({backgroundColor : isActive ? "#0000000c" : "transparent"})} to="/stats">Statistique</NavLink>
            </ul>
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