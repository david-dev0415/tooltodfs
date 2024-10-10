import inquirer from 'inquirer'

class Prompt {
  constructor (questions) {
    this.questions = questions
  }

  async message (message, type) {
    const answers = await inquirer.prompt([
      {
        type,
        name: 'message',
        message,
      },
    ])
    return answers.message
  }

  async ask () {
    const answers = await inquirer.prompt(this.questions)
    return answers
  }

  async askForConfirmation (message) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message,
      },
    ])
    return answers.confirmation
  }

}

export default new Prompt()