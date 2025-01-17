// src/app/api/users/route.js
import pool from '../../../lib/database';
import mysql from  'mysql2/promise';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}