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
};

export default LanguageService;