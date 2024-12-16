package main

import (
	"fmt"
	"log"
	"os"
	"otto8-tmdb-tool/pkg/tmdb"
)

var client tmdb.TMDbClient

func main() {
	// Set up TMDb client
	apiKey := os.Getenv("TMDB_API_KEY")
	if apiKey == "" {
		log.Fatal("TMDB_API_KEY environment variable is not set")
	}
	client = tmdb.TMDbClient{APIKey: apiKey}

	// Check command and invoke appropriate handler
	if len(os.Args) < 2 {
		log.Fatal("Usage: gptscript-go-tool <command> [params]")
	}

	cmd := os.Args[1]
	var err error
	var res string

	switch cmd {
	case "search":
		// Get the query parameter from the environment or command line
		query := os.Getenv("QUERY")
		if query == "" {
			log.Fatal("QUERY parameter is required")
		}

		// Perform the search using TMDb client
		movies, err := client.SearchMovies(query)
		if err != nil {
			log.Fatal("Error searching movies: ", err)
		}

		// Handle successful response
		res = fmt.Sprintf("Found %d movie(s) matching '%s':\n", len(movies), query)
		for _, movie := range movies {
			res += fmt.Sprintf("%s (%s) - Popularity: %.2f\n", movie.Title, movie.ReleaseDate, movie.Popularity)
		}

	default:
		err = fmt.Errorf("Unsupported command: %s", cmd)
	}

	// Output the result or error
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	if res != "" {
		fmt.Println(res)
	}
}
