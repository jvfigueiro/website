/* ==========================================================================
   jvfigueiro.com - Global JavaScript
   ========================================================================== */

// Update dynamic footer year
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Theme management: automatic OS preference with manual override
const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlElement = document.documentElement;

// Get current OS/browser preferred theme
const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme to DOM and toggle button icon without saving to localStorage
const applyTheme = (theme) => {
    htmlElement.setAttribute('data-bs-theme', theme);
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
};

// Initialize theme: follow saved preference if manually set, otherwise follow system
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme || getSystemTheme());

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

// Automatically react to OS/browser theme changes if user hasn't set a manual override
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Language switcher (PT-BR / EN)
const initLanguageSwitcher = () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    if (!langBtns.length) return;

    const savedLang = localStorage.getItem('site_lang') || 'pt';

    const setLanguage = (lang) => {
        document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'pt-br');
        localStorage.setItem('site_lang', lang);
        langBtns.forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    };

    setLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
};

initLanguageSwitcher();

// Dynamic Random Featured Projects (Selects 3 random projects on each page load)
const initRandomFeaturedProjects = () => {
    const container = document.getElementById('featuredProjectsContainer');
    if (!container) return;

    const allProjects = [
        {
            id: 'optiassist',
            title: 'OptiAssist',
            badge: '<i class="fas fa-toolbox me-1"></i> Utilitário Portátil USB',
            desc: 'A ferramenta definitiva que mantém seus sistemas otimizados e atualizados. Diagnóstico de hardware, instalação automatizada de programas, limpeza profunda e ordens de serviço — tudo em um aplicativo leve que roda direto da unidade flash USB.',
            visualType: 'img',
            imgSrc: '/images/optiassist-dashboard.webp',
            imgAlt: 'Interface principal do OptiAssist',
            tags: [
                { icon: 'fab fa-windows', text: 'Windows' },
                { icon: 'fas fa-terminal', text: 'PowerShell & CMD' },
                { icon: 'fas fa-box-open', text: 'Winget & Offline' }
            ],
            githubUrl: 'https://github.com/jvfigueiro/optiassist',
            detailsUrl: '/projects/optiassist',
            detailsText: 'Conhecer o Software'
        },
        {
            id: 'optimanager',
            title: 'OptiManager',
            badge: '<i class="fas fa-server me-1"></i> Sistema Self-Hosted',
            desc: 'Sistema self-hosted de gestão de ordens de serviço, clientes e faturamento em Go, SQLite e Vue 3. Leve, rápido e seguro, projetado para pequenas empresas e assistências técnicas com soberania de dados.',
            visualType: 'typo',
            typoHeaderLeft: '<i class="fas fa-clipboard-check me-1"></i> FLUXO DE ORDENS DE SERVIÇO',
            typoHeaderRight: '&lt; 40 MB RAM',
            typoSteps: ['Orçamento', 'Aberta', 'Em Andamento', 'Concluída', 'Entregue'],
            typoFooter: 'Backups atômicos via <code>VACUUM INTO</code> · Autenticação JWT & RBAC',
            tags: [
                { icon: 'fas fa-code', text: 'Go' },
                { icon: 'fas fa-database', text: 'SQLite' },
                { icon: 'fas fa-layer-group', text: 'Vue 3' },
                { icon: 'fab fa-docker', text: 'Docker & PWA' }
            ],
            githubUrl: 'https://github.com/jvfigueiro/optimanager',
            detailsUrl: '/projects/optimanager',
            detailsText: 'Conhecer o Software'
        },
        {
            id: 'ultimatelab',
            title: 'UltimateLab',
            badge: '<i class="fas fa-network-wired me-1"></i> Cluster de 2 Nós · Proxmox VE',
            desc: 'Cluster de 2 nós de virtualização baseado no Proxmox VE, distribuído entre mini PCs, para orquestração de serviços de DNS, VPN, automação residencial e inferência de IA local — incluindo este site.',
            visualType: 'img',
            imgSrc: '/images/ultimatelab.webp',
            imgAlt: 'Rack do UltimateLab com mini PCs e roteador',
            tags: [
                { icon: 'fas fa-server', text: 'Proxmox VE' },
                { icon: 'fab fa-docker', text: 'Docker' },
                { icon: 'fas fa-shield-halved', text: 'Tailscale & AdGuard' },
                { icon: 'fas fa-house-signal', text: 'Home Assistant' }
            ],
            githubUrl: null,
            detailsUrl: '/ultimatelab',
            detailsText: 'Ler a História Completa'
        },
        {
            id: 'garagex5',
            title: 'GarageX5 - O Meu Carro',
            badge: '<i class="fas fa-car me-1"></i> Retrofit & Embarcados',
            desc: 'Um projeto onde levo os conhecimentos de informática e eletrônica para dentro do meu carro, seguindo o conceito de retrofit, visando modernizá-lo sem perder suas características originais.',
            visualType: 'img',
            imgSrc: '/images/exterior.webp',
            imgAlt: 'Ford Escort Station Wagon do projeto GarageX5',
            tags: [
                { icon: 'fas fa-car', text: 'Escort SW 1998' },
                { icon: 'fas fa-bolt', text: 'Retrofit OEM+' },
                { icon: 'fas fa-microchip', text: 'Sistemas Embarcados' }
            ],
            githubUrl: null,
            detailsUrl: '/projects/garagex5',
            detailsText: 'Ler a História Completa'
        },
        {
            id: 'headunitmod',
            title: 'Engenharia Reversa em Multimídia',
            badge: '<i class="fas fa-microchip me-1"></i> Firmware & Linux',
            desc: 'Estudo e modificação de firmware de uma central multimídia automotiva baseada em Linux, explorando vetores de acesso via interfaces de manutenção do fabricante, customização de branding e mapeamento de interfaces de telemetria.',
            visualType: 'img',
            imgSrc: '/images/androidauto.webp',
            imgAlt: 'Android Auto spoofado para Ford SYNC na central multimídia',
            tags: [
                { icon: 'fab fa-linux', text: 'Linux 4.9' },
                { icon: 'fas fa-terminal', text: 'Reverse Engineering' },
                { icon: 'fas fa-code-branch', text: 'MTD Partitions' }
            ],
            githubUrl: 'https://github.com/jvfigueiro/sphe8368-headunit-modding',
            detailsUrl: '/projects/headunitmod',
            detailsText: 'Ler a História Completa'
        },
        {
            id: 'ecuswap',
            title: 'Upgrade de ECU Ford',
            badge: '<i class="fas fa-car-battery me-1"></i> Injeção & Telemetria',
            desc: 'Uma aventura que começou como uma tentativa via Arduino de decodificar o protocolo proprietário DCL presentes em módulos Ford EEC-IV e culminou na troca por uma EEC-V — alimentando telemetria em tempo real no Home Assistant.',
            visualType: 'img',
            imgSrc: '/images/eec-v.webp',
            imgAlt: 'Módulo de injeção eletrônica Ford EEC-V',
            tags: [
                { icon: 'fas fa-microchip', text: 'OBD2 / EEC-V' },
                { icon: 'fas fa-satellite-dish', text: 'Telemetria 5G' },
                { icon: 'fas fa-house-signal', text: 'Home Assistant' }
            ],
            githubUrl: null,
            detailsUrl: '/projects/ecuswap',
            detailsText: 'Ler a História Completa'
        },
        {
            id: 'sat',
            title: 'Exploração de Satélites',
            badge: '<i class="fas fa-satellite-dish me-1"></i> Estação Portátil FTA',
            desc: 'Recepção de canais digitais abertos (FTA) transmitidos por satélites geoestacionários de diversos países com uma mini antena parabólica adaptada para operar alimentada pela tomada 12V do carro.',
            visualType: 'img',
            imgSrc: '/images/sat-1.webp',
            imgAlt: 'Estação de recepção via satélite portátil',
            tags: [
                { icon: 'fas fa-satellite-dish', text: 'DVB-S2X' },
                { icon: 'fas fa-car', text: 'Alimentação 12V' },
                { icon: 'fas fa-globe', text: 'Banda Ku FTA' }
            ],
            githubUrl: null,
            detailsUrl: '/projects/sat',
            detailsText: 'Ler a História Completa'
        },
        {
            id: 'optios',
            title: 'OptiOS',
            badge: '<i class="fas fa-flask me-1"></i> Em desenvolvimento',
            desc: 'Sistema operacional experimental escrito do zero em Rust (x86-64, UEFI), desenvolvido com auxílio de agentes de IA para estudar os fundamentos de sistemas modernos: kernel com gerenciamento de memória, VFS, leitura de GPT/FAT32 e userland com shell próprio.',
            visualType: 'typo',
            typoHeaderLeft: '<i class="fas fa-microchip me-1"></i> ARQUITETURA DO SISTEMA',
            typoHeaderRight: 'x86-64 · UEFI',
            typoSteps: ['UEFI Boot', 'Kernel & Memória', 'VFS · GPT/FAT32', 'Userland Shell'],
            typoFooter: 'Escrito do zero em Rust · Estudo de fundamentos de sistemas operacionais',
            tags: [
                { icon: 'fas fa-gears', text: 'Rust' },
                { icon: 'fas fa-microchip', text: 'x86-64 & UEFI' },
                { icon: 'fas fa-memory', text: 'Kernel & VFS' }
            ],
            githubUrl: null,
            detailsUrl: null,
            detailsText: null
        },
        {
            id: 'arduinodht',
            title: 'Arduino DHT para Home Assistant',
            badge: '<i class="fas fa-temperature-high me-1"></i> Telemetria de Rack',
            desc: 'Monitoramento de temperatura e umidade usando sensores DHT11 ligados a um Arduino Mega. Os dados são repassados via interface serial para o Home Assistant virtualizado no Proxmox, alimentando rotinas de automação climática.',
            visualType: 'icon',
            iconClass: 'fas fa-temperature-high',
            tags: [
                { icon: 'fas fa-microchip', text: 'Arduino Mega' },
                { icon: 'fas fa-house-signal', text: 'Home Assistant' },
                { icon: 'fas fa-chart-line', text: 'Serial Telemetry' }
            ],
            githubUrl: 'https://github.com/jvfigueiro/ArduinoDHT-HA',
            detailsUrl: '/ultimatelab',
            detailsText: 'Ver no Laboratório'
        },
        {
            id: 'caselds',
            title: 'Modernização de Rede Cisco',
            badge: '<i class="fas fa-helmet-safety me-1"></i> Case em campo · 42 edificações',
            desc: 'Projeto real de infraestrutura com cabeamento estruturado CAT6, montagem física de racks e gestão centralizada em nuvem via Cisco Meraki em 42 edificações no Rio Grande do Sul.',
            visualType: 'img',
            imgSrc: '/images/lds-work.webp',
            imgAlt: 'Substituição de cabeamento CAT6 e organização de rack Cisco Meraki',
            tags: [
                { icon: 'fas fa-network-wired', text: 'CAT6' },
                { icon: 'fas fa-cloud', text: 'Cisco Meraki' },
                { icon: 'fas fa-server', text: 'Racks & Infra' }
            ],
            githubUrl: null,
            detailsUrl: '/projects/caselds',
            detailsText: 'Ler a História Completa'
        }
    ];

    // Shuffle array using Fisher-Yates
    const shuffled = [...allProjects];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Pick top 3
    const selected = shuffled.slice(0, 3);

    const renderCard = (p) => {
        let visualHtml = '';
        if (p.visualType === 'img') {
            visualHtml = `
                <div class="featured-card-visual">
                    <img src="${p.imgSrc}" loading="lazy" alt="${p.imgAlt}">
                </div>
            `;
        } else if (p.visualType === 'typo') {
            const stepsHtml = p.typoSteps.map((st, idx) => `
                <span class="typo-step">${st}</span>
                ${idx < p.typoSteps.length - 1 ? '<span class="typo-arrow">→</span>' : ''}
            `).join('');
            visualHtml = `
                <div class="featured-card-visual typographic-panel" aria-hidden="true">
                    <div class="typo-panel-header">
                        <span>${p.typoHeaderLeft}</span>
                        <span>${p.typoHeaderRight}</span>
                    </div>
                    <div class="typo-flow">
                        ${stepsHtml}
                    </div>
                    <div class="small text-secondary" style="font-size: 0.76rem;">
                        ${p.typoFooter}
                    </div>
                </div>
            `;
        } else {
            visualHtml = `
                <div class="featured-card-visual">
                    <div class="featured-icon-display">
                        <i class="${p.iconClass}" aria-hidden="true"></i>
                    </div>
                </div>
            `;
        }

        const tagsHtml = p.tags.map(t => `
            <span class="tech-chip"><i class="${t.icon}" aria-hidden="true"></i> ${t.text}</span>
        `).join('');

        let actionsHtml = '';
        if (p.githubUrl || p.detailsUrl) {
            actionsHtml = `
                <div class="project-actions">
                    ${p.githubUrl ? `
                        <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary">
                            <i class="fab fa-github" aria-hidden="true"></i> Repositório
                        </a>
                    ` : ''}
                    ${p.detailsUrl ? `
                        <a href="${p.detailsUrl}" class="btn btn-sm btn-outline-secondary ms-auto">
                            <i class="fas fa-arrow-right" aria-hidden="true"></i> ${p.detailsText}
                        </a>
                    ` : ''}
                </div>
            `;
        }

        return `
            <article class="featured-card">
                ${visualHtml}
                <div class="featured-meta">
                    <h3 class="project-title m-0">${p.title}</h3>
                    <span class="node-badge">${p.badge}</span>
                </div>
                <p class="project-desc mb-3">${p.desc}</p>
                <div class="chip-group mb-3">${tagsHtml}</div>
                ${actionsHtml}
            </article>
        `;
    };

    container.innerHTML = selected.map(renderCard).join('');
};

