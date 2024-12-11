const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'SIGDB',
  password: 'password',
  port: 5432, // Port par défaut de PostgreSQL
});


client.connect()
  .then(() => console.log('Connecté à PostgreSQL'))
  .catch(err => console.error('Erreur de connexion', err));