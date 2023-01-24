CREATE TABLE journeys (
    id SERIAL PRIMARY KEY,
    deperature_time TIMESTAMP WITHOUT TIME ZONE,
    return_time TIMESTAMP WITHOUT TIME ZONE,
    deperature_station_id INTEGER,
    deperature_station_name TEXT,
    return_station_id INTEGER,
    return_station_name TEXT,
    covered_distance INTEGER,
    duration INTEGER
);