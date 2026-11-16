/* ==========================================================================
   jvfigueiro.com - Internationalization (i18n) Engine & Dictionaries
   Languages: Portuguese (PT-BR) & English (EN)
   ========================================================================== */

const SITE_TRANSLATIONS = {
    pt: {
        // Navigation
        'nav.brand': 'João Figueiró',
        'nav.home': 'Início',
        'nav.projects': 'Projetos',
        'nav.lab': 'Laboratório',
        'nav.about': 'Sobre',
        'nav.services': 'Serviços',
        'nav.theme': 'Alternar Tema',
        'nav.lang': 'Seleção de idioma',

        // Footer
        'footer.rights': 'Todos os direitos reservados.',
        'footer.powered': 'Powered by',

        // Common
        'common.backToProjects': 'Voltar para Projetos',
        'common.readFullStory': 'Ler a História Completa',
        'common.exploreSoftware': 'Conhecer o Software',
        'common.viewLab': 'Ver no Laboratório',
        'common.exploreAll': 'Explorar Catálogo Completo de Projetos →',
        'common.aboutMe': 'Sobre Mim',
        'common.viewProjects': 'Ver Projetos',
        'common.laboratory': 'Laboratório',
        'common.contact': 'Contato',
        'common.github': 'GitHub',
        'common.sourceCode': 'Código Fonte no GitHub',

        // 404 Page
        '404.title': '404 - Página Não Encontrada | João Figueiró',
        '404.badge': '404',
        '404.heading': 'Houston, temos um problema!',
        '404.desc': 'A página que você está procurando foi sugada por um buraco negro, perdeu a conexão com o servidor DNS ou simplesmente nunca existiu neste universo.',
        '404.btnHome': 'Ir para a página inicial',
        '404.btnProjects': 'Ver Projetos',

        // Homepage - Hero
        'home.title': 'João Figueiró | Analista de TI, Infraestrutura e Automação',
        'home.tagline': '> Construtor de engenhocas, gearhead e maluco da informática_',
        'home.heroPositioning': 'Transformando problemas técnicos em infraestrutura confiável, software enxuto e automação prática.',
        'home.heroLead': '<strong>Analista de TI</strong> com foco em infraestrutura, suporte técnico e operações — atuando em redes, virtualização com Proxmox VE, sistemas Windows e Linux e desenvolvimento de ferramentas de código aberto.',
        'home.btnProjects': 'Ver Projetos',
        'home.btnAbout': 'Sobre Mim',
        'home.btnLab': 'Laboratório',

        // Homepage - Pillars / Areas
        'home.pillarsLabel': 'Especialidades &amp; Áreas de Atuação',
        'home.pillarsHeading': 'Do suporte à automação<span class="text-accent">:</span> o que eu construo e opero',
        'home.pillar1Title': 'Suporte Técnico &amp; Operações de TI',
        'home.pillar1Desc': 'Resolução de chamados de N1 a N3, manutenção preventiva e corretiva de hardware, diagnóstico e suporte direto a usuários e estações de trabalho.',
        'home.pillar1Tag1': 'Helpdesk &amp; Suporte',
        'home.pillar1Tag2': 'Hardware &amp; Diagnóstico',
        'home.pillar2Title': 'Redes &amp; Infraestrutura',
        'home.pillar2Desc': 'Cabeamento estruturado CAT6, switches gerenciáveis, roteadores, Wi-Fi corporativo, VPNs (WireGuard e Tailscale) e segurança com firewalls e DNS sinkholes.',
        'home.pillar2Tag1': 'Cisco Meraki &amp; CAT6',
        'home.pillar2Tag2': 'WireGuard &amp; Tailscale',
        'home.pillar3Title': 'Virtualização &amp; Homelab',
        'home.pillar3Desc': 'Servidores Proxmox VE em cluster de 2 nós com replicação, containers Docker e LXC, monitoramento contínuo e rotinas automáticas de backup para serviços essenciais.',
        'home.pillar3Tag1': 'Cluster Proxmox VE',
        'home.pillar3Tag2': 'Docker &amp; LXC',
        'home.pillar4Title': 'Software Próprio &amp; Engenharia Reversa',
        'home.pillar4Desc': 'Ferramentas utilitárias em Go, Rust, PowerShell e Bash, integração com microcontroladores (Arduino) e engenharia reversa de firmwares embarcados.',
        'home.pillar4Tag1': 'Go &amp; PowerShell',
        'home.pillar4Tag2': 'Sistemas Embarcados',

        // Homepage - Featured Projects
        'home.featuredLabel': 'Portfólio Técnico Selecionado',
        'home.featuredHeading': 'Projetos &amp; Softwares em Destaque<span class="text-accent">.</span>',
        'home.featuredDesc': 'Sistemas self-hosted, utilitários de manutenção, projetos embarcados e o cluster do laboratório doméstico — desenvolvidos com foco em eficiência, código limpo e utilidade real.',
        'home.featuredAllBtn': 'Explorar Catálogo Completo de Projetos →',

        // Homepage - Lab & Skills
        'home.labSkillsLabel': 'Infraestrutura Viva &amp; Stack Técnica',
        'home.labTitle': 'UltimateLab<span class="text-accent">:</span> Onde teoria vira infraestrutura em operação contínua',
        'home.labDesc': 'O <strong>UltimateLab</strong> é meu laboratório doméstico de virtualização e testes. Mais do que um hobby, é o ambiente onde experimento novas tecnologias, simulo topologias de rede corporativas e hospedo serviços de uso diário — incluindo a infraestrutura que entrega este site.',
        'home.labStat1': 'Cluster de 2 nós de virtualização Proxmox VE',
        'home.labStat2': 'Serviços em produção (Docker + LXC)',
        'home.labStat3': 'DNS e VPN com Tailscale e AdGuard',
        'home.labStat4': 'Consumo médio total &lt; 40W',
        'home.labBtn': 'Conhecer a Arquitetura do Laboratório →',
        'home.skillsTitle': 'Competências Técnicas',
        'home.skillCat1': 'Sistemas Operacionais',
        'home.skillCat2': 'Redes &amp; Segurança',
        'home.skillCat3': 'Virtualização &amp; Cloud',
        'home.skillCat4': 'Ferramentas &amp; Código',
        'home.skillsBtn': 'Ver Histórico de Formação e Certificações →',

        // Homepage - About Section
        'home.aboutLabel': 'Perfil Profissional',
        'home.aboutHeading': 'Sobre Mim<span class="text-accent">.</span>',
        'home.aboutLocation': 'Santa Maria, RS',
        'home.aboutP1': 'Acredito que soluções eficazes não precisam ser excessivamente complexas. Minha trajetória combina atuação prática desde 2019 em suporte técnico, infraestrutura de redes, eletrônica e consultoria de TI com o desenvolvimento de softwares próprios e um laboratório doméstico em operação contínua — sempre buscando identificar a causa-raiz de cada problema e implementar soluções limpas, confiáveis e bem documentadas.',
        'home.aboutP2': 'Graduado em <strong>Análise e Desenvolvimento de Sistemas (UNIASSELVI, 2025)</strong>, gosto de explorar sistemas computacionais, elétricos e automotivos para entender como cada detalhe funciona, por que funciona e como pode ser melhorado.',
        'home.aboutBtn': 'Trajetória Completa e Certificações',

        // Homepage - Contact Section
        'home.contactHeading': 'Vamos conversar<span class="text-accent">?</span>',
        'home.contactDesc': 'Precisa de apoio em infraestrutura, diagnóstico técnico, projetos de rede ou quer trocar uma ideia sobre tecnologia e sistemas? Entre em contato diretamente por e-mail ou pelo LinkedIn.',
        'home.contactBtnLinkedin': 'Conectar no LinkedIn',

        // Projects Catalog Page (projects.html)
        'projects.title': 'Projetos | João Figueiró',
        'projects.heading': 'Projetos<span class="text-accent">.</span>',
        'projects.subtitle': 'Aqui você encontra uma seleção de sistemas, utilitários, modificações e experimentos que desenvolvi.',
        'projects.filterAll': 'Todos',
        'projects.filterSoftware': 'Software &amp; Sistemas',
        'projects.filterInfra': 'Infraestrutura &amp; Hardware',
        'projects.filterAutomotive': 'Automotivo &amp; Embarcados',
        'projects.filterOther': 'Outros Experimentos',

        // About Page (aboutme.html)
        'about.title': 'Sobre Mim | João Figueiró',
        'about.heading': 'Sobre Mim<span class="text-accent">.</span>',
        'about.subtitle': 'Conheça um pouco mais sobre minha história, formação profissional e visão sobre tecnologia.',
        'about.introTitle': 'Quem sou eu',
        'about.eduTitle': 'Formação Acadêmica',
        'about.expTitle': 'Experiência Profissional',
        'about.skillsTitle': 'Habilidades &amp; Competências',
        'about.downloadResume': 'Baixar Currículo em PDF',

        // UltimateLab Page (ultimatelab.html)
        'lab.title': 'UltimateLab | João Figueiró',
        'lab.heading': 'UltimateLab<span class="text-accent">.</span>',
        'lab.subtitle': 'Meu laboratório pessoal de virtualização, redes e automação doméstica.',
        'lab.overviewTitle': 'Visão Geral do Cluster',
        'lab.hardwareTitle': 'Hardware &amp; Infraestrutura Física',
        'lab.servicesTitle': 'Serviços em Execução',
        'lab.networkTitle': 'Topologia de Rede &amp; Segurança',

        // Services Page (services.html)
        'services.title': 'Serviços | João Figueiró',
        'services.heading': 'Serviços &amp; Consultoria<span class="text-accent">.</span>',
        'services.subtitle': 'Soluções personalizadas em infraestrutura de TI, redes e suporte corporativo.',
        // Status Page (/status)
        'status.pageTitle': 'Status de Serviços e Infraestrutura | João Figueiró',
        'status.secLabel': 'Monitoramento em Tempo Real',
        'status.heading': 'Status de Serviços &amp; Infraestrutura<span class="text-accent">.</span>',
        'status.subtitle': 'Disponibilidade dos nós do cluster, serviços self-hosted em produção e conectividade de provedores externos da nuvem.',
        'status.badgeOperational': 'Todos os Sistemas Operacionais',
        'status.badgeDegraded': 'Degradação ou Instabilidade Detectada',
        'status.badgeOffline': 'Interrupção de Serviços Detectada',
        'status.badgeUnavailable': 'Telemetria Indisponível',
        'status.lastUpdated': 'Última atualização',
        'status.autoRefreshNote': 'Atualização automática a cada 45s',
        'status.refreshBtnTitle': 'Atualizar agora',
        'status.kpiNodesTitle': 'Nós do Cluster',
        'status.kpiNodesSub': 'Nós ativos no Proxmox',
        'status.kpiServicesTitle': 'Serviços em Execução',
        'status.kpiServicesSub': 'Containers &amp; VMs em produção',
        'status.kpiAvailabilityTitle': 'Disponibilidade Global',
        'status.kpiAvailabilitySub': 'Índice médio de disponibilidade',
        'status.infraTitle': 'Infraestrutura Local &amp; Cluster',
        'status.thirdPartyTitle': 'Provedores Externos &amp; Cloud',
        'status.checkerTitle': 'Verificador de Disponibilidade de Sites',
        'status.checkerSub': 'Verifique em tempo real a resolução DNS, handshake TCP, status HTTP e validade de certificado TLS de qualquer endereço web.',
        'status.checkerPlaceholder': 'https://www.exemplo.com.br',
        'status.btnCheck': 'Verificar agora',
        'status.btnChecking': 'Verificando...',
        'status.lblTarget': 'Alvo',
        'status.lblStatus': 'Classificação',
        'status.lblDns': 'Resolução DNS',
        'status.lblTcp': 'Conexão TCP',
        'status.lblHttp': 'Status HTTP',
        'status.lblTls': 'Certificado TLS',
        'status.lblLatency': 'Latência',
        'status.btnExternalCheck': 'Validar no IsItDownRightNow →',
        'status.toolsTitle': 'Ferramentas Rápidas &amp; Mapas Globais de Ameaças',
        'status.toolsSub': 'Serviços recomendados para medição de banda, diagnóstico de vazamento de DNS e mapas globais de ciberataques em tempo real.',
        'status.toolSpeedtestDesc': 'Teste de velocidade de conexão, latência e jitter de banda larga.',
        'status.toolDowndetectorDesc': 'Relatos de instabilidade e quedas em serviços e operadoras em tempo real.',
        'status.toolIpleakDesc': 'Detecção de vazamentos de DNS, WebRTC, IPv6 e informações de IP.',
        'status.toolUrlscanDesc': 'Scanner e analisador de segurança para websites e domínios suspeitos.',
        'status.toolCheckpointDesc': 'Visualização ao vivo de ataques cibernéticos e vetores de ameaças no globo.',
        'status.toolKasperskyDesc': 'Mapa 3D interativo de incidentes de malware e ciberataques em tempo real.',
        'status.toolIsitdownDesc': 'Verificação independente para saber se um site caiu só para você ou para todos.',
        'status.errRateLimit': 'Limite de requisições excedido (Rate limit). Por favor, aguarde alguns instantes antes de tentar novamente.',
        'status.errInvalidUrl': 'URL inválida ou bloqueada para verificação.',
        'status.errFetchFailed': 'Falha na comunicação com a API de verificação. Tente novamente.',
        'status.okBadge': 'Operacional',
        'status.degradedBadge': 'Instável',
        'status.offlineBadge': 'Inoperante',
        'status.validTls': 'Válido',
        'status.invalidTls': 'Inválido / N/A',
        'status.expiresOn': 'expira em',

    },

    en: {
        // Navigation
        'nav.brand': 'João Figueiró',
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.lab': 'Lab',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.theme': 'Toggle Theme',
        'nav.lang': 'Language selection',

        // Footer
        'footer.rights': 'All rights reserved.',
        'footer.powered': 'Powered by',

        // Common
        'common.backToProjects': 'Back to Projects',
        'common.readFullStory': 'Read Full Story',
        'common.exploreSoftware': 'Explore Software',
        'common.viewLab': 'View in Lab',
        'common.exploreAll': 'Explore Full Projects Catalog →',
        'common.aboutMe': 'About Me',
        'common.viewProjects': 'View Projects',
        'common.laboratory': 'Laboratory',
        'common.contact': 'Contact',
        'common.github': 'GitHub',
        'common.sourceCode': 'Source Code on GitHub',

        // 404 Page
        '404.title': '404 - Page Not Found | João Figueiró',
        '404.badge': '404',
        '404.heading': 'Houston, we have a problem!',
        '404.desc': 'The page you are looking for got sucked into a black hole, lost connection to the DNS server, or simply never existed in this universe.',
        '404.btnHome': 'Back to Homepage',
        '404.btnProjects': 'View Projects',

        // Homepage - Hero
        'home.title': 'João Figueiró | IT Analyst, Infrastructure & Automation',
        'home.tagline': '> Gadget builder, gearhead and tech enthusiast_',
        'home.heroPositioning': 'Turning technical challenges into reliable infrastructure, lean software and practical automation.',
        'home.heroLead': '<strong>IT Analyst</strong> specializing in infrastructure, technical support and operations — working across networking, Proxmox VE virtualization, Windows and Linux environments, and open-source tooling.',
        'home.btnProjects': 'View Projects',
        'home.btnAbout': 'About Me',
        'home.btnLab': 'Laboratory',

        // Homepage - Pillars / Areas
        'home.pillarsLabel': 'Specialties &amp; Focus Areas',
        'home.pillarsHeading': 'From support to automation<span class="text-accent">:</span> what I build and operate',
        'home.pillar1Title': 'Technical Support &amp; IT Operations',
        'home.pillar1Desc': 'L1 to L3 helpdesk resolution, preventive and corrective hardware maintenance, diagnostics and direct end-user workstation support.',
        'home.pillar1Tag1': 'Helpdesk &amp; Support',
        'home.pillar1Tag2': 'Hardware &amp; Diagnostics',
        'home.pillar2Title': 'Networking &amp; Infrastructure',
        'home.pillar2Desc': 'CAT6 structured cabling, managed switches, routers, enterprise Wi-Fi, VPNs (WireGuard &amp; Tailscale) and security with firewalls and DNS sinkholes.',
        'home.pillar2Tag1': 'Cisco Meraki &amp; CAT6',
        'home.pillar2Tag2': 'WireGuard &amp; Tailscale',
        'home.pillar3Title': 'Virtualization &amp; Homelab',
        'home.pillar3Desc': '2-node Proxmox VE virtualization cluster with replication, Docker &amp; LXC containers, continuous monitoring and automated backups for core services.',
        'home.pillar3Tag1': 'Proxmox VE Cluster',
        'home.pillar3Tag2': 'Docker &amp; LXC',
        'home.pillar4Title': 'Custom Software &amp; Reverse Engineering',
        'home.pillar4Desc': 'Custom utilities in Go, Rust, PowerShell and Bash, microcontroller integrations (Arduino) and embedded firmware reverse engineering.',
        'home.pillar4Tag1': 'Go &amp; PowerShell',
        'home.pillar4Tag2': 'Embedded Systems',

        // Homepage - Featured Projects
        'home.featuredLabel': 'Selected Technical Portfolio',
        'home.featuredHeading': 'Featured Projects &amp; Software<span class="text-accent">.</span>',
        'home.featuredDesc': 'Self-hosted systems, maintenance utilities, embedded engineering and the homelab cluster — built with a focus on efficiency, clean code and real-world utility.',
        'home.featuredAllBtn': 'Explore Full Projects Catalog →',

        // Homepage - Lab & Skills
        'home.labSkillsLabel': 'Live Infrastructure &amp; Tech Stack',
        'home.labTitle': 'UltimateLab<span class="text-accent">:</span> Where theory becomes continuous live infrastructure',
        'home.labDesc': 'The <strong>UltimateLab</strong> is my virtualization and testing homelab. Far more than a hobby, it is the sandbox where I experiment with new technologies, simulate enterprise network topologies and run daily services — including the infrastructure serving this website.',
        'home.labStat1': '2-node Proxmox VE virtualization cluster',
        'home.labStat2': 'Production services (Docker + LXC)',
        'home.labStat3': 'DNS &amp; VPN via Tailscale and AdGuard',
        'home.labStat4': 'Total average draw &lt; 40W',
        'home.labBtn': 'Explore Lab Architecture →',
        'home.skillsTitle': 'Technical Skills',
        'home.skillCat1': 'Operating Systems',
        'home.skillCat2': 'Networking &amp; Security',
        'home.skillCat3': 'Virtualization &amp; Cloud',
        'home.skillCat4': 'Tooling &amp; Code',
        'home.skillsBtn': 'View Background &amp; Certifications →',

        // Homepage - About Section
        'home.aboutLabel': 'Professional Profile',
        'home.aboutHeading': 'About Me<span class="text-accent">.</span>',
        'home.aboutLocation': 'Santa Maria, RS, Brazil',
        'home.aboutP1': 'I believe effective solutions don\'t need to be needlessly complex. My journey combines hands-on experience since 2019 in technical support, network infrastructure, electronics and IT consulting with custom software development and a homelab operating around the clock — always focused on identifying root causes and delivering clean, reliable, well-documented solutions.',
        'home.aboutP2': 'Graduated in <strong>Systems Analysis and Development (UNIASSELVI, 2025)</strong>, I love exploring computing, electrical and automotive systems to understand how every detail works, why it works, and how to improve it.',
        'home.aboutBtn': 'Full Background &amp; Certifications',

        // Homepage - Contact Section
        'home.contactHeading': 'Let\'s talk<span class="text-accent">?</span>',
        'home.contactDesc': 'Need support with infrastructure, technical troubleshooting, networking projects, or want to discuss technology and systems? Get in touch directly via email or LinkedIn.',
        'home.contactBtnLinkedin': 'Connect on LinkedIn',

        // Projects Catalog Page (projects.html)
        'projects.title': 'Projects | João Figueiró',
        'projects.heading': 'Projects<span class="text-accent">.</span>',
        'projects.subtitle': 'Here you will find a curated selection of systems, utilities, mods and experiments I have built.',
        'projects.filterAll': 'All',
        'projects.filterSoftware': 'Software &amp; Systems',
        'projects.filterInfra': 'Infrastructure &amp; Hardware',
        'projects.filterAutomotive': 'Automotive &amp; Embedded',
        'projects.filterOther': 'Other Experiments',

        // About Page (aboutme.html)
        'about.title': 'About Me | João Figueiró',
        'about.heading': 'About Me<span class="text-accent">.</span>',
        'about.subtitle': 'Learn more about my background, technical education, and philosophy on technology.',
        'about.introTitle': 'Who I am',
        'about.eduTitle': 'Academic Education',
        'about.expTitle': 'Professional Experience',
        'about.skillsTitle': 'Skills &amp; Competencies',
        'about.downloadResume': 'Download Resume (PDF)',

        // UltimateLab Page (ultimatelab.html)
        'lab.title': 'UltimateLab | João Figueiró',
        'lab.heading': 'UltimateLab<span class="text-accent">.</span>',
        'lab.subtitle': 'My personal homelab for virtualization, networking, and home automation.',
        'lab.overviewTitle': 'Cluster Overview',
        'lab.hardwareTitle': 'Hardware &amp; Physical Infrastructure',
        'lab.servicesTitle': 'Running Services',
        'lab.networkTitle': 'Network Topology &amp; Security',

        // Services Page (services.html)
        'services.title': 'Services | João Figueiró',
        'services.heading': 'Services &amp; Consulting<span class="text-accent">.</span>',
        'services.subtitle': 'Custom solutions in IT infrastructure, networking, and enterprise support.',
        // Status Page (/status)
        'status.pageTitle': 'Services &amp; Infrastructure Status | João Figueiró',
        'status.secLabel': 'Real-Time Telemetry &amp; Monitoring',
        'status.heading': 'Services &amp; Infrastructure Status<span class="text-accent">.</span>',
        'status.subtitle': 'Availability of cluster nodes, self-hosted production services, and external cloud provider connectivity.',
        'status.badgeOperational': 'All Systems Operational',
        'status.badgeDegraded': 'Degraded Performance Detected',
        'status.badgeOffline': 'Service Outage Detected',
        'status.badgeUnavailable': 'Telemetry Unavailable',
        'status.lastUpdated': 'Last updated',
        'status.autoRefreshNote': 'Auto-refreshes every 45s',
        'status.refreshBtnTitle': 'Refresh now',
        'status.kpiNodesTitle': 'Cluster Nodes',
        'status.kpiNodesSub': 'Active Proxmox nodes',
        'status.kpiServicesTitle': 'Running Services',
        'status.kpiServicesSub': 'Production containers &amp; VMs',
        'status.kpiAvailabilityTitle': 'Overall Availability',
        'status.kpiAvailabilitySub': 'Average uptime score',
        'status.infraTitle': 'Local Infrastructure &amp; Cluster',
        'status.thirdPartyTitle': 'External Providers &amp; Cloud',
        'status.checkerTitle': 'Live Website Availability Checker',
        'status.checkerSub': 'Test real-time DNS resolution, TCP handshake, HTTP status code, and TLS certificate validity for any web address.',
        'status.checkerPlaceholder': 'https://www.example.com',
        'status.btnCheck': 'Check now',
        'status.btnChecking': 'Checking...',
        'status.lblTarget': 'Target',
        'status.lblStatus': 'Classification',
        'status.lblDns': 'DNS Resolution',
        'status.lblTcp': 'TCP Connection',
        'status.lblHttp': 'HTTP Status',
        'status.lblTls': 'TLS Certificate',
        'status.lblLatency': 'Latency',
        'status.btnExternalCheck': 'Validate on IsItDownRightNow →',
        'status.toolsTitle': 'Quick Tools &amp; Global Threat Maps',
        'status.toolsSub': 'Recommended services for speed tests, DNS leak diagnostics, and global real-time cyberattack threat maps.',
        'status.toolSpeedtestDesc': 'Connection speed test, broadband latency and jitter analysis.',
        'status.toolDowndetectorDesc': 'Real-time crowdsourced reports on service and provider outages.',
        'status.toolIpleakDesc': 'Diagnostics for DNS leaks, WebRTC address exposure, and IPv6.',
        'status.toolUrlscanDesc': 'Automated security scanner and behavioral analyzer for websites.',
        'status.toolCheckpointDesc': 'Live visualization of global cyberattacks and threat vectors.',
        'status.toolKasperskyDesc': 'Interactive 3D real-time globe of malware detections and cyber threats.',
        'status.toolIsitdownDesc': 'Independent check to see if a website is down for everyone or just you.',
        'status.errRateLimit': 'Rate limit exceeded. Please wait a few moments before trying again.',
        'status.errInvalidUrl': 'Invalid or restricted URL for verification.',
        'status.errFetchFailed': 'Failed to communicate with verification API. Please retry.',
        'status.okBadge': 'Operational',
        'status.degradedBadge': 'Degraded',
        'status.offlineBadge': 'Offline',
        'status.validTls': 'Valid',
        'status.invalidTls': 'Invalid / N/A',
        'status.expiresOn': 'expires on',

    }
};

