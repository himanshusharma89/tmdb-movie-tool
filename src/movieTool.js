import { getTopRatedMovies } from './movieService.js';
import { getSnackRecommendations } from './snackService.js';
import { getTrendingNews } from './newsService.js';
import { getStreamingLinks } from './streamingService.js';
import 'dotenv/config'; // For reading .env variables

async function fetchRecommendations(query, region) {
  try {
    const [movies, snacks, news] = await Promise.all([
      getTopRatedMovies(query),
      getSnackRecommendations(query),
      getTrendingNews(region),
    ]);

    for (const movie of movies.topMovies.slice(0, 3)) {
      const streamingLinks = await getStreamingLinks(movie.title);
      movie.streamingLinks = streamingLinks;
    }

    return { movies, snacks, news };
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
  }
}

if (process.argv.length !== 3) {
  console.error('Usage: node movieTool.js <command>');
  process.exit(1);
}

const cmd = process.argv[2];

try {
  switch (cmd) {
    case 'recommend-movie':
      const query = process.env.QUERY || 'Popular'; // Default to "Popular" if no query is provided
      const region = process.env.REGION || 'us';
      const result = await fetchRecommendations(query, region);
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