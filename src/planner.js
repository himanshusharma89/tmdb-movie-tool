import axios from 'axios';

export async function planMovie(searchKey, duration) {
  try {
    const movieData = await fetchTopRatedMovies(searchKey);
    const topRatedMovies = filterMoviesByRating(movieData);

    // Optionally filter by duration if needed
    // const suitableMovies = filterMoviesByDuration(topRatedMovies, duration);

    return JSON.stringify({
      searchKey,
      duration,
      topRatedMovies: topRatedMovies,  // Return top 10 movies
    });
  } catch (error) {
    throw new Error(`Error planning movie night: ${error.message}`);
  }
}

// Fetch top-rated movies based on the search key (e.g., genre, keyword)
async function fetchTopRatedMovies(searchKey) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.YOUR_API_KEY}&query=${searchKey}`;
  const response = await axios.get(url);
  return response.data.results;
}

// Filter movies by rating (top-rated first)
function filterMoviesByRating(movies) {
  return movies
    .filter(movie => movie.vote_average > 0)  // Only include movies with a rating
    .sort((a, b) => b.vote_average - a.vote_average);  // Sort by descending rating
}

// Optionally, filter movies by duration (if a duration is provided)
function filterMoviesByDuration(movies, maxDuration) {
  return movies.filter(movie => movie.runtime <= maxDuration);
}