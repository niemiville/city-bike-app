CREATE TABLE journeys (
    id SERIAL PRIMARY KEY,
    departure_time TIMESTAMP WITHOUT TIME ZONE,
    return_time TIMESTAMP WITHOUT TIME ZONE,
    departure_station_id INTEGER,
    departure_station_name TEXT,
    return_station_id INTEGER,
    return_station_name TEXT,
    covered_distance_m INTEGER,
    duration_s INTEGER
);

INSERT INTO journeys ( 
    id, 
    departure_time, 
    return_time, 
    departure_station_id,
    departure_station_name,
    return_station_id,
    return_station_name,
    covered_distance_m,
    duration_s
) 
VALUES
(),
();

