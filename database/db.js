import sql from 'mssql'
import dotenv from 'dotenv'
import MessageTemplate from '../util/messageTemplate.js'

global.connected = false

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

  async connect () {
    if (!this.pool) {
      try {
        this.pool = await sql.connect(config)
        global.connected = true
      } catch (error) {
        this.showMessageToUser('Error: no hubo conexión con la base de datos DFS.', 'error')
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

  showMessageToUser (message, type = 'info') {
    const messageTemplate = new MessageTemplate(message)
    if (type === 'info') {
      console.log(messageTemplate.colorMessage('blue', 'bgWhite'))
    } else if (type === 'error') {
      console.log(messageTemplate.colorMessage('red', 'bgWhite'))
    } else {
      console.log(messageTemplate.colorMessage('white', 'bgBlack'))
    }
  }

  async close () {
    try {
      if (this.pool) {
        await this.pool.close()
        this.pool = null
        global.connected = false
        console.log('Closed database connection')
      }
    } catch (error) {
      console.error('Error closing the database connection:', error)
    }
  }
}

export default new Database()
