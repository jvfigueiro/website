package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func main() {
	staticDir := "./html"

	fileServer := http.FileServer(http.Dir(staticDir))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Clean and sanitize the requested path
		cleanedPath := filepath.Clean(r.URL.Path)
		targetPath := filepath.Join(staticDir, cleanedPath)

		// Development fallback for /api/v1/ endpoints (in production, NPMplus reverse proxy routes /api/ directly to site-status-api)
		if strings.HasPrefix(cleanedPath, "/api/v1/") {
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}

			if cleanedPath == "/api/v1/status" && r.Method == http.MethodGet {
				w.WriteHeader(http.StatusOK)
				w.Write([]byte(`{
  "global_status": "operational",
  "updated_at": "` + time.Now().UTC().Format(time.RFC3339) + `",
  "summary": {
    "nodes_online": 2,
    "nodes_total": 2,
    "services_online": 8,
    "services_total": 8,
    "availability_pct": 100
  },
  "infrastructure": [
    { "name": "Proxmox Node 1", "status": "online" },
    { "name": "Proxmox Node 2", "status": "online" },
    { "name": "Serviços públicos", "status": "operational" }
  ],
  "third_party": [
    { "name": "Cloudflare", "status": "operational", "url": "https://www.cloudflarestatus.com" },
    { "name": "GitHub", "status": "operational", "url": "https://www.githubstatus.com" },
    { "name": "Google Cloud", "status": "operational", "url": "https://status.cloud.google.com" },
    { "name": "Microsoft 365", "status": "operational", "url": "https://status.cloud.microsoft" },
    { "name": "AWS Health", "status": "operational", "url": "https://health.aws.amazon.com/health/status" },
    { "name": "Slack", "status": "operational", "url": "https://slack-status.com" }
  ]
}`))
				return
			}

			if cleanedPath == "/api/v1/check" && r.Method == http.MethodPost {
				type checkReq struct {
					URL string `json:"url"`
				}
				var req checkReq
				if err := json.NewDecoder(r.Body).Decode(&req); err != nil || strings.TrimSpace(req.URL) == "" {
					w.WriteHeader(http.StatusBadRequest)
					w.Write([]byte(`{"error": "URL inválida ou vazia"}`))
					return
				}
				cleanTarget := strings.TrimPrefix(req.URL, "https://")
				cleanTarget = strings.TrimPrefix(cleanTarget, "http://")
				cleanTarget = strings.TrimRight(cleanTarget, "/")

				w.WriteHeader(http.StatusOK)
				w.Write([]byte(`{
  "target": "` + cleanTarget + `",
  "reachable": true,
  "classification": "Online",
  "dns_resolved": true,
  "tcp_connected": true,
  "http_status": 200,
  "tls_valid": true,
  "tls_expiry": "2027-05-10",
  "latency_ms": 142,
  "error": ""
}`))
				return
			}

			http.NotFound(w, r)
			return
		}

		// Prevent path traversal outside static directory
		rel, err := filepath.Rel(staticDir, targetPath)
		if err != nil || strings.HasPrefix(rel, "..") {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		}

		// Redirect trailing slashes (except root "/")
		if r.URL.Path != "/" && strings.HasSuffix(r.URL.Path, "/") {
			http.Redirect(w, r, strings.TrimRight(r.URL.Path, "/"), http.StatusMovedPermanently)
			return
		}

		// Redirect legacy routes and aliases
		switch cleanedPath {
		case "/contato", "/contato.html":
			http.Redirect(w, r, "/", http.StatusMovedPermanently)
			return
		case "/projetos", "/projetos.html":
			http.Redirect(w, r, "/projects", http.StatusMovedPermanently)
			return
		case "/firmware-navpro", "/firmware-navpro.html", "/headunitmod":
			http.Redirect(w, r, "/projects/headunitmod", http.StatusMovedPermanently)
			return
		case "/lds-cisconetwork", "/lds-cisconetwork.html", "/caselds":
			http.Redirect(w, r, "/projects/caselds", http.StatusMovedPermanently)
			return
		case "/swap-ecu", "/swap-ecu.html", "/ecuswap":
			http.Redirect(w, r, "/projects/ecuswap", http.StatusMovedPermanently)
			return
		case "/garagex5":
			http.Redirect(w, r, "/projects/garagex5", http.StatusMovedPermanently)
			return
		case "/sat":
			http.Redirect(w, r, "/projects/sat", http.StatusMovedPermanently)
			return
		case "/sobre", "/sobre.html":
			http.Redirect(w, r, "/aboutme", http.StatusMovedPermanently)
			return
		case "/optiassist", "/optiassist.html":
			http.Redirect(w, r, "/projects/optiassist", http.StatusMovedPermanently)
			return
		case "/optimanager", "/optimanager.html":
			http.Redirect(w, r, "/projects/optimanager", http.StatusMovedPermanently)
			return
		case "/servicos", "/servicos.html":
			http.Redirect(w, r, "/services", http.StatusMovedPermanently)
			return
		case "/index", "/index.html":
			http.Redirect(w, r, "/", http.StatusMovedPermanently)
			return
		}

		ext := strings.ToLower(filepath.Ext(targetPath))

		// Redirect any .html URL to clean extensionless URL (e.g. /projects.html -> /projects)
		if ext == ".html" {
			trimmed := strings.TrimSuffix(cleanedPath, ".html")
			if trimmed == "/index" {
				trimmed = "/"
			}
			http.Redirect(w, r, trimmed, http.StatusMovedPermanently)
			return
		}

		// Security headers
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "SAMEORIGIN")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")

		// Cache control headers based on file extension
		switch ext {
		case ".css", ".js", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".ico", ".svg", ".woff", ".woff2", ".pdf":
			w.Header().Set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400")
		case "":
			w.Header().Set("Cache-Control", "public, max-age=0, must-revalidate")
		}

		// Clean URL support: serve .html file for extensionless paths (e.g. /projects -> html/projects.html, /projects/ecuswap -> html/projects/ecuswap.html)
		if ext == "" {
			htmlPath := targetPath + ".html"
			if htmlInfo, htmlErr := os.Stat(htmlPath); htmlErr == nil && !htmlInfo.IsDir() {
				w.Header().Set("Content-Type", "text/html; charset=utf-8")
				w.Header().Set("Cache-Control", "public, max-age=0, must-revalidate")
				http.ServeFile(w, r, htmlPath)
				return
			}
		}

		info, err := os.Stat(targetPath)

		// Handle 404 or directory without index.html
		if os.IsNotExist(err) || (info != nil && info.IsDir() && hasNoIndex(targetPath)) {
			// For missing static assets (images, stylesheets, scripts, fonts), return clean 404 without HTML body
			if ext != "" && ext != ".html" {
				http.NotFound(w, r)
				return
			}

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
