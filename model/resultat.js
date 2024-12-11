const Pool = require('pg').Pool

// Remplacez par vos informations de connexion
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sigdb',
  password: '12345678',
  port: 5432,
});

async function createTable() {
  try {
    // Connexion à la base de données
    await pool.connect();

    // Création de la table si elle n'existe pas
    const query = `
      CREATE TABLE IF NOT EXISTS resultat (
        id SERIAL PRIMARY KEY,
        bureau_id INT NOT NULL,
        candidat_id INT NOT NULL,
        nbr_voix INT NOT NULL
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
createTable();