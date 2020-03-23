import boxen from 'boxen'
import chalk from 'chalk'
import inquirer from 'inquirer'
import emoji from 'node-emoji'
import { terminal as term } from 'terminal-kit'

term.on('key', function (name, matches, data) {
  if (name === 'CTRL_C') {
    term.grabInput(false)
    setTimeout(function () { process.exit() }, 100)
  }
})

class Vcard {
  constructor (me = {}) {
    this.me = me
    this.secondaryColor = 'blue'
    this.input = ''
  }

  get content () {
    let literalString = ''
    for (let index = 0; index < Object.keys(this.me).length; index++) {
      const key = Object.keys(this.me)[index]
      const value = this.me[key]
      literalString = literalString.concat(`${key}: ${chalk[this.secondaryColor](value)}`, '\n')
    }
    return literalString
  }

  print () {
    console.log(boxen(this.content, { padding: 1 }))
  }

  async terminal () {
    term('\n')
    term.cyan('javisantos# ')
    const history = []
    const autoComplete = ['quit', 'exit']
    this.input = await term.inputField({ history: history, autoComplete: autoComplete, autoCompleteMenu: true }).promise
    switch (this.input) {
      case 'exit':
      case 'quit':
        term('\n')
        this.ask()
        return
    }
    term('\n')
    this.terminal()
  }

  ask () {
    term('\n')
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'what',
          message: 'What do you want to do?',
          choices: [
            {
              name: `${chalk.blue(emoji.get('mailbox'))} Send message`,
              value: 'message'
            },
            {
              name: `${chalk.blue(emoji.get('old_key'))}  See public key`,
              value: 'pk'
            },
            {
              name: `${chalk.blue(emoji.get('arrows_clockwise'))} Ping`,
              value: 'ping'
            },
            new inquirer.Separator(),
            {
              name: `${chalk.green(emoji.get('computer'))} Go to terminal`,
              value: 'terminal'
            },
            {
              name: `${chalk.red(emoji.get('heavy_multiplication_x'))} Exit`,
              value: 'exit'
            }
          ]
        }])
      .then(answers => {
        if (answers.what === 'terminal') return this.terminal()
        if (answers.what === 'exit') return setTimeout(function () { process.exit() }, 100)
        if (answers.what === 'pk') {
          term('\n')
          term.green(JSON.stringify(this.me.publicKey, null, 2))
          term('\n')
          return this.ask()
        }
        term.cyan('Working on it!')
        term('\n')
        this.ask()
      })
      .catch(error => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      })
  }
}

export default Vcard
