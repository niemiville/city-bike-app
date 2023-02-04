import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
const cors = require('cors')
const app = express();
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
dotenv.config(); 

const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
};
app.use(requestLogger);

const pool = new Pool({
  connectionString: process.env.DB_URI
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};

app.get("/api/journeys/:page", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const journeysPerPage = 20;
    const offset = parseInt(req.params.page) * journeysPerPage;
    const sql = `SELECT id, departure_station_name, return_station_name, covered_distance_m, duration_s 
                FROM journeys ORDER BY id ASC LIMIT ${journeysPerPage} OFFSET ${offset};`;
    const { rows } = await client.query(sql);
    client.release();
    res.send(rows)
  } catch (error) {
      console.log(error);
  }
});

app.get("/api/stations/:page", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const stationsPerPage = 20;
    const offset = parseInt(req.params.page) * stationsPerPage;
    const sql = `SELECT fid, id, name_en, address_fi
                FROM stations
                LIMIT ${stationsPerPage}
                OFFSET ${offset};`;
    const { rows } = await client.query(sql);
    client.release();
    res.send(rows)
  } catch (error) {
      console.log(error);
  }
});

app.get("/api/stations/singleview/:id", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const sql = `SELECT fid, stations.id AS id, name_en, address_fi,
                (SELECT COUNT(*)
                FROM journeys
                WHERE journeys.departure_station_id = ${req.params.id}) AS departures, 
                (SELECT COUNT(*)
                FROM journeys
                WHERE journeys.return_station_id = ${req.params.id}) AS returns
                FROM stations
                WHERE stations.id = ${req.params.id};`;
    const { rows } = await client.query(sql);
    client.release();
    res.send(rows)
  } catch (error) {
      console.log(error);
  }
});

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  void connectToDB();
  console.log(`Backend server is running on port ${PORT}`);
});