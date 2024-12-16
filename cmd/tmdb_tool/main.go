package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"otto8-tmdb-tool/pkg/tmdb"
)

// TMDbClient is a global variable for reuse
var client tmdb.TMDbClient

func main() {
	// Set up TMDb client
	apiKey := os.Getenv("TMDB_API_KEY")
	if apiKey == "" {
		log.Fatal("TMDB_API_KEY environment variable is not set")
	}
	client = tmdb.TMDbClient{APIKey: apiKey}

	// Define HTTP routes
	http.HandleFunc("/search", handleSearch)

	// Start the HTTP server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	fmt.Printf("Server is running on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// handleSearch processes /search requests
func handleSearch(w http.ResponseWriter, r *http.Request) {
	// Parse query parameter
	query := r.URL.Query().Get("query")
	if query == "" {
		http.Error(w, "query parameter is required", http.StatusBadRequest)
		return
	}

	// Search for movies
	movies, err := client.SearchMovies(query)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error searching movies: %v", err), http.StatusInternalServerError)
		return
	}

	// Respond with JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
}
