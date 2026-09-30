# jvfigueiro.com — Personal Website & Portfolio

Source code for my personal website, technical portfolio, IT consultancy page, and home lab documentation.

The site is designed for speed, simplicity, and reliability. The frontend is built with semantic HTML5, CSS3, Bootstrap 5, and vanilla JavaScript without heavy client-side frameworks. Under the hood, static assets and routing are handled by a custom lightweight HTTP server written in Go and deployed inside a minimal Alpine Linux Docker container.

## Content Overview

- **Home (`/`)**: Landing page with a terminal-style typewriter introduction, quick navigation links, and social/contact channels.
- **Projects (`/projects`)**: Curated portfolio of software, hardware, networking, and reverse engineering projects, accompanied by in-depth technical write-ups under `/projects/*`:
  - **GarageX5 (`/projects/garagex5`)**: Automotive electronics and OEM+ retrofit project on a 1998 Ford Escort Station Wagon.
  - **Head Unit Modding (`/projects/headunitmod`)**: Firmware analysis, reverse engineering, and branding customization on a Linux-based automotive head unit (Sunplus SPHE8368-U).
  - **Cisco Network Modernization (`/projects/caselds`)**: Field deployment of structured cabling (CAT6), rack organization, and cloud-managed Cisco Meraki infrastructure across 42 sites.
  - **Ford ECU Upgrade (`/projects/ecuswap`)**: EEC-IV to EEC-V ECU swap enabling real-time OBD2 engine telemetry and predictive automation in Home Assistant.
  - **Satellite Exploration (`/projects/sat`)**: Portable Ku-band Free-to-Air (FTA) geostationary satellite reception station.
- **Services (`/services`)**: Specialized IT consultancy and technical services covering network infrastructure, Proxmox virtualization, Docker containerization, DNS security, root-cause hardware/software diagnostics, and automation.
- **Home Lab (`/ultimatelab`)**: Technical documentation of the UltimateLab self-hosted environment running on a Proxmox VE cluster, detailing hardware specifications, power consumption, network architecture, virtual machines, and containers.
- **About (`/aboutme`)**: Professional summary, problem-solving philosophy, work experience, academic background, and downloadable PDF resume.

## Technical Highlights

- **Custom Go HTTP Server (`main.go`)**:
  - **Clean URLs**: Serves extensionless routes (such as `/projects`, `/services`, and `/projects/ecuswap`) directly from their corresponding `.html` files.
  - **Canonical Redirection**: Automatically redirects `.html` suffixes, trailing slashes, and legacy URLs to their canonical paths using `301 Moved Permanently`.
  - **Security & Sanitization**: Enforces path traversal protection and sets standard security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
  - **Cache Control**: Applies long-lived caching (`max-age=604800, stale-while-revalidate=86400`) for static assets (`.css`, `.js`, `.webp`, fonts) while keeping HTML responses fresh (`max-age=0, must-revalidate`).
  - **Custom 404 Handling**: Intercepts non-existent routes and unindexed directories to return a custom `404.html` page with an appropriate `404 Not Found` status code.
- **Frontend Architecture**:
  - **Adaptive Theme System**: Automatically follows the operating system color scheme (`prefers-color-scheme`) with support for manual dark/light mode toggling persisted in `localStorage`.
  - **Performance & Accessibility**: Uses modern WebP images across all pages and implements scroll reveal animations via `IntersectionObserver` while respecting `prefers-reduced-motion` preferences.
- **Multi-Stage Docker Build**:
  - Compiles the Go binary in an isolated `golang:alpine` builder stage and copies only the compiled executable and static assets into a minimal `alpine:latest` image.

## Technology Stack

- **Backend**: Go (`net/http` standard library)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Bootstrap 5.3, Font Awesome 6.4
- **Containerization**: Docker, Docker Compose
- **Hosting & Delivery**: Self-hosted on Proxmox VE (UltimateLab) and exposed via Cloudflare Tunnel

## Repository Structure

```text
.
├── docker-compose.yml       # Docker Compose service configuration
├── dockerfile               # Multi-stage Dockerfile (golang:alpine -> alpine:latest)
├── go.mod                   # Go module definition
├── main.go                  # Custom HTTP server, router, and middleware
├── scripts/
│   └── convert_to_webp.py   # Utility script for batch image conversion to WebP
└── html/                    # Static web root
    ├── index.html           # Landing page
    ├── projects.html        # Projects index page
    ├── services.html        # IT consultancy and services page
    ├── ultimatelab.html     # Home lab documentation page
    ├── aboutme.html         # Biography and resume page
    ├── 404.html             # Custom 404 error page
    ├── style.css            # Global stylesheet and theme variables
    ├── script.js            # Theme controller, navigation drawer, and UI scripts
    ├── files/               # Downloadable documents (PDF resume)
    ├── images/              # Optimized WebP images and favicon
    └── projects/            # Individual project write-up pages
        ├── caselds.html
        ├── ecuswap.html
        ├── garagex5.html
        ├── headunitmod.html
        └── sat.html
```

## Running Locally

### Using Docker Compose

```bash
docker compose up -d --build
```

The application will be available at `http://localhost:8080`.

### Using Go Directly

```bash
go run main.go
```

By default, the server listens on port `8080` (configurable via the `PORT` environment variable).
