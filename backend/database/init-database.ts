import dotenv from "dotenv";
import { Pool } from "pg";
import Papa from "papaparse";
import fs from "fs";
dotenv.config(); 

const pool = new Pool({
  connectionString: process.env.DB_URI
});

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

const createStationsTable = async () => {
  try {
    const client = await pool.connect();
    const sql = `CREATE TABLE stations (
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
    );`;  

    await client.query(sql);
    client.release();
  } catch (error) {
    console.log(error);
  }
};

const readCsv = async (filePath: string): Promise<any[]> => {
  const file = fs.createReadStream(filePath);
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      transformHeader: header => header.trim(),
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
  try{
    return strDate.replace("T", " ");
  } catch (error){
    console.error(error);
  }
};

const insertJourneysCsvToDatabase = async (csv: Journey[]) => {
  const sqlQueryStart = `INSERT INTO journeys ( 
    departure_time, 
    return_time, 
    departure_station_id,
    departure_station_name,
    return_station_id,
    return_station_name,
    covered_distance_m,
    duration_s
    ) VALUES `;
  
  let sqlQuery = ``;
  let rowsToInsert = 0; //Max 1000 rows at once for PostgreSQL INSERT query.
  for(let j = 0; j < csv.length; j++){
    if(csv[j]['Covered distance (m)'] >= 10 && csv[j]['Duration (sec.)'] >= 10){
      rowsToInsert++;
      sqlQuery += `('${toPgTimestamp(csv[j]['Departure'])}', 
        '${toPgTimestamp(csv[j]['Return'])}', 
        ${csv[j]['Departure station id']}, 
        '${csv[j]['Departure station name']}', 
        ${csv[j]['Return station id']}, 
        '${csv[j]['Return station name']}', 
        ${csv[j]['Covered distance (m)']}, 
        ${csv[j]['Duration (sec.)']})`;
        
      if(rowsToInsert < 1000 && j <= csv.length - 2) {
        sqlQuery += ', '
      } else {
        sqlQuery += ';'
        try {
          const client = await pool.connect();
          await client.query((sqlQueryStart + sqlQuery));
          client.release();
        } catch (error) {
          console.log(error);
        }
        sqlQuery = ``;
        rowsToInsert = 0;
      }
    }
  }
}

const handleQuotes = (str: string) => {  
  try{
    return str.replace("'", "''");
  } catch (error){
    console.error(error);
  }
};

const inserStationsCsvToDatabase = async (csv: any[]) => {
  const sqlQueryStart = `INSERT INTO stations ( 
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
    ) VALUES `;
  
  let sqlQuery = ``;
  let rowsToInsert = 0; //Max 1000 rows at once for PostgreSQL INSERT query.
  for(let j = 0; j < csv.length; j++){
    sqlQuery += `(${csv[j]['FID']}, 
      ${csv[j]['ID']}, 
      '${handleQuotes(csv[j]['Nimi'])}', 
      '${handleQuotes(csv[j]['Namn'])}', 
      '${handleQuotes(csv[j]['Name'])}', 
      '${csv[j]['Osoite']}', 
      '${csv[j]['Adress']}', 
      '${csv[j]['Kaupunki']}',
      '${csv[j]['Stad']}',
      '${csv[j]['Operaattor']}',
      ${csv[j]['Kapasiteet']},
      ${csv[j]['x']},
      ${csv[j]['y']}
      )`;
      
    if(rowsToInsert < 1000 && j <= csv.length - 2) {
      sqlQuery += ', '
    } else {
      sqlQuery += ';'
      try {
        const client = await pool.connect();
        await client.query((sqlQueryStart + sqlQuery));
        client.release();
      } catch (error) {
        console.log((sqlQueryStart + sqlQuery))
        console.log(error);
      }
      sqlQuery = ``;
      rowsToInsert = 0;
    }
  }
}

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
  createJourneysTable();
  fs.readdirSync('./data/journeys/').forEach(async fileName => {
    const csvData: Journey[] = await readCsv('./data/journeys/' + fileName);
    insertJourneysCsvToDatabase(csvData);
  });
  createStationsTable();
  fs.readdirSync('./data/stations/').forEach(async fileName => {
    const csvData: any[] = await readCsv('./data/stations/' + fileName);
    inserStationsCsvToDatabase(csvData);
  });
};
main();
