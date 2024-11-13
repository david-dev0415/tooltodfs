import cleanService from '../services/cleanService.js'

class cleanController {
  constructor () {
    this.cleanService = cleanService
  }

  clean () {
    try {
      this.cleanService.clean()
    } catch (error) {
      console.error('Error cleaning logs:', error.message)
      throw new Error('Error al limpiar los logs. Por favor, intente de nuevo más tarde.')
    }
  }
}

export default new cleanController()