window.SITE_I18N = {
    currentLang: 'pt',
    translations: SITE_TRANSLATIONS,

    t(key) {
        const lang = this.currentLang;
        if (this.translations[lang] && this.translations[lang][key]) {
            return this.translations[lang][key];
        }
        if (this.translations['pt'] && this.translations['pt'][key]) {
            return this.translations['pt'][key];
        }
        return key;
    },

    setLanguage(lang) {
        const targetLang = (lang === 'en') ? 'en' : 'pt';
        this.currentLang = targetLang;
        document.documentElement.setAttribute('lang', targetLang === 'en' ? 'en' : 'pt-br');
        localStorage.setItem('site_lang', targetLang);

        // Update plain text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.t(key);
            if (text) {
                el.textContent = text;
            }
        });

        // Update HTML elements (containing markup or icons)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const html = this.t(key);
            if (html) {
                el.innerHTML = html;
            }
        });

        // Update placeholder elements
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const placeholder = this.t(key);
            if (placeholder) {
                el.setAttribute('placeholder', placeholder);
            }
        });

        // Update title if exists
        const pageTitle = document.querySelector('title[data-i18n]');
        if (pageTitle) {
            const titleKey = pageTitle.getAttribute('data-i18n');
            document.title = this.t(titleKey);
        }

        // Update lang switcher buttons active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === targetLang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // Emit global event for dynamic components
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: targetLang } }));
    },

    init() {
        const savedLang = localStorage.getItem('site_lang') || 'pt';
        this.setLanguage(savedLang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }
};

// Immediate early initialization if document is already loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.SITE_I18N.init());
} else {
    window.SITE_I18N.init();
}
