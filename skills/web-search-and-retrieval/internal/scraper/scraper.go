// Copyright 2026 Anders Breindahl. All rights reserved.
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package scraper

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"strings"
	"time"

	htmltomarkdown "github.com/JohannesKaufmann/html-to-markdown/v2"
	"github.com/go-shiori/go-readability"
	"golang.org/x/net/html"
)

const (
	defaultUserAgent = "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0"
	defaultTimeout   = 30 * time.Second
)

type Scraper struct {
	client    *http.Client
	userAgent string
	logger    *slog.Logger
}

func NewScraper(userAgent string, logger *slog.Logger) *Scraper {
	if userAgent == "" {
		userAgent = defaultUserAgent
	}

	if logger == nil {
		logger = slog.New(slog.NewTextHandler(io.Discard, nil))
	}

	return &Scraper{
		client: &http.Client{
			Timeout: defaultTimeout,
		},
		userAgent: userAgent,
		logger:    logger,
	}
}

func (s *Scraper) Fetch(ctx context.Context, urlStr string) (string, error) {
	htmlContent, err := s.FetchHTML(ctx, urlStr)
	if err != nil {
		return "", err
	}

	return convertToMarkdown(htmlContent, urlStr)
}

func (s *Scraper) FetchHTML(ctx context.Context, urlStr string) (string, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, urlStr, nil)
	if err != nil {
		return "", fmt.Errorf("creating request: %w", err)
	}

	req.Header.Set("User-Agent", s.userAgent)
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
	req.Header.Set("Accept-Language", "en-US,en;q=0.5")

	if s.logger.Enabled(ctx, slog.LevelDebug) {
		s.logger.Debug("HTTP request", "method", req.Method, "url", urlStr)
		for name, values := range req.Header {
			for _, value := range values {
				s.logger.Debug("  header", "name", name, "value", value)
			}
		}
	}

	resp, err := s.client.Do(req)
	if err != nil {
		return "", fmt.Errorf("fetching URL: %w", err)
	}
	defer resp.Body.Close()

	if s.logger.Enabled(ctx, slog.LevelDebug) {
		s.logger.Debug("HTTP response", "status", resp.Status, "url", urlStr)
		for name, values := range resp.Header {
			for _, value := range values {
				s.logger.Debug("  header", "name", name, "value", value)
			}
		}
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	contentType := resp.Header.Get("Content-Type")
	if !isHTMLContentType(contentType) {
		return "", fmt.Errorf("unsupported content type: %s", contentType)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("reading response body: %w", err)
	}

	return string(body), nil
}

func isHTMLContentType(contentType string) bool {
	contentType = strings.ToLower(contentType)
	return strings.Contains(contentType, "text/html") ||
		strings.Contains(contentType, "application/xhtml+xml")
}

func convertToMarkdown(htmlContent string, baseURL string) (string, error) {
	if strings.TrimSpace(htmlContent) == "" {
		return "", nil
	}

	parsedURL, err := url.Parse(baseURL)
	if err != nil {
		parsedURL = nil
	}

	article, err := readability.FromReader(strings.NewReader(htmlContent), parsedURL)
	if err == nil && article.Content != "" {
		doc, err := html.Parse(strings.NewReader(article.Content))
		if err != nil {
			return "", fmt.Errorf("parsing readability content: %w", err)
		}

		markdown, err := htmltomarkdown.ConvertNode(doc)
		if err != nil {
			return "", fmt.Errorf("converting to markdown: %w", err)
		}

		return strings.TrimSpace(string(markdown)), nil
	}

	doc, err := html.Parse(strings.NewReader(htmlContent))
	if err != nil {
		return "", fmt.Errorf("parsing HTML: %w", err)
	}

	markdown, err := htmltomarkdown.ConvertNode(doc)
	if err != nil {
		return "", fmt.Errorf("converting to markdown: %w", err)
	}

	return strings.TrimSpace(string(markdown)), nil
}
