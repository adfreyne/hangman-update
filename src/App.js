import React, { PureComponent } from 'react';
import Hangman from './Hangman';
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
    this.state = {
      progress: 0,
      word: randomWord(),
      guesses: [],
      message: ''
    }
  }

  render() {
    const { progress, word, guesses, message } = this.state

    if (this.state.word === renderWord(word, guesses)) {
      return (<div className='win'>You won!</div>)
    }

    if (this.state.progress > 5) {
      this.setState({ message: 'The correct word was :' + word })
    }

    const renderInputButton = (letter) => {
      return <button
        id={letter}
        onClick={() => {
          this.setState({ guesses: [letter, ...guesses] });
          if (word.indexOf(letter) < 0) {
            this.setState({ progress: progress + 1 });
          }
        }}>
        {letter}
      </button>
    }
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
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
          {'guesses: ' + this.state.guesses}
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
          message: ''
        })
        }>
          New game
          </button>
        <div>
        </div>
      </div >)

  }
}
export default App;