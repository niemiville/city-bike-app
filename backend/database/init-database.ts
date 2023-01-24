import dotenv from "dotenv";
import { Pool } from "pg";
import Papa from "papaparse";
import fs from "fs";
dotenv.config(); 

const pool = new Pool({
  connectionString: process.env.DB_URI
});

async function getAllFromJourneys () {
    try {
      const client = await pool.connect();
  
      const sql = "SELECT * FROM journeys";
      const { rows } = await client.query(sql);
      const todos = rows;
  
      client.release();
      console.log(todos);
      
  } catch (error) {
      console.log(error);
  }
}

const createJourneysTable = async () => {
  try {
    const client = await pool.connect();
    const sql = `CREATE TABLE journeys ( 
      id SERIAL PRIMARY KEY, 
      deperature_time TIMESTAMP WITHOUT TIME ZONE, 
      return_time TIMESTAMP WITHOUT TIME ZONE, 
      deperature_station_id INTEGER, 
      deperature_station_name TEXT,
      return_station_id INTEGER,
      return_station_name TEXT,
      covered_distance_m INTEGER,
      duration_s INTEGER
      );`;

    await client.query(sql);
    client.release();
  } catch (error) {
    console.log(error);
  }
};
//createJourneysTable();

const readCsv = async (filePath: string) => {
  const file = fs.createReadStream(filePath);
  return new Promise(resolve => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      complete: results => {
        resolve(results);
      }
    });
  });
};

const runner = async () => {
  const csvData = await readCsv("./data/test-data-journeys.csv");
  console.log(csvData);
};
runner();