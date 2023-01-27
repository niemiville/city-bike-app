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

app.get("/journeys", async (_req: Request, res: Response) => {
  try {
    const client = await pool.connect();

    const sql = "SELECT * FROM journeys LIMIT 20;";
    const { rows } = await client.query(sql);
    const todos = rows;
    client.release();
    res.send(todos)
  } catch (error) {
      console.log(error);
  }
});

app.get("/journeys/:page", async (req: Request, res: Response) => {
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

app.get("/test", (_req: Request, res: Response) => {
  res.send("hi");
});

app.get("/test2", async (_req: Request, res: Response) => {
  try {
    const client = await pool.connect();

    const sql = "SELECT * FROM todo";
    const { rows } = await client.query(sql);
    const todos = rows;

    client.release();

    res.send(todos);
} catch (error) {
    res.status(400).send(error);
}
});

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

app.listen(process.env.PORT, () => {
  void connectToDB();
  console.log(`Backend server is running on port ${process.env.PORT}`);
});