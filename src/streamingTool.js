import { getStreamingLinks } from './streamingService.js';
import 'dotenv/config';

const movies = process.argv[2].split('=')[1].split(',');

Promise.all(movies.map(movie => getStreamingLinks(movie)))
  .then(results => console.log(JSON.stringify(results, null, 2)))
  .catch(error => console.error(`Error fetching streaming links: ${error.message}`));
