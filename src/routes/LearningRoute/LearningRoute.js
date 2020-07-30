import React, { Component, Fragment } from 'react';
import LanguageService from '../../services/language-service';
import './LearningRoute.css';

class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: { name: '', total_score: 0 },
      words: [],
      wordData: {
        word_id: null,
        nextWord: '',
        totalScore: 0,
        wordCorrectCount: 0,
        wordIncorrectCount: 0
      },
      guess: '',
      toggle: false,
      nextWord: {}
    };
  }

  componentDidMount() {
    this.getWord();
  }

  toggleToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  changeGuess = (e) => {
    this.setState({ guess: e.target.value });
  };

  sendGuess = (e, guess = this.state.guess) => {
    e.preventDefault();
    LanguageService.postGuess(guess).then(nextWord =>
      this.setState({ nextWord: nextWord }));
    this.toggleToggle();
  };

  getWord = () => {
    LanguageService.getWordData().then(res => {
      const { word_id, nextWord, totalScore, wordCorrectCount, wordIncorrectCount } = res;
      this.setState({
        guess: '',
        toggle: false,
        wordData: {
          word_id,
          nextWord,
          totalScore,
          wordCorrectCount,
          wordIncorrectCount
        }
      });
    });
  };

  buttonClick = () => {
    this.toggleToggle();
    this.setState({ guess: '', wordData: this.state.nextWord });
  };


  render() {
    return (
      <section>
        {this.state.toggle ? null :
          <h2>
            Translate the word:
          </h2>
        }
        <span>
          {this.state.wordData.nextWord}
        </span>
        <div className='page-header'></div>
        <div className='total-score'></div>
        {this.state.toggle ?
          <Fragment>
            <main className='DisplayScore'>
              <h2>
                {this.state.nextWord.isCorrect ? 'You were correct! :D' : 'Good try, but not quite right :('}
              </h2>
              <p>Your total score is: {this.state.nextWord.totalScore}</p>
            </main>
            <main className='DisplayFeedback'>
              <p>
                {`The correct translation for ${this.state.wordData.nextWord} was ${this.state.nextWord.answer} and you chose ${this.state.guess}!`}
              </p>
              <button className='nextWordButton' onClick={() => this.buttonClick()}>
                Try another word!
              </button>
            </main>
          </Fragment>
          :
          <main>
            <p>Your total score is: {this.state.nextWord.totalScore ? this.state.nextWord.totalScore : this.state.wordData.totalScore}</p>
            <form className='answer-form' onSubmit={(e) => this.sendGuess(e)}>
              <label id='learn-guess-label' htmlFor='learn-guess-input'>
                What's the translation for this word?
            </label>
              <input id='learn-guess-input' type='text' required value={this.state.guess} onChange={(e) => this.changeGuess(e)} />
              <button className='submit-button' type='submit'>
                Submit your answer
            </button>
            </form>
            <section className='countBox'>
              <p>You have answered this word correctly {this.state.wordData.wordCorrectCount} times.</p>
              <p>You have answered this word incorrectly {this.state.wordData.wordIncorrectCount} times.</p>
              <div className='page-header'></div>
            </section>
          </main>
        }
      </section>
    );
  }
}


export default LearningRoute;
