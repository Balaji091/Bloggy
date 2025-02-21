const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Use environment variable for security
    ssl: {
        rejectUnauthorized: false,  // Required for Neon.tech connection
    },
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        console.log('Connected to Neon PostgreSQL ✅');
    }
    release();
});

module.exports = pool;
