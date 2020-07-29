import React, { Component } from 'react';
import LanguageService from '../../services/language-service';

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
        <span>
          {this.state.wordData.nextWord}
        </span>
        <p>Your total score is: {this.state.wordData.totalScore}</p>
        <main>
          <form>
            <label htmlFor='learn-guess-input'>
              What's the translation for this word?
            </label>
            <input id='learn-guess-input' type='text' required />
            <button type='submit'>
              Submit your answer
            </button>
          </form>
          <section className='countBox'>
            <p>You have answered this word correctly {this.state.wordData.wordCorrectCount} times.</p>
            <p>You have answered this word incorrectly {this.state.wordData.wordIncorrectCount} times.</p>
          </section>
        </main>
      </section>
    );
  }
}


export default LearningRoute;
