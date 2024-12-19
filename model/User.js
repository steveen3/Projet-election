
const Pool = require('pg').Pool

// Remplacez par vos informations de connexion
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SIGDB',
  password: 'password',
  port: 5432,
});


async function createUserTable() {
  try {
    // Connexion à la base de données
    await pool.connect();

    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
          CREATE TYPE user_role AS ENUM ('scrutateur', 'admin');
        END IF;
      END $$;
    `);

    // Création de la table si elle n'existe pas
    const query = `
      CREATE TABLE IF NOT EXISTS "users" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        role user_role NOT NULL
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
createUserTable();