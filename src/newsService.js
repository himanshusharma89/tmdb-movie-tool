import axios from 'axios';

export async function getTrendingNews(region) {
  const url = `https://newsapi.org/v2/top-headlines?category=entertainment&country=${region}&apiKey=${process.env.NEWS_API_KEY}`;
  
  try {
    const response = await axios.get(url);
    return response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
    }));
  } catch (error) {
    console.error('Error fetching news trends:', error.message);
    return [];
  }
}
