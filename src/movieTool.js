import { getTopRatedMovies } from './movieService.js';
import 'dotenv/config';

if (process.argv.length < 4) {
  console.error('Usage: node movieTool.js recommend-movie <query> <region>');
  process.exit(1);
}

const [cmd, query, region = 'us'] = process.argv.slice(2);

try {
  switch (cmd) {
    case 'recommend-movie':
      const movies = await getTopRatedMovies(query, region);
      console.log(JSON.stringify(movies));
      break;

    default:
      console.error(`Unknown command: ${cmd}`);
      process.exit(1);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}