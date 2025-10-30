import { useContext } from "react";
import EventContext from "../context/EventContext";
import "../styles/components/city-selector.css";

export const CitySelector = () => {
  const { cities, selectedCity, setCity } = useContext(EventContext);

  return (
    <>
      <section className="section-city-selector">
        <select className="section-city-selector__dropdown" value={selectedCity || ""} onChange={(e) => setCity(e.target.value)}>
          {cities.map((city) => (
            <option key={city} className="section-city-selector__dropdown__option" value={city}>{city}</option>
          ))}
        </select>
      </section>
    </>
  );
};