import axios from 'axios';

export async function getStreamingLinks(movieTitle) {
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${movieTitle}&country=us&type=movie`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
      },
    });
    return response.data.result.map(service => ({
      platform: service.provider,
      link: service.link,
    }));
  } catch (error) {
    console.error('Error fetching streaming links:', error.message);
    return [];
  }
}
