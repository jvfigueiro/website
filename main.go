package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	staticDir := "./html"

	fileServer := http.FileServer(http.Dir(staticDir))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Clean and sanitize the requested path
		cleanedPath := filepath.Clean(r.URL.Path)
		targetPath := filepath.Join(staticDir, cleanedPath)

		// Prevent path traversal outside static directory
		rel, err := filepath.Rel(staticDir, targetPath)
		if err != nil || strings.HasPrefix(rel, "..") {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		}

		// Security headers
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "SAMEORIGIN")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")

		// Cache control headers based on file extension
		ext := strings.ToLower(filepath.Ext(targetPath))
		switch ext {
		case ".css", ".js", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".ico", ".svg", ".woff", ".woff2":
			w.Header().Set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400")
		case ".html":
			w.Header().Set("Cache-Control", "public, max-age=0, must-revalidate")
		}

		info, err := os.Stat(targetPath)

		// Clean URL support: allow visiting routes without .html extension (e.g. /projetos -> /projetos.html)
		if os.IsNotExist(err) && ext == "" {
			htmlPath := targetPath + ".html"
			if htmlInfo, htmlErr := os.Stat(htmlPath); htmlErr == nil && !htmlInfo.IsDir() {
				w.Header().Set("Cache-Control", "public, max-age=0, must-revalidate")
				http.ServeFile(w, r, htmlPath)
				return
			}
		}

		// Handle 404 or directory without index.html
		if os.IsNotExist(err) || (info != nil && info.IsDir() && hasNoIndex(targetPath)) {
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			w.WriteHeader(http.StatusNotFound)
			if notFoundContent, readErr := os.ReadFile(filepath.Join(staticDir, "404.html")); readErr == nil {
				w.Write(notFoundContent)
			}
			return
		}

		fileServer.ServeHTTP(w, r)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("GoServer running on port %s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("Server start error: ", err)
	}
}

// hasNoIndex checks whether a directory lacks an index.html file
func hasNoIndex(dirPath string) bool {
	indexPath := filepath.Join(dirPath, "index.html")
	_, err := os.Stat(indexPath)
	return os.IsNotExist(err)
}