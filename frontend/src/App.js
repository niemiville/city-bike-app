import React, { useState, useEffect } from 'react';
import { getJourneysPage } from "./services/services";
import "./styles/cityBikeStyles.css";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [page, setPage] = useState(0);
  const [pageInputFieldValue, setPageInputFieldValue] = useState(0);

  useEffect(() => {
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
      <input type="number" value={pageInputFieldValue} onChange={e=> setPageInputFieldValue(e.target.value)} />
      <button onClick={() => setPage(pageInputFieldValue)}>Go to page</button>
    </div>
  );
}

export default App;