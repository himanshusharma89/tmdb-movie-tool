import { getTrendingNews } from './newsService.js';
import 'dotenv/config';

const region = process.argv[2].split('=')[1];

getTrendingNews(region)
  .then(news => console.log(JSON.stringify(news, null, 2)))
  .catch(error => console.error(`Error fetching news: ${error.message}`));
