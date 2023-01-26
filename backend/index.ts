import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
const cors = require('cors')
const app = express();
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
dotenv.config(); 

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
  console.log(`Database server is running on port ${process.env.PORT}`);
});