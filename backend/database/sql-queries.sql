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
(1, 501, 'Hanasaari', 'Hanaholmen','Hanasaari','Hanasaarenranta 1','Hanaholmsstranden 1','Espoo','Esbo','CityBike Finland',10,24.840319,60.16582);