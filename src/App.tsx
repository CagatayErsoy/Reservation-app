import { useEffect, useState } from 'react';
import './App.css'
import Map from './components/Map'

function App() { 
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    display_name: "",
  });
  function getCurrentLocation(position: any) {
    const url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
      position.coords.latitude +
      "&lon=" +
      position.coords.longitude;

    fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) =>
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          display_name: `${data.address.city}, ${data.address.country}`,
        })
      );
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }, []);
  return (
    <div className='App'>
      <section className='map-container'>
         <Map location={location}/>
      </section>      
    </div>
  )
}

export default App
