const inquirer = require('inquirer')

require('events').EventEmitter.prototype._maxListeners = 100

class MineSweeper {
  constructor() {
    this.board = []
    this.lookup = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      I: 8,
      J: 9
    }
  }
  newGame() {
    console.log('Alright, onward to the field')
    console.log('****************************')
    this.board = []
    const mines = []
    while (mines.length < 10) {
      const mine = Math.floor(Math.random() * 100)
      if (mines.indexOf(mine) === -1) {
        mines.push(mine)
      }
    }
    console.log(mines)
    for (let i=0; i<10; i++) {
      let row = []
      for (let j=0; j<10; j++) {
        let mine = false
        let index = parseInt(`${i}${j}`, 10)
        if (mines.indexOf(index) !== -1) mine = true
        let space = {
          mine,
          leftClicked: false,
          rightClicked: false,
          display: '_',
          index: index + 1
        }
        row.push(space)
      }
      this.board.push(row)
    }
  }
  startGame() {
    const that = this
    inquirer.prompt([{
      name: 'play',
      type: 'confirm',
      message: 'Ready to play?'
    }]).then(function(answer) {
      if (answer.play) {
        that.newGame()
        that.renderBoard()
        that.keepPromptingUser()
      } else {
        console.log('Maybe next time!')
      }
    })
  }
  renderBoard() {
    let boardString = '_| A B C D E F G H I J\n'
    for (let i=0; i<this.board.length; i++) {
      boardString += `${i}|`
      for (let j=0; j< this.board[0].length; j++) {
        boardString += ` ${this.board[i][j].display}`
      }
      boardString += '\n'
    }
    console.log(boardString)
  }
  keepPromptingUser() {
    const that = this
    inquirer.prompt([{
      name: 'chosenSpace',
      type: 'input',
      message: 'Choose a coordinate (A-J, 0-9):'
    }]).then(function(ans) {
      const [coord1, coord2] = (ans.chosenSpace).toUpperCase()
      .split('')
      .map(character => (that.lookup[character] !== undefined ? that.lookup[character] : parseInt(character, 10)))
      const space = that.board[coord2][coord1]
      if (space.mine) {
        console.log('You lose!')
      } else {
        space.clicked = true
        space.display = '0'
        that.renderBoard()
        that.keepPromptingUser()
      }
    })
  }
  leftClick() {

  }
  checkNeighbors(coords) {

  }

}

const game = new MineSweeper()
game.startGame()
