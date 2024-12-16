run:
	go run cmd/tmdb_tool/main.go

test:
	go test ./...

build:
	go build -o bin/tmdb_tool cmd/tmdb_tool/main.go
