import sql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    requestTimeout: 30000,
  },
}

class Database {
  constructor () {
    this.pool = null
  }

  connect () {
    if (!this.pool) {
      try {
        this.pool = sql.connect(config)
        console.log('Connected to database')
      } catch (error) {
        console.log('Error connecting to database', error)
      }
    }
    return this.pool
  }

  async query (queryString) {
    try {
      const pool = await this.connect()
      if (!pool) {
        throw new Error('No database connection')
      }
      const result = await pool.request().query(queryString)
      return result.recordset
    } catch (error) {
      console.log(error)
    }
  }

  async close () {
    try {
      if (this.pool) {
        await this.pool.close()
        this.pool = null
        console.log('Closed database connection')
      }
    } catch (error) {
      console.error('Error closing the database connection:', error)
    }
  }
}

export default new Database()