import { planMovie } from './planner.js';
import 'dotenv/config'

if (process.argv.length !== 3) {
  console.error('Usage: node tools.js <command>');
  process.exit(1);
}

const cmd = process.argv[2];

try {
  switch (cmd) {
    case 'plan-movie':
      const searchKey = process.env.SEARCH_KEY || 'Action';  // Default to "Action" if not provided
      const duration = process.env.DURATION || 120;
      console.log(await planMovie(searchKey, duration));  // Use async/await to handle the promise
      break;

    default:
      console.log(`Unknown command: ${cmd}`);
      process.exit(1);
  }
} catch (error) {
  console.log(`Error: ${error.message}`);
  process.exit(1);
}