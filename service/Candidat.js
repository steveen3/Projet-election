const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SIGDB',
  password: 'password',
  port: 5432,
})




const getCandidat = (request, response) => {
    pool.query('SELECT * FROM Candidat ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  ///
  const getCandidatById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM Candidat WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //

  const createCandidat = (request, response) => {
    const { name,parti,couleur } = request.body
    console.log("ok")
  
    pool.query('INSERT INTO Candidat (name,parti,couleur) VALUES ($1,$2,$3) RETURNING *', [name,parti,couleur], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Candidat added with ID: ${results.rows[0].id}`)
    })
  }

  //
  const updateCandidat = (request, response) => {
    const id = parseInt(request.params.id)
    const { name,parti,couleur } = request.body
  
    pool.query(
      'UPDATE Candidat SET name = $1, parti = $2,couleur =$3 WHERE id = $4',
      [name,parti,couleur],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`candidat modified with ID: ${id}`)
      }
    )
  }

  //
  const deleteCandidat = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM Candidat WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`candidat deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getCandidat,
    getCandidatById,
    createCandidat,
    updateCandidat,
    deleteCandidat,
  }