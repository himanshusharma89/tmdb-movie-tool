import axios from 'axios';

export async function getTopRatedMovies(query, region) {
  try {
    const movies = await fetchMoviesFromTMDb(query, region);
    const topRatedMovies = filterMoviesByRating(movies);

    return {
      query,
      region,
      topMovies: topRatedMovies.slice(0, 10),
    };
  } catch (error) {
    throw new Error(`Error fetching movie recommendations: ${error.message}`);
  }
}

async function fetchMoviesFromTMDb(query, region) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
    query
  )}&region=${region}`;
  const response = await axios.get(url);
  return response.data.results || [];
}

function filterMoviesByRating(movies) {
  return movies
    .filter(movie => movie.vote_average > 0)
    .sort((a, b) => b.vote_average - a.vote_average);
}