initRandomFeaturedProjects();

// Mobile navigation drawer toggle
const navToggleBtn = document.getElementById('navToggleBtn');
const navMenu = document.getElementById('navMenu');

if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('is-active');
        navToggleBtn.setAttribute('aria-expanded', isOpen);
        const icon = navToggleBtn.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navMenu.classList.contains('is-active') && !navMenu.contains(event.target) && !navToggleBtn.contains(event.target)) {
            navMenu.classList.remove('is-active');
            navToggleBtn.setAttribute('aria-expanded', 'false');
            const icon = navToggleBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu on Escape key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('is-active')) {
            navMenu.classList.remove('is-active');
            navToggleBtn.setAttribute('aria-expanded', 'false');
            const icon = navToggleBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Typewriter effect on homepage
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const textToType = typewriterElement.getAttribute('data-text');
        if (prefersReducedMotion) {
            typewriterElement.textContent = textToType;
        } else {
            let index = 0;
            typewriterElement.textContent = '';

            function typeWriter() {
                if (index < textToType.length) {
                    typewriterElement.textContent += textToType.charAt(index);
                    index++;
                    setTimeout(typeWriter, 32);
                }
            }
            
            typeWriter();
        }
    }

    document.body.classList.add('page-loaded');

    // Scroll reveal animations
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealTargets = document.querySelectorAll(
            '.content-section, .project-card, .project-list-item, .retrofit-category, .service-category, .card, .timeline-item'
        );

        revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealTargets.forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.content-section, .project-card, .project-list-item, .retrofit-category, .service-category, .card')
            .forEach(el => el.classList.add('is-visible'));
    }

    // Avatar parallax effect on desktop
    const avatarContainer = document.querySelector('.profile-avatar-container');
    if (avatarContainer && !prefersReducedMotion && window.innerWidth >= 992) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY * 0.08;
            avatarContainer.style.transform = `translateY(${offset}px)`;
        }, { passive: true });
    }

    // Interactive Constellation & Live Topology Background (Homepage Hero)
    initTopologyConstellation(prefersReducedMotion);
});

