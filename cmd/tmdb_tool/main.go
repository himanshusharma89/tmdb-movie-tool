package main

import (
	"fmt"
	"log"
	"os"
	"otto8-tmdb-tool/pkg/tmdb"
)

func main() {
	apiKey := os.Getenv("TMDB_API_KEY")
	if apiKey == "" {
		log.Fatal("TMDB_API_KEY environment variable is not set")
	}

	client := tmdb.TMDbClient{APIKey: apiKey}
	query := "action"

	movies, err := client.SearchMovies(query)
	if err != nil {
		log.Fatalf("Error searching movies: %v", err)
	}

	fmt.Println("Top Movies:")
	for i, movie := range movies {
		if i >= 5 { // Display top 5 movies
			break
		}
		fmt.Printf("Title: %s\nOverview: %s\nRelease Date: %s\n\n",
			movie.Title, movie.Overview, movie.ReleaseDate)
	}
}
