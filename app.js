import inquirer from 'inquirer'
import Prompt from './util/prompt.js'
import Queries from './database/queries.js'
import MessageTemplate from './util/messageTemplate.js'
import cleanController from './controllers/cleanController.js'
import lookLogs from './services/seeLogs.js'

const questions = [
  {
    type: 'rawlist',
    name: 'option',
    message: '¿Qué deseas hacer? (Seleciona entre las opciones 1 al 6): ',
    choices: [
      'Ver espacio de unidad de respaldos DFS.',
      'Ver LOGS DFS.',
      'Limpiar LOGS DFS.',
      'Limpiar despachos antiguos.',
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

  if (global.connected) {
    console.log('Conexión establecida con la base de datos DFS')
  } else {
    console.log('No hay conexión con la base de datos DFS')
  }
  // Message to user
  const message = new MessageTemplate('Bienvenido a tool-dfs para administrar')
  console.log(message.colorMessage('green', 'bgWhite'))
  console.log('\n')

  const prompt = new Prompt(questions)
  const answers = await prompt.ask()

  switch (answers.option) {
    case 'Ver espacio de unidad de respaldos DFS.':
      Queries.checkBackupSpace()
      break
    case 'Ver LOGS DFS.':
      // Queries.viewLogs()
      const message = new MessageTemplate('\nTamaño de archivos de la base de datos\n')      
      console.log(message.colorMessage('blue', 'bgWhite'))
      lookLogs().then(data => {
        message.setMessage(data)
        message.colorMessage('green', 'bgWhite')
        console.log(data)
      }).catch(err => {
        const message = new MessageTemplate(err)
        console.log(message.colorMessage('red', 'bgWhite'))
      })    
      break
    case 'Limpiar LOGS DFS.':
      cleanController.clean()
      break
    case 'Limpiar despachos antiguos.':
      Queries.viewLogs()
      break
    case 'Salir':
      console.log('\n')
      console.log('Hasta pronto...😁')
      console.log('\n')
      setTimeout(() => {
        process.exit()
      }, 2000)
      break
    default:
      console.log('Opción no válida')
  }

}

main()