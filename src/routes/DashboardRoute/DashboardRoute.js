import React, { Component } from 'react';
import LanguageService from '../../services/language-service';

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
      <section>
        <h2>{this.state.language.name}</h2>
        {`Total correct answers: ${this.state.language.total_score}`}


        <a href='/learn'>Start practicing</a>

        <h3>Words to practice</h3>
        {
          this.state.words.map((word, i) =>
            <li key={`word ${i}`}>
              <h4>
                {word.original}
              </h4>
              <p>{`correct answer count: ${word.correct_count}`}</p>
              <p>{`incorrect answer count: ${word.incorrect_count}`}</p>
            </li>
          )
        }

      </section>
    );
  }
}

export default DashboardRoute;
