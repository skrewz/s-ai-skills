# Go — spec-driven project
# Makefile-driven: build/test/lint/clean are the standard targets. CI, if
# present, calls these same targets. Delete the `e2e` target if no e2e
# mechanism is called for; otherwise set it to your runner (e.g. Playwright via
# playwright-go, run against the built server).
.PHONY: all build test lint clean e2e image image-run image-clean

all: build test

build:
	go build ./...

test:
	go test ./...

lint:
	gofumpt -l -extra .
	go vet ./...

clean:
	go clean

# e2e — delete if no e2e mechanism is called for.
e2e:
	go test -tags e2e ./e2e/...

# --- container (build the payload application image) ------------------------
# Delete these (and the Containerfile) if a container is not required.
IMAGE ?= app

image:
	podman build -t $(IMAGE) .

image-run:
	podman run --rm -it $(IMAGE)

image-clean:
	podman rmi -f $(IMAGE) || true
