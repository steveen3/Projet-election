const Pool = require('pg').Pool

// Remplacez par vos informations de connexion
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SIGDB',
  password: 'password',
  port: 5432,
});

async function createCandidatTable() {
  try {
    // Connexion à la base de données
    await pool.connect();

    // Création de la table si elle n'existe pas
    const query = `
      CREATE TABLE IF NOT EXISTS candidat (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        parti VARCHAR(100) NOT NULL,
        couleur VARCHAR(50) NOT NULL
      );
    `;

    await pool.query(query);
    

  } catch (err) {
    console.error("Erreur lors de la création de la table:", err);
  } finally {
    // Déconnexion de la base de données
    await pool.end();
  }
}


// Exécution de la fonction
createCandidatTable();