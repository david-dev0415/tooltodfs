import inquirer from 'inquirer'
import Prompt from './util/prompt.js'
import Queries from './database/queries.js'
// import db from './database/db.js'

const questions = [
  {
    type: 'list',
    name: 'theme',
    message: '¿Qué quieres hacer?',
    choices: [
      'Ver espacio de unidad de respaldos DFS',
      'Ver LOGS DFS',
      new inquirer.Separator(),
      'Limpiar LOGS DFS',
      'Limpiar despachos antiguos',
      {
        name: 'Mover archivos de respaldo DFS.',
        disabled: '| Aún no se encuentra disponible.',
      },
      new inquirer.Separator(),
      'Salir',
    ],
  },
]

async function main () {
  const prompt = new Prompt(questions)
  const answers = await prompt.ask()

  switch (answers.theme) {
    case 'Ver espacio de unidad de respaldos DFS':
      Queries.checkBackupSpace()
      break
    case 'Ver LOGS DFS':
      Queries.viewLogs()
      break
    case 'Limpiar LOGS DFS':
      Queries.cleanLogs()
      break
    case 'Limpiar despachos antiguos':
      Queries.viewLogs()
      break
    case 'Salir':
      console.log('Saliendo...')
      break
    default:
      console.log('Opción no válida')
  }

  console.log('Fin del programa')

}

main()