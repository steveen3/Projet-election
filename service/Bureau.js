const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SIGDB',
  password: 'password',
  port: 5432,
})

pool.connect()
  .then(() => console.log('Connecté à PostgreSQL'))
  .catch(err => console.error('Erreur de connexion', err));


const getBureau = (request, response) => {
    pool.query('SELECT * FROM Bureau ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  ///
  const getBureauById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM Bureau WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //

  const createBureau = (request, response) => {
    const { name,matricule,region,departement,arrondissement,nbr_electeur } = request.body
    console.log("ok")
  
    pool.query('INSERT INTO Bureau (name,matricule,region,departement,arrondissement,nbr_electeur) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [name,matricule,region,departement,arrondissement,nbr_electeur], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Bureau added with ID: ${results.rows[0].id}`)
    })
  }

  //
  const updateBureau = (request, response) => {
    const id = parseInt(request.params.id)
    const { name,matricule,region,departement,arrondissement,nbr_electeur } = request.body
  
    pool.query(
      'UPDATE Bureau SET name = $1, matricule = $2 region= $3 ,departement = $4 , arrondissement =$5 , nbr_electeur=$6 WHERE id = $7',
      [name,matricule,region,departement,arrondissement,nbr_electeur,id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Bureau modified with ID: ${id}`)
      }
    )
  }

  //
  const deleteBureau = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM Bureau WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`bureau deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getBureau,
    getBureauById,
    createBureau,
    updateBureau,
    deleteBureau,
  }