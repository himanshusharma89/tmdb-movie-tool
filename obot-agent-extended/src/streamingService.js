import axios from 'axios';

export async function getStreamingLinks(movieId, region) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    });
    const providers = response.data.results[region.toUpperCase()]?.buy || [];
    const links = providers.map((provider) => provider.provider_name).join(', ');

    return { movieId, links: links || 'No streaming providers available.' };
  } catch (error) {
    console.error(`Error fetching streaming links for movie ID ${movieId}: ${error.message}`);
    return { movieId, links: 'Error fetching streaming links.' };
  }
}
