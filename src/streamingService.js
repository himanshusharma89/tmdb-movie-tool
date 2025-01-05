import axios from 'axios';

export async function getStreamingLinks(movieTitle) {
  const url = `https://apis.justwatch.com/content/titles/${region}/popular?query=${encodeURIComponent(movieTitle)}`;
  const response = await axios.get(url);
  return response.data.items.map(item => ({
    title: item.title,
    streamingPlatforms: item.offers.map(offer => offer.provider_name),
  }));
}
