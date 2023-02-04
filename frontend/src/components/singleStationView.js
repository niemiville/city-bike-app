import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSingleStation } from "../services/services";

export const SingleStationView = () => {
    const [station, setStations] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      getSingleStation(id).then(station => {
        setStations(station);
      })
    }, [id]);

    return(
        <div>
            <h1>Single Station View</h1>
            <Link to='/stations'>Back to stations</Link>
            <table>
                <thead>
                <tr>
                    <th>Station name</th>
                    <th>Address</th>
                    <th>Departures</th>
                    <th>Returns</th>
                </tr>
                </thead>
                <tbody>
                {station.map((j) => 
                    <tr key={j.fid}>
                        <td>{j.name_en}</td>
                        <td>{j.address_fi}</td>
                        <td>{j.departures}</td>
                        <td>{j.returns}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}
