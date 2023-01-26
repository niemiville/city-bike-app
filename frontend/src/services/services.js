import axios from 'axios'
const apiUrl = 'http://localhost:4000/journeys'

const getJourneys = async () => {
  const journeys = await axios.get(apiUrl);
  return journeys.data;
}

export { getJourneys };