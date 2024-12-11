const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sigdb',
  password: '12345678',
  port: 5432,
})




const getresultat = (request, response) => {
    pool.query('SELECT * FROM resultat ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  ///
  const getresultatById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM resultat WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //

  const createresultat = (request, response) => {
    const { bureau_id,candidat_id,nbr_voix } = request.body
    console.log("ok")
  
    pool.query('INSERT INTO resultat (bureau_id,candidat_id,nbr_voix) VALUES ($1,$2,$3) RETURNING *', [bureau_id,candidat_id,nbr_voix], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`resultat added with ID: ${results.rows[0].id}`)
    })
  }

  //
  const updateresultat = (request, response) => {
    const id = parseInt(request.params.id)
    const { bureau_id,candidat_id,nbr_voix } = request.body
  
    pool.query(
      'UPDATE resultat SET bureau_id = $1, candidat_id= $2,nbr_voix =$3 WHERE id = $4',
      [ bureau_id,candidat_id,nbr_voix],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`resultat modified with ID: ${id}`)
      }
    )
  }

  //
  const deleteresultat = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM resultat WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`resultat deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getresultat,
    getresultatById,
    createresultat,
    updateresultat,
    deleteresultat,
  }