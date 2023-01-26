import React, { useState, useEffect } from 'react';
import { getJourneys } from "./services/services";
import "./styles/cityBikeStyles.css";

function App() {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    getJourneys().then(journey => {
      setJourneys(journey);
    })
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Departure time</th>
            <th>Return time</th>
            <th>Departure station id</th>
            <th>Departure station name</th>
            <th>Return station id</th>
            <th>Return station name</th>
            <th>Covered distance in meters</th>
            <th>Duration in seconds</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((j) => 
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.departure_time}</td> 
              <td>{j.return_time}</td>
              <td>{j.departure_station_id}</td>
              <td>{j.departure_station_name}</td>
              <td>{j.return_station_id}</td>
              <td>{j.return_station_name}</td>
              <td>{j.covered_distance_m}</td>
              <td>{j.duration_s}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
