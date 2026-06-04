.PHONY: build test clean

build:
	go build -buildvcs=false -o webtool ./cmd/webtool

test:
	go test ./...

clean:
	rm -f webtool
