import { getTopRatedMovies } from './movieService.js';
import 'dotenv/config'; // For reading .env variables

if (process.argv.length !== 3) {
  console.error('Usage: node movieTool.js <command>');
  process.exit(1);
}

const cmd = process.argv[2];

try {
  switch (cmd) {
    case 'recommend-movie':
      const query = process.env.QUERY || 'Popular'; // Default to "Popular" if no query is provided
      const result = await getTopRatedMovies(query);
      console.log(JSON.stringify(result)); // Log result for agent
      break;

    default:
      console.error(`Unknown command: ${cmd}`);
      process.exit(1);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}