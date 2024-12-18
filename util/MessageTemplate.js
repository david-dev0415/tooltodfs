import clc from 'cli-color'

class MessageTemplate {

  #message = 'This is a message default.'

  constructor (message) {
    this.#message = message
  }

  colorMessage (colorType, bgColor) {
    switch (colorType) {
      case 'green':
        return this.#colorMessage('green', bgColor)
      case 'red':
        return this.#colorMessage('red', bgColor)
      case 'blue':
        return this.#colorMessage('blue', bgColor)
      case 'yellow':
        return this.#colorMessage('yellow', bgColor)
      default:
        return this.#colorMessage('white', bgColor)
    }
  }

  #colorMessage (color, bgColor) {
    return clc[color][bgColor](this.#message)
  }

  setMessage(message) {
    this.#message = message
  }

}

export default MessageTemplate