function initTopologyConstellation(prefersReducedMotion) {
    const container = document.getElementById('topologyBg');
    const canvas = document.getElementById('topologyCanvas');
    if (!container || !canvas) return;

    // Simple disable flag support
    if (window.TOPOLOGY_BG_ENABLED === false || container.getAttribute('data-topology-enabled') === 'false') {
        container.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const heroSection = container.closest('.home-hero') || container.parentElement;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;
    let isRunning = false;
    let isVisibleInViewport = true;
    let isTabVisible = !document.hidden;
    let rafId = null;
    let tick = 0;

    // Mouse interaction state
    const mouse = {
        x: -9999,
        y: -9999,
        targetX: -9999,
        targetY: -9999,
        active: false
    };

    // Scene entities
    let spheres = [];
    let hubs = [];
    let structuralNodes = [];
    let structuralEdges = [];
    let freeNodes = [];
    let pulses = [];

    // Theme palette resolver using existing site tokens (#a855f7 in dark, #5a32a3 in light)
    function getPalette() {
        const theme = document.documentElement.getAttribute('data-bs-theme') || 'dark';
        if (theme === 'light') {
            return {
                isDark: false,
                rgb: '90, 50, 163',        // #5a32a3
                brightRgb: '124, 58, 237', // #7c3aed
                hubBg: 'rgba(250, 247, 255, 0.94)',
                hubBorder: 'rgba(90, 50, 163, 0.45)',
                hubIcon: 'rgba(90, 50, 163, 0.9)',
                auraAlpha: 0.08,
                edgeAlpha: 0.22,
                nodeAlpha: 0.55,
                pulseAlpha: 0.85
            };
        }
        return {
            isDark: true,
            rgb: '168, 85, 247',           // #a855f7
            brightRgb: '233, 213, 255',    // #e9d5ff (luminous lavender-white pulse core)
            hubBg: 'rgba(22, 10, 34, 0.88)',
            hubBorder: 'rgba(168, 85, 247, 0.55)',
            hubIcon: 'rgba(233, 213, 255, 0.92)',
            auraAlpha: 0.20,
            edgeAlpha: 0.28,
            nodeAlpha: 0.75,
            pulseAlpha: 0.95
        };
    }

    // Build a 3D Fibonacci sphere mesh
    function createGeodesicSphere(cx, cy, radius, count) {
        const pts3d = [];
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const r = Math.sqrt(Math.max(0, 1 - y * y));
            const theta = goldenAngle * i;
            pts3d.push({
                x: Math.cos(theta) * r,
                y: y,
                z: Math.sin(theta) * r
            });
        }
        // Connect neighboring points on the unit sphere
        const edges = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = pts3d[i].x - pts3d[j].x;
                const dy = pts3d[i].y - pts3d[j].y;
                const dz = pts3d[i].z - pts3d[j].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < 0.78) {
                    edges.push([i, j]);
                }
            }
        }
        return {
            cx,
            cy,
            radius,
            pts3d,
            edges,
            projected: new Array(count).fill(null).map(() => ({ x: 0, y: 0, z: 0 })),
            rotX: 0.3,
            rotY: 0.6,
            ringAngle: 0
        };
    }

    function buildScene() {
        isMobile = width < 768;
        spheres = [];
        hubs = [];
        structuralNodes = [];
        structuralEdges = [];
        freeNodes = [];
        pulses = [];

        if (!isMobile) {
            // Desktop: 2 Geodesic Wireframe Spheres (left-middle and top-right, like reference)
            const sLeft = createGeodesicSphere(width * 0.035, height * 0.43, 46, 22);
            const sRight = createGeodesicSphere(width * 0.905, height * 0.12, 44, 22);
            spheres.push(sLeft, sRight);

            // 4 Circular Technical Icon Hubs on the periphery
            hubs = [
                { id: 'monitor', x: width * 0.79, y: height * 0.16, r: 22, type: 'monitor' },
                { id: 'storage', x: width * 0.965, y: height * 0.43, r: 23, type: 'database' },
                { id: 'cloud', x: width * 0.935, y: height * 0.80, r: 22, type: 'cloud' },
                { id: 'chip', x: width * 0.02, y: height * 0.80, r: 22, type: 'chip' }
            ];

            // Structural constellation vertices framing margins and bridging across the upper/mid area
            const rawAnchors = [
                // Left wing constellation (connecting left sphere to bottom-left chip hub and top-left)
                [0.035, 0.43], // 0: Left sphere center
                [0.080, 0.46], // 1: Right of left sphere
                [0.020, 0.80], // 2: Chip hub
                [0.032, 0.96], // 3: Bottom-left corner
                [0.095, 0.14], // 4: Top-left bright node
                [0.135, 0.03], // 5: Top-left ridge
                [0.215, 0.05], // 6: Top-left inner ridge
                [0.195, 0.24], // 7: Left upper inner node
                // Top-center & central subtle constellation bridge
                [0.320, 0.06], // 8: Top mid-left
                [0.380, 0.18], // 9: Upper center-left
                [0.500, 0.08], // 10: Center-top apex
                [0.580, 0.22], // 11: Upper center-right
                [0.630, 0.09], // 12: Top mid-right
                // Mid-screen & lower-central ambient nodes
                [0.460, 0.42], // 13: Mid-center soft hub
                [0.550, 0.58], // 14: Mid-lower center
                [0.380, 0.72], // 15: Lower center-left
                [0.620, 0.76], // 16: Lower center-right
                // Top-right wing constellation (around monitor hub & top-right sphere)
                [0.710, 0.15], // 17
                [0.790, 0.16], // 18: Monitor hub
                [0.905, 0.12], // 19: Top-right sphere center
                [0.855, 0.27], // 20
                [0.885, 0.24], // 21
                [0.900, 0.22], // 22
                // Right wing constellation (around storage hub and cloud hub)
                [0.965, 0.43], // 23: Storage hub
                [0.870, 0.59], // 24: Bright mid-right relay
                [0.955, 0.65], // 25
                [0.885, 0.89], // 26
                [0.935, 0.80], // 27: Cloud hub
                [0.962, 0.49]  // 28
            ];

            structuralNodes = rawAnchors.map(([nx, ny], idx) => ({
                baseX: nx * width,
                baseY: ny * height,
                x: nx * width,
                y: ny * height,
                phase: idx * 0.9,
                amp: [0, 2, 18, 19, 23, 27].includes(idx) ? 0 : 4.5,
                highlight: [1, 4, 7, 9, 10, 11, 13, 14, 17, 20, 24, 25].includes(idx)
            }));

            structuralEdges = [
                // Left wing
                [0, 1], [1, 2], [0, 2], [2, 3], [1, 3],
                [4, 5], [5, 6], [6, 7], [4, 7], [0, 4],
                // Central constellation network (connecting wings across top & center)
                [6, 8], [8, 9], [8, 10], [9, 10], [10, 11], [10, 12], [11, 12],
                [7, 9], [9, 13], [13, 11], [13, 14], [14, 15], [14, 16],
                [11, 17], [12, 17], [14, 24], [16, 24], [15, 1],
                // Top-right wing
                [17, 18], [18, 19], [18, 20], [20, 21], [21, 22], [22, 19], [17, 20],
                // Right wing
                [23, 24], [24, 26], [23, 28], [28, 25], [25, 26], [25, 27], [23, 25]
            ];
        } else {
            // Mobile: streamlined peripheral constellation (top-right sphere + 2 hubs)
            const sRight = createGeodesicSphere(width * 0.88, height * 0.11, 30, 16);
            spheres.push(sRight);

            hubs = [
                { id: 'monitor', x: width * 0.72, y: height * 0.13, r: 16, type: 'monitor' },
                { id: 'storage', x: width * 0.92, y: height * 0.84, r: 16, type: 'database' }
            ];

            const rawAnchors = [
                [0.10, 0.06],
                [0.28, 0.03],
                [0.48, 0.18], // Central mobile bridge
                [0.72, 0.13],
                [0.88, 0.11],
                [0.84, 0.24],
                [0.55, 0.48], // Central mid mobile node
                [0.94, 0.56],
                [0.85, 0.72],
                [0.92, 0.84],
                [0.14, 0.90]
            ];

            structuralNodes = rawAnchors.map(([nx, ny], idx) => ({
                baseX: nx * width,
                baseY: ny * height,
                x: nx * width,
                y: ny * height,
                phase: idx * 1.1,
                amp: [3, 4, 9].includes(idx) ? 0 : 3,
                highlight: [0, 2, 5, 6, 8, 10].includes(idx)
            }));

            structuralEdges = [
                [0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [4, 5],
                [2, 6], [6, 7], [5, 7], [7, 8], [8, 9], [7, 9]
            ];
        }

        // Free-drifting constellation particles distributed across the hero canvas
        const freeCount = isMobile ? 22 : 62;
        for (let i = 0; i < freeCount; i++) {
            // Well-distributed particles (margins + central ambient field)
            const fx = (0.02 + Math.random() * 0.96) * width;
            const fy = (0.02 + Math.random() * 0.96) * height;

            const speed = 0.16 + Math.random() * 0.28;
            const angle = Math.random() * Math.PI * 2;
            freeNodes.push({
                x: fx,
                y: fy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: 1.2 + Math.random() * 1.6,
                alpha: 0.35 + Math.random() * 0.5
            });
        }

        // Create signal pulses traveling along structural edges
        const pulseCount = isMobile ? 6 : 14;
        for (let i = 0; i < pulseCount; i++) {
            if (structuralEdges.length > 0) {
                const edgeIdx = i % structuralEdges.length;
                pulses.push({
                    edgeIdx,
                    t: Math.random(),
                    speed: 0.0045 + Math.random() * 0.004,
                    forward: Math.random() > 0.3
                });
            }
        }
    }

    function resize() {
        const rect = container.getBoundingClientRect();
        width = Math.max(320, Math.floor(rect.width));
        height = Math.max(420, Math.floor(rect.height));
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        buildScene();
        if (prefersReducedMotion) {
            renderFrame();
        }
    }

    // Draw minimalist vector icons inside the circular hubs
    function drawHubIcon(type, cx, cy, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1.35;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (type === 'monitor') {
            // Monitor screen + stand
            ctx.strokeRect(cx - 6.5, cy - 5.5, 13, 9);
            ctx.beginPath();
            ctx.moveTo(cx - 3.5, cy + 6);
            ctx.lineTo(cx + 3.5, cy + 6);
            ctx.moveTo(cx, cy + 3.5);
            ctx.lineTo(cx, cy + 6);
            ctx.stroke();
        } else if (type === 'database') {
            // Cylinder storage icon
            ctx.beginPath();
            ctx.ellipse(cx, cy - 4.5, 5.5, 2.2, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx - 5.5, cy - 4.5);
            ctx.lineTo(cx - 5.5, cy + 4.5);
            ctx.ellipse(cx, cy + 4.5, 5.5, 2.2, 0, 0, Math.PI);
            ctx.lineTo(cx + 5.5, cy - 4.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(cx, cy, 5.5, 2.2, 0, 0, Math.PI);
            ctx.stroke();
        } else if (type === 'cloud') {
            // Cloud / network node icon
            ctx.beginPath();
            ctx.arc(cx - 2.5, cy + 1, 3.2, Math.PI * 0.5, Math.PI * 1.45);
            ctx.arc(cx + 0.5, cy - 1.5, 3.8, Math.PI * 1.1, Math.PI * 1.95);
            ctx.arc(cx + 4, cy + 1.2, 2.8, Math.PI * 1.5, Math.PI * 0.5);
            ctx.closePath();
            ctx.stroke();
        } else if (type === 'chip') {
            // Microchip / CPU icon with pins
            ctx.strokeRect(cx - 4.5, cy - 4.5, 9, 9);
            ctx.strokeRect(cx - 2, cy - 2, 4, 4);
            const pins = [-2.5, 2.5];
            pins.forEach(p => {
                ctx.beginPath();
                ctx.moveTo(cx + p, cy - 4.5); ctx.lineTo(cx + p, cy - 7);
                ctx.moveTo(cx + p, cy + 4.5); ctx.lineTo(cx + p, cy + 7);
                ctx.moveTo(cx - 4.5, cy + p); ctx.lineTo(cx - 7, cy + p);
                ctx.moveTo(cx + 4.5, cy + p); ctx.lineTo(cx + 7, cy + p);
                ctx.stroke();
            });
        }
        ctx.restore();
    }

    function updateScene() {
        tick += 1;

        // Smooth mouse interpolation
        if (mouse.active) {
            mouse.x += (mouse.targetX - mouse.x) * 0.14;
            mouse.y += (mouse.targetY - mouse.y) * 0.14;
        }

        // Update structural nodes gentle oscillation + cursor reaction
        for (let i = 0; i < structuralNodes.length; i++) {
            const n = structuralNodes[i];
            let ox = Math.cos(tick * 0.015 + n.phase) * n.amp;
            let oy = Math.sin(tick * 0.015 + n.phase) * n.amp;

            if (mouse.active && n.amp > 0) {
                const dx = mouse.x - n.baseX;
                const dy = mouse.y - n.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200 && dist > 1) {
                    const pull = (1 - dist / 200) * 10;
                    ox += (dx / dist) * pull;
                    oy += (dy / dist) * pull;
                }
            }
            n.x = n.baseX + ox;
            n.y = n.baseY + oy;
        }

        // Update rotating 3D geodesic spheres
        for (let s = 0; s < spheres.length; s++) {
            const sp = spheres[s];
            let extraSpeed = 0;
            if (mouse.active) {
                const dx = mouse.x - sp.cx;
                const dy = mouse.y - sp.cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 260) {
                    extraSpeed = (1 - dist / 260) * 0.012;
                }
            }
            sp.rotY += 0.0045 + extraSpeed;
            sp.rotX += 0.002 + extraSpeed * 0.5;
            sp.ringAngle -= 0.003;

            const cosY = Math.cos(sp.rotY);
            const sinY = Math.sin(sp.rotY);
            const cosX = Math.cos(sp.rotX);
            const sinX = Math.sin(sp.rotX);

            for (let i = 0; i < sp.pts3d.length; i++) {
                const p = sp.pts3d[i];
                // Rotate around Y then X
                const x1 = p.x * cosY - p.z * sinY;
                const z1 = p.z * cosY + p.x * sinY;
                const y2 = p.y * cosX - z1 * sinX;
                const z2 = z1 * cosX + p.y * sinX;

                sp.projected[i].x = sp.cx + x1 * sp.radius;
                sp.projected[i].y = sp.cy + y2 * sp.radius;
                sp.projected[i].z = z2;
            }
        }

        // Update free constellation particles + mouse cursor attraction/repulsion
        for (let i = 0; i < freeNodes.length; i++) {
            const p = freeNodes[i];
            p.x += p.vx;
            p.y += p.vy;

            // Gentle bounce at canvas borders
            if (p.x < 8 || p.x > width - 8) p.vx *= -1;
            if (p.y < 8 || p.y > height - 8) p.vy *= -1;

            // Mouse cursor gentle orbital pull
            if (mouse.active) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 185 && dist > 20) {
                    const force = (1 - dist / 185) * 0.65;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }
            }
        }

        // Update signal pulses along structural edges
        for (let i = 0; i < pulses.length; i++) {
            const pl = pulses[i];
            pl.t += pl.speed;
            if (pl.t >= 1) {
                pl.t = 0;
                pl.edgeIdx = Math.floor(Math.random() * structuralEdges.length);
                pl.forward = Math.random() > 0.3;
            }
        }
    }

    function renderFrame() {
        const pal = getPalette();
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Geodesic Spheres (aura, orbital rings, 3D wireframe mesh, vertices)
        for (let s = 0; s < spheres.length; s++) {
            const sp = spheres[s];

            // Radial glow aura
            const aura = ctx.createRadialGradient(sp.cx, sp.cy, sp.radius * 0.1, sp.cx, sp.cy, sp.radius * 2.1);
            aura.addColorStop(0, `rgba(${pal.rgb}, ${pal.auraAlpha})`);
            aura.addColorStop(1, `rgba(${pal.rgb}, 0)`);
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(sp.cx, sp.cy, sp.radius * 2.1, 0, Math.PI * 2);
            ctx.fill();

            // Outer faint solid ring
            ctx.strokeStyle = `rgba(${pal.rgb}, ${pal.edgeAlpha * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sp.cx, sp.cy, sp.radius * 1.48, 0, Math.PI * 2);
            ctx.stroke();

            // Dashed rotating orbital ring
            ctx.save();
            ctx.translate(sp.cx, sp.cy);
            ctx.rotate(sp.ringAngle);
            ctx.setLineDash([4, 6]);
            ctx.strokeStyle = `rgba(${pal.rgb}, ${pal.edgeAlpha * 0.7})`;
            ctx.beginPath();
            ctx.arc(0, 0, sp.radius * 1.24, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // 3D wireframe edges
            for (let e = 0; e < sp.edges.length; e++) {
                const [i, j] = sp.edges[e];
                const p1 = sp.projected[i];
                const p2 = sp.projected[j];
                const depthAlpha = ((p1.z + p2.z) * 0.5 + 1) * 0.5; // 0..1
                const alpha = pal.edgeAlpha * (0.35 + depthAlpha * 0.85);
                ctx.strokeStyle = `rgba(${pal.rgb}, ${alpha.toFixed(3)})`;
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            // 3D sphere vertices
            for (let i = 0; i < sp.projected.length; i++) {
                const p = sp.projected[i];
                const depth = (p.z + 1) * 0.5;
                const r = 1.1 + depth * 1.3;
                ctx.fillStyle = depth > 0.65
                    ? `rgba(${pal.brightRgb}, ${(pal.nodeAlpha * (0.6 + depth * 0.4)).toFixed(3)})`
                    : `rgba(${pal.rgb}, ${(pal.nodeAlpha * (0.35 + depth * 0.5)).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 2. Draw Structural Constellation Edges
        ctx.lineWidth = 1;
        for (let i = 0; i < structuralEdges.length; i++) {
            const [aIdx, bIdx] = structuralEdges[i];
            const a = structuralNodes[aIdx];
            const b = structuralNodes[bIdx];
            if (!a || !b) continue;

            ctx.strokeStyle = `rgba(${pal.rgb}, ${pal.edgeAlpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }

        // 3. Draw Signal Pulses with Luminous Comet Tails along Structural Edges
        for (let i = 0; i < pulses.length; i++) {
            const pl = pulses[i];
            const edge = structuralEdges[pl.edgeIdx];
            if (!edge) continue;
            const a = pl.forward ? structuralNodes[edge[0]] : structuralNodes[edge[1]];
            const b = pl.forward ? structuralNodes[edge[1]] : structuralNodes[edge[0]];
            if (!a || !b) continue;

            const px = a.x + (b.x - a.x) * pl.t;
            const py = a.y + (b.y - a.y) * pl.t;
            const tailT = Math.max(0, pl.t - 0.16);
            const tx = a.x + (b.x - a.x) * tailT;
            const ty = a.y + (b.y - a.y) * tailT;

            // Comet tail gradient
            const grad = ctx.createLinearGradient(tx, ty, px, py);
            grad.addColorStop(0, `rgba(${pal.rgb}, 0)`);
            grad.addColorStop(1, `rgba(${pal.brightRgb}, ${pal.pulseAlpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(px, py);
            ctx.stroke();

            // Luminous pulse head
            ctx.fillStyle = `rgba(${pal.brightRgb}, ${pal.pulseAlpha})`;
            ctx.beginPath();
            ctx.arc(px, py, 2.3, 0, Math.PI * 2);
            ctx.fill();
        }

        // 4. Draw Structural Constellation Nodes
        for (let i = 0; i < structuralNodes.length; i++) {
            const n = structuralNodes[i];
            if (n.highlight) {
                // Soft glow around key constellation vertices
                const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 8);
                glow.addColorStop(0, `rgba(${pal.brightRgb}, ${pal.nodeAlpha * 0.7})`);
                glow.addColorStop(1, `rgba(${pal.rgb}, 0)`);
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = `rgba(${pal.brightRgb}, ${pal.pulseAlpha})`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = `rgba(${pal.rgb}, ${pal.nodeAlpha * 0.7})`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 5. Draw Free Constellation Nodes & Dynamic Proximity Web
        const maxLinkDist = isMobile ? 105 : 138;
        for (let i = 0; i < freeNodes.length; i++) {
            const p1 = freeNodes[i];

            // Connect to nearby free nodes
            for (let j = i + 1; j < freeNodes.length; j++) {
                const p2 = freeNodes[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxLinkDist) {
                    const alpha = (1 - dist / maxLinkDist) * pal.edgeAlpha * 0.75;
                    ctx.strokeStyle = `rgba(${pal.rgb}, ${alpha.toFixed(3)})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            // Connect free nodes to nearby structural nodes
            for (let k = 0; k < structuralNodes.length; k++) {
                const sn = structuralNodes[k];
                const dx = p1.x - sn.x;
                const dy = p1.y - sn.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxLinkDist * 0.85) {
                    const alpha = (1 - dist / (maxLinkDist * 0.85)) * pal.edgeAlpha * 0.65;
                    ctx.strokeStyle = `rgba(${pal.rgb}, ${alpha.toFixed(3)})`;
                    ctx.lineWidth = 0.75;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(sn.x, sn.y);
                    ctx.stroke();
                }
            }

            // Draw particle dot
            ctx.fillStyle = `rgba(${pal.rgb}, ${(p1.alpha * pal.nodeAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // 6. Interactive Mouse Cursor Constellation Connections
        if (mouse.active && mouse.x > 0 && mouse.y > 0) {
            const cursorRadius = 185;
            let connectedCount = 0;

            // Connect cursor to nearby free nodes & structural nodes
            const candidates = [...freeNodes, ...structuralNodes];
            for (let i = 0; i < candidates.length; i++) {
                const pt = candidates[i];
                const dx = mouse.x - pt.x;
                const dy = mouse.y - pt.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < cursorRadius) {
                    connectedCount++;
                    const factor = 1 - dist / cursorRadius;
                    const alpha = factor * (pal.isDark ? 0.55 : 0.40);
                    ctx.strokeStyle = `rgba(${pal.rgb}, ${alpha.toFixed(3)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(pt.x, pt.y);
                    ctx.stroke();

                    // Travelling signal dot along cursor link
                    const pulsePos = (tick * 0.025 + i * 0.17) % 1;
                    const sx = pt.x + dx * pulsePos;
                    const sy = pt.y + dy * pulsePos;
                    ctx.fillStyle = `rgba(${pal.brightRgb}, ${(factor * 0.85).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1.7, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Subtle glowing node at cursor position
            if (connectedCount > 0) {
                const cursorHalo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 44);
                cursorHalo.addColorStop(0, `rgba(${pal.rgb}, ${pal.isDark ? 0.18 : 0.10})`);
                cursorHalo.addColorStop(1, `rgba(${pal.rgb}, 0)`);
                ctx.fillStyle = cursorHalo;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 44, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = `rgba(${pal.brightRgb}, 0.85)`;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 7. Draw Circular Technical Icon Hubs on top of links
        for (let h = 0; h < hubs.length; h++) {
            const hb = hubs[h];

            // Outer radial aura
            const aura = ctx.createRadialGradient(hb.x, hb.y, hb.r * 0.4, hb.x, hb.y, hb.r * 2.4);
            aura.addColorStop(0, `rgba(${pal.rgb}, ${pal.auraAlpha * 1.15})`);
            aura.addColorStop(1, `rgba(${pal.rgb}, 0)`);
            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(hb.x, hb.y, hb.r * 2.4, 0, Math.PI * 2);
            ctx.fill();

            // Hub circle background
            ctx.fillStyle = pal.hubBg;
            ctx.strokeStyle = pal.hubBorder;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.arc(hb.x, hb.y, hb.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Crisp vector icon inside hub
            drawHubIcon(hb.type, hb.x, hb.y, pal.hubIcon);
        }
    }

    function loop() {
        if (!isRunning) return;
        updateScene();
        renderFrame();
        rafId = window.requestAnimationFrame(loop);
    }

    function updateRunState() {
        const shouldRun = !prefersReducedMotion && isVisibleInViewport && isTabVisible;
        if (shouldRun && !isRunning) {
            isRunning = true;
            rafId = window.requestAnimationFrame(loop);
        } else if (!shouldRun && isRunning) {
            isRunning = false;
            if (rafId) {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }
        }
    }

    // Initialize size and scene
    resize();

    // Debounced resize handler
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 120);
    }, { passive: true });

    // Mouse interactivity on Hero section
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouse.targetX = e.clientX - rect.left;
            mouse.targetY = e.clientY - rect.top;
            if (!mouse.active) {
                mouse.x = mouse.targetX;
                mouse.y = mouse.targetY;
                mouse.active = true;
            }
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
            mouse.active = false;
            mouse.targetX = -9999;
            mouse.targetY = -9999;
        }, { passive: true });
    }

    // Pause when out of viewport
    if ('IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisibleInViewport = entry.isIntersecting;
                updateRunState();
            });
        }, { threshold: 0.02 });
        heroObserver.observe(container);
    }

    // Pause when browser tab is hidden
    document.addEventListener('visibilitychange', () => {
        isTabVisible = !document.hidden;
        updateRunState();
    });

    // Re-render immediately when theme toggles (vital for reduced-motion or paused state)
    const themeObserver = new MutationObserver(() => {
        if (!isRunning) {
            renderFrame();
        }
    });
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-bs-theme']
    });

    updateRunState();
}