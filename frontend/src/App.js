import React, { useState, useEffect } from 'react';
import { getJourneysPage } from "./services/services";
import "./styles/cityBikeStyles.css";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [page, setPage] = useState(0);
  const [pageInputFieldValue, setPageInputFieldValue] = useState(0);

  useEffect(() => {
    if(page < 0){
      setPage(0);
    }
    setPageInputFieldValue(page);
    getJourneysPage(page).then(journey => {
      setJourneys(journey);
    })
  }, [page]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Departure station name</th>
            <th>Return station name</th>
            <th>Covered distance</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((j) => 
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.departure_station_name}</td>
              <td>{j.return_station_name}</td>
              <td>{(j.covered_distance_m / 1000).toFixed(2)} km</td>
              <td>{(j.duration_s / 60).toFixed(2)} min</td>
            </tr>
          )}
        </tbody>
      </table>
      <input className="button" type="button" onClick={() => setPage(parseInt(page) - 1)} value="Previous page" />
      <input type="number" value={pageInputFieldValue} onChange={e=> setPageInputFieldValue(e.target.value)} />
      <input className="button" type="button" onClick={() => setPage(pageInputFieldValue)} value="Go to page" />
      <input className="button" type="button" onClick={() => setPage(parseInt(page) + 1)} value="Next page" />
    </div>
  );
}

export default App;
