import axios from 'axios';

export async function getTopRatedMovies(query) {
  try {
    const movies = await fetchMoviesFromTMDb(query);
    const topRatedMovies = filterMoviesByRating(movies);
    
    return {
      query,
      topMovies: topRatedMovies.slice(0, 10), // Return only the top 10 movies
    };
  } catch (error) {
    throw new Error(`Error fetching movie recommendations: ${error.message}`);
  }
}

async function fetchMoviesFromTMDb(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  return response.data.results || [];
}

function filterMoviesByRating(movies) {
  return movies
    .filter(movie => movie.vote_average > 0) // Exclude movies without a rating
    .sort((a, b) => b.vote_average - a.vote_average); // Sort by descending rating
}
