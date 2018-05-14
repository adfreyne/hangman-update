import React, { PureComponent } from 'react';
import Hangman from './Hangman';
// eslint-disable-next-line
import { done, randomWord, renderWord } from './words';
import './style.css';


// This shows you how to use the functions in words.js:
/*
const word = randomWord()
const guesses = ['a', 'e', 'i', 'o', 'u', 't', 'n']
console.log(word, guesses, renderWord(word, guesses), done(word, guesses))
*/

class App extends PureComponent {
  constructor() {
    super()
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    this.state = {
      progress: 0,
      word: randomWord(),
      guesses: [],
      message: '',
      letters
    }
  }

  render() {
    // eslint-disable-next-line
    const { progress, word, guesses, message, letters } = this.state



    if (this.state.word === renderWord(word, guesses)) {
      this.setState({ message: 'Congratulations! You won!' })
    }

    if (this.state.progress > 5) {
      this.setState({ message: 'The correct word was :' + word })
    }

    const renderInputButton = (letter) => {
      return <button
        id={letter}
        key={letter}
        onClick={() => {
          this.setState({ guesses: [letter, ...guesses] });
          if (word.indexOf(letter) < 0) {
            this.setState({ progress: progress + 1 });
          }
          letters.splice(letter, 1)
        }}>
        {letter}
      </button>
    }

    return (
      <div className='main' >
        <div>
          {/* This is how we render the hanging man */}
          <Hangman progress={progress} />
        </div>
        {/* <div>
          {'word: ' + this.state.word}
        </div> */}
        <div>
          {'Your guesses: ' + this.state.guesses}
        </div >
        <div
          className='word'>
          {'Your word: ' + renderWord(word, guesses)}
        </div>
        <div className='message'>
          {this.state.message}
        </div>
        <div>
          {letters.map(renderInputButton)}
        </div>
        <button onClick={() => this.setState({ progress: progress + 1 })}>
          Hang The Man !
        </button>
        <button onClick={() => this.setState({
          progress: 0,
          word: randomWord(),
          guesses: [],
          message: '',
          letters
        })
        }>
          Start a new game
          </button>
        <div>
        </div>
      </div >)

  }
}
export default App;