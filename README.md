# Helsinki City Bike App  

My implementation of [Solita Dev Academy Finland 2023 pre-assignment](https://github.com/solita/dev-academy-2023-exercise). App has PostgreSQL database, TypeScript server and React frontend. App displays data about bike stations and journeys done with Helsinki city bikes.   

## Installation instructions  

(I used Windows 10 and 11 operating systems)

1. Clone this git repository  

### Create PostgreSQL Docker container  

2. Install Docker Desktop v.4.16.3 (probably other versions work too) and keep it open
3. Open command prompt and pull docker image for postgresql with command `docker pull postgres`  
4. Create and run postgres container and user with command `docker run --name postgresql -e POSTGRES_USER=myusername -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres`  
5. Start the container if not already  

### Install Node dependencies
6. Run command `npm install` in directories city-bike-app/backend and city-bike-app/frontend

### Set environment variables
7. Set environment variables to .env files in /backend directory and make sure /frontend/src/services/services.js file has same port in the api url (4000 by default).  
(I will probably leave .env file to the repository because this app is run locally right now, so it doesn't matter if others see them. Unless you changed the PostgreSQL container's credentials or other settings, the current .env values should be good. If the app is run online, database credentials should be changed.)  

### Initialize the database
8. Download the journey data and station data from its original sources.  

For the exercise download three datasets of journey data. The data is owned by City Bike Finland.

* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

Also, there is a dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations.

* Dataset: <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
9. Place journeys .csv files to directory `city-bike-app/backend/data/journeys` and station data to directory `city-bike-app/backend/data/stations`  
10. In `city-bike-app/backend` directory run the command `npm run initdb` to create the database tables and send the data from .csv files to database. Journeys data will be also filtered. Make sure that the container is running. Initializing the database will take few minutes (about 2 mins on my laptop).  

### Start the app
11. Start backend with command `npm run dev` in directory `city-bike-app/backend`   
12. Start frontend with comman `npm start` in directory `city-bike-app/frontend`  
13. Go to [http://localhost:3000/](http://localhost:3000/) to test the app.  

## Implemented features  

All the recommended features plus pagination for journey and station view. No tests are done.

## Chosen technologies

TypeScript for backend, PostgreSQL for database and React for frontend.   
