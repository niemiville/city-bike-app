import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getStationsPage } from "../services/services";

export const StationsTable = () => {
    const [stations, setStations] = useState([]);
    const [stationPage, setStationPage] = useState(0);
    const [stationPageInputFieldValue, setStationPageInputFieldValue] = useState(0);
  
    useEffect(() => {
      if(stationPage < 0){
        setStationPage(0);
      }
      setStationPageInputFieldValue(stationPage);
      getStationsPage(stationPage).then(station => {
        setStations(station);
      })
    }, [stationPage]);

    return(
        <div>
            <h1>Stations</h1>
            <Link to='/'>Back to front page</Link>
            <table>
                <thead>
                <tr>
                    <th>Station name</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {stations.map((j) => 
                    <tr key={j.fid}>
                        <td><Link to={`/stations/singleview/${j.id}`}>{j.name_en}</Link></td>
                        <td>{j.address_fi}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <input className="button" type="button" onClick={() => setStationPage(parseInt(stationPage) - 1)} value="Previous page" />
            <input className="button" type="button" onClick={() => setStationPage(parseInt(stationPage) + 1)} value="Next page" />
            <br />
            <input type="number" value={stationPageInputFieldValue} onChange={e=> setStationPageInputFieldValue(e.target.value)} />
            <input className="button" type="button" onClick={() => setStationPage(stationPageInputFieldValue)} value="Go to page" />
        </div>
    )
}
