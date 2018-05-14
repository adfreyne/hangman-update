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
      guesses: []
    }
  }

  render() {
    const { progress, word, guesses } = this.state

    if (this.state.word === renderWord(word, guesses)) {
      return (<div className='win'>You won!</div>)
    }
    if (this.state.progress > 5) {
      return (<div>The correct word was {word}</div>)
    }

    const renderInputButton = (letter) => {
      return <button id={letter} onClick={() => {

        this.setState({ guesses: [letter, ...guesses] });

        if (word.indexOf(letter) < 0) {
          this.setState({ progress: progress + 1 })
        }
      }}>
        {letter}
      </button>
    }
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    return (
      <div tabIndex='main' >
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
        <div>
          <p className='word'>
            {'Your word: ' + renderWord(word, guesses)}
          </p>
        </div>
        <div>
          {letters.map(renderInputButton)}
        </div>
        <button onClick={() => this.setState({ progress: progress + 1 })}>
          Hang The Man !
        </button>
        <div>
        </div>
      </div >)

  }
}
export default App;