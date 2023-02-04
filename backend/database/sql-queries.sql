/*
Queries used in database creation. These are not required to run manually. init-database.ts has these queries implemented.
*/

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

CREATE TABLE stations (
    primary_id SERIAL PRIMARY KEY,
    fid INTEGER,
    id INTEGER,
    name_fi TEXT,
    name_sv TEXT,
    name_en TEXT,
    address_fi TEXT,
    address_sv TEXT,
    city_fi TEXT,
    city_sv TEXT,
    operator TEXT,
    capacity INTEGER,
    coordinate_x DECIMAL,
    coordinate_y DECIMAL
);

INSERT INTO stations ( 
    fid,
    id,
    name_fi,
    name_sv,
    name_en,
    address_fi,
    address_sv,
    city_fi,
    city_sv,
    operator,
    capacity,
    coordinate_x,
    coordinate_y
    ) VALUES 
(),
();

/*
Query for counting departure and returning journeys per stations
*/

SELECT fid, stations.id, name_en, address_fi,
(SELECT COUNT(*)
FROM journeys
WHERE journeys.departure_station_id = stations.id) AS departures, 
(SELECT COUNT(*)
FROM journeys
WHERE journeys.return_station_id = stations.id) AS returns
FROM stations
LIMIT 5
OFFSET 0;
