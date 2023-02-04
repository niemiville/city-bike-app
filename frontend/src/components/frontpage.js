import { Link } from 'react-router-dom';

export const Frontpage = () => {
    return (
        <div>
            <h1>Helsinki City Bike App</h1>
            <Link to='/journeys'>Open journeys view</Link>
            <br /><br />
            <Link to='/stations'>Open stations view</Link>
        </div>
    )
}