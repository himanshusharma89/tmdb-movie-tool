import { getSnackRecommendations } from './snackService.js';
import 'dotenv/config';

const genre = process.argv[2].split('=')[1];

getSnackRecommendations(genre)
  .then(snacks => console.log(JSON.stringify(snacks, null, 2)))
  .catch(error => console.error(`Error fetching snacks: ${error.message}`));
