import sql from 'mssql'
import Database from '../database/db.js'

class CleanService {
  constructor () {
    this.clean = this.clean.bind(this)
    this.pool = Database
  }

  async clean () {
    const shrinkDatabaseQuery = `DBCC SHRINKDATABASE (DFS, TRUNCATEONLY);`
    const shrinkFileQuery = `DBCC SHRINKFILE(DFS_Log, 1);`

    try {
      await this.pool.connect()

      // Ejecutar operaciones fuera de la transacción
      await this.pool.query(`ALTER DATABASE DFS SET RECOVERY SIMPLE;`)
      await this.pool.query(shrinkDatabaseQuery)
      await this.pool.query(shrinkFileQuery)
      await this.pool.query(`ALTER DATABASE DFS SET RECOVERY FULL;`)

      console.log('Cleaning logs completed.')
    } catch (err) {
      console.error('Error cleaning logs:', err.message)
      this.pool.showMessageToUser('Error al limpiar los logs. Por favor, intente de nuevo más tarde.', 'error')
    } finally {
      await this.pool.close()
    }
  }
}

export default new CleanService()
