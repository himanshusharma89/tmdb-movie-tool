package tmdb

import (
	"testing"
)

func TestSearchMovies(t *testing.T) {
	client := TMDbClient{APIKey: "fake_api_key"}
	_, err := client.SearchMovies("test")
	if err == nil {
		t.Error("Expected error with invalid API key, got nil")
	}
}
