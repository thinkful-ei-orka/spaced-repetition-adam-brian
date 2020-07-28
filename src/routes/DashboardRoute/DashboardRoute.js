import React, { Component } from 'react';
import LanguageService from '../../services/language-service';
import './DashboardRoute.css'

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: { name: '' },
      words: []
    };
  }

  componentDidMount() {
    LanguageService.getLanguages().then(res => {
      this.setState({ language: res.language, words: res.words });
    });
  }

  render() {
    return (
      <section className='dashboard-body'>
        <h2>{this.state.language.name}</h2>
        <div className='under-headers'></div>
        <p>{`Total correct answers: ${this.state.language.total_score}`}</p>


        <a className='practice-link' href='/learn'>Start practicing</a>

        <h3 className='words-practice'>Words to practice</h3>
        <div className='under-headers'></div>
        <div className='spacer'></div> 
        {
          this.state.words.map((word, i) =>
            <li className='detail-box' key={`word ${i}`}>
              <h4 className='word'>
                {word.original}
              </h4>
              <div className='under-word'></div>
              <p className='answer-count'>{`correct answer count: ${word.correct_count}`}</p>
              <p className='answer-count'>{`incorrect answer count: ${word.incorrect_count}`}</p>
            </li>
          )
        }

      </section>
    );
  }
}

export default DashboardRoute;
