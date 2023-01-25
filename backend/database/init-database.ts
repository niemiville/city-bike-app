import dotenv from "dotenv";
import { Pool } from "pg";
import Papa from "papaparse";
import fs from "fs";
import pg from "pg";
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
      departure_time TIMESTAMP WITHOUT TIME ZONE,
      return_time TIMESTAMP WITHOUT TIME ZONE,
      departure_station_id INTEGER,
      departure_station_name TEXT,
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

const readCsv = async (filePath: string): Promise<any[]> => {
  const file = fs.createReadStream(filePath);
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      complete: results => {
        resolve(results.data);
      },
			error: (error: any) => {
				reject(error);
			},
    });
  });
};

const toPgTimestamp = (strDate: string) => {  
  return strDate.replace("T", " ");
};

const insertCsvToDatabase = async (csv: Journey[]) => {
  let sqlQuery = `INSERT INTO journeys ( 
    departure_time, 
    return_time, 
    departure_station_id,
    departure_station_name,
    return_station_id,
    return_station_name,
    covered_distance_m,
    duration_s
    ) VALUES `;

  for(let j = 0; j < csv.length; j++){
    sqlQuery += `('${toPgTimestamp(csv[j]['Departure'])}', '${toPgTimestamp(csv[j]['Return'])}', ${csv[j]['Departure station id']}, '${csv[j]['Departure station name']}', ${csv[j]['Return station id']}, '${csv[j]['Return station name']}', ${csv[j]['Covered distance (m)']}, ${csv[j]['Duration (sec.)']})`;
    if(j <= csv.length - 2) {
      sqlQuery += ', '
    } else {
      sqlQuery += ';'
    }
  }
  console.log(sqlQuery)

  try {
    const client = await pool.connect();
    await client.query(sqlQuery);
    client.release();
  } catch (error) {
    console.log(error);
  }
}

/* interface Journey2 {
  [column: string]: string | number
} */
type Journey = {
  'Departure': string;
  'Return': string;
  'Departure station id': number;
  'Departure station name': string;
  'Return station id': number;
  'Return station name': string;
  'Covered distance (m)': number;
  'Duration (sec.)': number;
}; 

const main = async () => {
  const csvData: Journey[] = await readCsv("./data/test-data-journeys.csv");
  insertCsvToDatabase(csvData);
};
main();