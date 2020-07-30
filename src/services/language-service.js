import config from '../config';
import TokenService from './token-service';

const LanguageService = {
  getLanguages() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      }
    }).then(res => res.json())
      .catch(error => console.log(error));
  },

  getWordData() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      }
    }).then(res => res.json())
      .catch(error => console.log(error));
  },

  postGuess(guess) {
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({guess:guess})
    }).then(res => res.json())
      .catch(error => console.log(error));
  }
};

export default LanguageService;