import React, { Component } from 'react';
import LanguageService from '../../services/language-service';
import './LearningRoute.css'

class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: { name: '' },
      words: [],
      wordData: {
        word_id: null,
        nextWord: '',
        totalScore: 0,
        wordCorrectCount: 0,
        wordIncorrectCount: 0
      }
    };
  }

  componentDidMount() {
    // LanguageService.getLanguages().then(res =>
    //   this.setState({ language: res.language, words: res.words })
    // );
    LanguageService.getWordData().then(res => {
      const { word_id, nextWord, totalScore, wordCorrectCount, wordIncorrectCount } = res;
      this.setState({
        wordData: {
          word_id,
          nextWord,
          totalScore,
          wordCorrectCount,
          wordIncorrectCount
        }
      });
    });
  }

  render() {
    return (
      <section>
        <h2>
          Translate the word:
        </h2>
        <div className='page-header'></div>
        <span>
          {this.state.wordData.nextWord}
        </span>
        <p>Your total score is: {this.state.wordData.totalScore}</p>
        <div className='total-score'></div>

        <main>
          <form className='answer-form'>
            <label id='learn-guess-label' htmlFor='learn-guess-input'>
              What's the translation for this word?
            </label>
            <input id='learn-guess-input' type='text' required />
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
      </section>
    );
  }
}


export default LearningRoute;
