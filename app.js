// import inquirer from 'inquirer';
import db from './database/db.js'
import { cleanLogs } from './database/queries.js'
import prompt from './util/prompt.js'

// const queries = cleanLogs.split(';').map(query => query.trim()).filter(query => query.length > 0);

(async () => {
  try {
    // await db.executeTransaction(queries)
    // console.log('Consultas ejecutadas exitosamente.')

    const confirmation = await prompt.askForConfirmation('¿Desea limpiar los logs de DFS?', 'confirm')
    console.log(confirmation)


  } catch (error) {
    console.log('Error querying database', error)
  }
})()

