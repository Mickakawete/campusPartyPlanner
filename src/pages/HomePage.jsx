import { CitySelector } from "../components/CitySelector"
import "../styles/pages/home-page.css"

export const HomePage = () => {
  return (
    <main className="home-page">
      <h1>Trouvez facilement un évènement</h1>
      <CitySelector/>
    </main>
  )
}