package tmdb

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

// TMDbClient represents the TMDb API client
type TMDbClient struct {
	APIKey string
}

// Movie represents a movie object from TMDb
type Movie struct {
	Title       string  `json:"title"`
	Overview    string  `json:"overview"`
	ReleaseDate string  `json:"release_date"`
	Popularity  float64 `json:"popularity"`
}

// SearchMovies searches for movies by query
func (c *TMDbClient) SearchMovies(query string) ([]Movie, error) {
	endpoint := "https://api.themoviedb.org/3/search/movie"
	params := url.Values{}
	params.Add("api_key", c.APIKey)
	params.Add("query", query)

	// Create the request with a context (optional, useful for cancellation)
	response, err := http.Get(fmt.Sprintf("%s?%s", endpoint, params.Encode()))
	if err != nil {
		return nil, fmt.Errorf("error fetching data: %v", err)
	}
	defer response.Body.Close()

	// Read and process the response
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response: %v", err)
	}

	// Parse the response JSON
	var result struct {
		Results []Movie `json:"results"`
	}
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("error parsing JSON: %v", err)
	}

	// Return the results
	return result.Results, nil
}
