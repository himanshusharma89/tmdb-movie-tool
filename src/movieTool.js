import { discoverMovies } from './movieService.js';
import 'dotenv/config'; // For reading .env variables

if (process.argv.length !== 3) {
  console.error('Usage: node movieTool.js <command>');
  process.exit(1);
}

const cmd = process.argv[2];

try {
  switch (cmd) {
    case 'recommend-movie':
      const genre = process.env.GENRE || ''; // Default to empty if not provided
      const region = process.env.REGION || 'US'; // Default to 'US'
      const language = process.env.LANGUAGE || 'en-US'; // Default to English (US)

      const result = await discoverMovies(region, language, genre);
      console.log(JSON.stringify(result)); // Log result for the agent
      break;

    default:
      console.error(`Unknown command: ${cmd}`);
      process.exit(1);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
