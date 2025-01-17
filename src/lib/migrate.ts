const { Client } = require('pg');
import { GetDBSettings, IDBSettings } from '../sharedCode/common'


let connectionParams = GetDBSettings()

const sourceClient = new Client(connectionParams);

const targetClient = new Client(connectionParams);

async function migrateData() {
  try {
    await sourceClient.connect();
    await targetClient.connect();

    const res = await sourceClient.query('SELECT * FROM your_table');
    for (let row of res.rows) {
      await targetClient.query('INSERT INTO your_table (column1, column2) VALUES ($1, $2)', [row.column1, row.column2]);
    }

    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await sourceClient.end();
    await targetClient.end();
  }
}

migrateData();
