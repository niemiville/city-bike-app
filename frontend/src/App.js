import "./styles/cityBikeStyles.css";
import { JourneysTable } from './components/journeysTable';
import { StationsTable } from './components/stationsTable';
import { Frontpage } from './components/frontpage';
import { SingleStationView } from "./components/singleStationView";
import {
  BrowserRouter as Router,
  Routes, Route 
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/stations/singleview/:id' element={<SingleStationView/>} />
          <Route path='/journeys' element={<JourneysTable/>} />
          <Route path='/stations' element={<StationsTable/>} />  
          <Route path='/' element={<Frontpage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
