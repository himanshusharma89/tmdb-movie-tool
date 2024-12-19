# TMDb Movie Recommendation Tool

A **Node.js-based movie recommendation tool** that uses **GPTScript** and the **TMDb API** to recommend the top-rated movies based on a search query. This tool is designed to be integrated into platforms like **Otto8**, enabling AI agents to provide automated movie suggestions.

---

## Features

- Fetches movies from **TMDb** based on a search query (e.g., genre, keyword, or actor).
- Returns the **top 10 highly-rated movies** as a response.
- Implements **GPTScript** for easy agent integration.
- Built with **Node.js** for flexibility and scalability.

---

## Project Structure

```yaml
tmdb-movie-tool
├── src
│   ├── movieTool.js       # Main tool file to process agent input
│   ├── movieService.js    # Service file for TMDb API interactions
├── .env                   # Environment variables (TMDb API key)
├── package.json           # Dependencies and scripts
├── tool.gpt               # GPTScript definition
```

---

## Prerequisites

Before you begin, make sure you have the following:

1. **Node.js** installed on your system ([Download Node.js](https://nodejs.org)).
2. A **TMDb API Key**: Sign up at [TMDb](https://www.themoviedb.org/) to generate an API key.
3. **GPTScript** installed: Follow the [installation guide](https://docs.gptscript.ai/).
4. **OpenAI API Key**: Required for GPTScript-powered features.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tmdb-movie-tool.git
   cd tmdb-movie-tool
   ```
2. Install project dependencies:

    ```bash
    npm install
    ```
3. Create a `.env` file in the project root and add your `TMDb API` Key:

    ```bash
    TMDB_API_KEY=your_tmdb_api_key
    ```

---

## Usage

1. Validate the Tool locally using the GPTScript CLI:
    ```bash
    QUERY='Action' gptscript tool.gpt
    ```

    Expected output(JSON):
    ```json
    {
    "query": "Comedy",
    "topMovies": [
        {
        "adult": false,
        "backdrop_path": "/npoUm3stzUM2lR46ClLDwBZDaeZ.jpg",
        "genre_ids": [
            18,
            35
        ],
        "id": 262,
        "original_language": "en",
        "original_title": "The King of Comedy",
        "overview": "Aspiring comic Rupert Pupkin attempts to achieve success in show business by stalking his idol, a late night talk-show host who craves his own privacy.",
        "popularity": 34.538,
        "poster_path": "/3BM78deUfeZfShqPTblZuamgC8a.jpg",
        "release_date": "1982-12-18",
        "title": "The King of Comedy",
        "video": false,
        "vote_average": 7.8,
        "vote_count": 2287
        },
        {
        "adult": false,
        "backdrop_path": "/twqghSexhGFScDUsnBnXChSwoXw.jpg",
        "genre_ids": [
            18
        ],
        "id": 1212560,
        "original_language": "ja",
        "original_title": "笑いのカイブツ",
        "overview": "Tsuchiya, who lives with his single mother in Osaka, does not get serious work once he graduates from high school, but rather devotes himself to mailing jokes to the "Ohgiri" variety show. Seeking to be recognized as a show "Legend," he devotes his entire life to laughter, setting himself the task of submitting hundreds of entries per day. At loose ends, he encounters a drifter, Pink, who finds him work at his bar while Tsuchiya now devotes himself to becoming a "postcard craftsman" who submits material to a radio program. The entertainers on the program begin to use material from his postcards. A comedian Tsuchiya admires, one of a comic duo called "Bacon," says on the air that he admires Tsuchiya's material and that he wants "to do material together." Dreaming of another chance, Tsuchiya heads for Tokyo.",
        "popularity": 5.578,
        "poster_path": "/7d9vVMfob5llYxhwadS7OvFfIzq.jpg",
        "release_date": "2024-01-05",
        "title": "The Beast of Comedy",
        "video": false,
        "vote_average": 7.5,
        "vote_count": 2
        },
        …
    ]
    }
    ```
2.  Run the Tool Directly (Alternate):
    ```bash
    QUERY='Horro' npm run tool recommend-movie
    ```
3. Explanation of Commands
    - `QUERY`: Specify the movie search term (e.g., "Comedy", "Action", "Sci-Fi")
    - `recommend-movie`: Executes the logic to fetch and filter movies from TMDb

---

## Defining the Tool with GPTScript
The tool.gpt file describes the tool's functionality, parameters, and execution steps.

```yaml
Name: MovieRecommender
Description: Recommend top-rated movies based on any search query.
Param: query: The search term or keyword for movie recommendations (e.g., "Action", "Comedy", "Sci-Fi").

#!/usr/bin/env npm --silent --prefix ${GPTSCRIPT_TOOL_DIR} run tool -- recommend-movie

---
!metadata:*:category
Entertainment

---
!metadata:*:icon
https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2/assets/duotone/film-slate-duotone.svg

```

---

## Explore Further

- Learn More About GPTScript: [GPTScript Documentation](https://docs.gptscript.ai/)
- Visit Acorn’s Blog: [Acorn Blog](https://www.acorn.io/resources/blog/)
- Join the Community: Share your tools on [Discord](https://discord.com/invite/9sSf4UyAMC) or [GitHub forums](https://github.com/gptscript-ai/gptscript)!