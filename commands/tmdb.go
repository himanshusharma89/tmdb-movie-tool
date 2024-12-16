package commands

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func TMDB(query, contentType, language, apiKey string) (string, error) {
	if query == "" {
		return "", fmt.Errorf("A non-empty query must be provided")
	}

	if contentType == "" {
		contentType = "movie"
	}

	if language == "" {
		language = "en-US"
	}

	url := fmt.Sprintf("https://api.themoviedb.org/3/search/%s?query=%s&language=%s&api_key=%s", contentType, query, language, apiKey)

	resp, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("Error making request to TMDB: %v", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("Error reading response: %v", err)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		return "", fmt.Errorf("Error unmarshaling response: %v", err)
	}

	return fmt.Sprintf("Results: %v", result), nil
}
