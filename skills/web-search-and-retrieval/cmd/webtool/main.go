// Copyright 2026 Anders Breindahl. All rights reserved.
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"strings"

	"github.com/skrewz/web-search-mcp/internal/scraper"
	"github.com/skrewz/web-search-mcp/internal/search"
)

func main() {
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}

	var level slog.Level
	if os.Getenv("DEBUG") != "" {
		level = slog.LevelDebug
	} else {
		level = slog.LevelInfo
	}

	logger := slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
		Level: level,
	}))

	cmd := os.Args[1]
	args := os.Args[2:]

	switch cmd {
	case "search":
		if len(args) < 1 {
			logger.Error("search requires a query argument")
			printUsage()
			os.Exit(1)
		}
		if err := runSearch(args, logger); err != nil {
			logger.Error("search failed", "error", err)
			os.Exit(1)
		}
	case "get_url":
		if len(args) < 1 {
			logger.Error("get_url requires a URL argument")
			printUsage()
			os.Exit(1)
		}
		if err := runGetURL(args, logger); err != nil {
			logger.Error("get_url failed", "error", err)
			os.Exit(1)
		}
	default:
		logger.Error("unknown command", "command", cmd)
		printUsage()
		os.Exit(1)
	}
}

func runSearch(args []string, logger *slog.Logger) error {
	query := strings.Join(args, " ")
	searcher := search.NewSearcher(nil, logger)
	results, err := searcher.Search(context.Background(), query)
	if err != nil {
		return fmt.Errorf("search failed: %w", err)
	}
	fmt.Println(search.FormatResultsMarkdown(results))
	return nil
}

func runGetURL(args []string, logger *slog.Logger) error {
	urlStr := strings.Join(args, " ")
	s := scraper.NewScraper("", logger)
	markdown, err := s.Fetch(context.Background(), urlStr)
	if err != nil {
		return fmt.Errorf("fetch failed: %w", err)
	}
	fmt.Println(markdown)
	return nil
}

func printUsage() {
	fmt.Fprintf(os.Stderr, `Usage: %s <command> [args...]

Commands:
  search <query>        Web search
  get_url <url>         Fetch a URL and convert to markdown

Environment:
  DEBUG                 Enable debug logging (any non-empty value)
`, os.Args[0])
}
