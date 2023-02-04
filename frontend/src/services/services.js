import axios from 'axios';
const journeysUrl = 'http://localhost:4000/api/journeys/';
const stationsUrl = 'http://localhost:4000/api/stations/';
const singleStationUrl = 'http://localhost:4000/api/stations/singleview/';

const getJourneysPage = async (page) => {
  const journeys = await axios.get(journeysUrl + page);
  return journeys.data;
}

const getStationsPage = async (page) => {
  const stations = await axios.get(stationsUrl + page);
  return stations.data;
}

const getSingleStation = async (id) => {
  const station = await axios.get(singleStationUrl + id);
  return station.data;
}

export { getJourneysPage, getStationsPage, getSingleStation };