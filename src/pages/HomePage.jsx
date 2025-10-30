import { CitySelector } from "../components/CitySelector"
import "../styles/pages/home-page.css"
import {EventList} from "../components/EventList.jsx";
import ("../styles/components/event-card.css")

export const HomePage = () => {

  return (
    <>
        <h1>Trouvez facilement un évènement</h1>
        <CitySelector/>
        <h2>Événements à venir</h2>
        <EventList/>

    </>
  )
}