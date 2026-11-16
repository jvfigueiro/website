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
        'common.repo': 'Repositório',
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
        'home.title': 'João Figueiró | Analista de TI, Infraestrutura & Projetos Técnicos',
        'home.tagline': '> Construtor de engenhocas, gearhead e maluco da informática_',
        'home.heroPositioning': 'Transformando problemas técnicos em infraestrutura confiável, software enxuto e automação prática.',
        'home.heroLead': '<strong>Analista de TI</strong> com foco em infraestrutura, suporte técnico e operações — atuando em redes, virtualização com Proxmox VE, sistemas Windows e Linux e desenvolvimento de ferramentas de código aberto.',
        'home.btnProjects': 'Ver Projetos',
        'home.btnAbout': 'Sobre Mim',
        'home.btnLab': 'Laboratório',

        // Homepage - Pillars / Areas
        'home.pillarsLabel': 'Áreas de Atuação',
        'home.pillarsHeading': 'Frentes Técnicas<span class="text-accent">.</span>',
        'home.pillarsSub': 'Da infraestrutura física e conectividade de rede ao desenvolvimento de utilitários e automação.',
        'home.pillar1Title': 'Infraestrutura & Redes',
        'home.pillar1Desc': 'Cabeamento estruturado CAT6, montagem de racks, switches gerenciáveis, segmentação por VLANs, VPNs (WireGuard e Tailscale) e DNS criptografado com AdGuard Home (DoH/DoT).',
        'home.pillar1Tag1': 'Helpdesk & Suporte',
        'home.pillar1Tag2': 'Hardware & Diagnóstico',
        'home.pillar2Title': 'Servidores & Virtualização',
        'home.pillar2Desc': 'Cluster de 2 nós em Proxmox VE, consolidação de máquinas virtuais e containers Docker, compartilhamento SMB sobre dataset ZFS e serviços self-hosted com eficiência de energia.',
        'home.pillar2Tag1': 'Cisco Meraki & CAT6',
        'home.pillar2Tag2': 'WireGuard & Tailscale',
        'home.pillar3Title': 'Diagnóstico & Operações',
        'home.pillar3Desc': 'Investigação de causa-raiz, diagnóstico de incidentes de hardware e software, manutenção e otimização de ambientes Windows e Linux e administração de Windows Server e Active Directory.',
        'home.pillar3Tag1': 'Cluster Proxmox VE',
        'home.pillar3Tag2': 'Docker & LXC',
        'home.pillar4Title': 'Software, IoT & Automação',
        'home.pillar4Desc': 'Ferramentas e aplicações de código aberto, automação e monitoramento com Home Assistant, Prometheus e Grafana, leitura de sensores via Arduino, telemetria OBD2 e engenharia reversa de firmware.',
        'home.pillar4Tag1': 'Go & PowerShell',
        'home.pillar4Tag2': 'Sistemas Embarcados',

        // Homepage - Featured Projects
        'home.featuredLabel': 'Portfólio Selecionado',
        'home.featuredHeading': 'Projetos & Softwares em Destaque<span class="text-accent">.</span>',
        'home.featuredSub': 'Aplicações próprias, estudos de sistemas e infraestrutura documentada de ponta a ponta.',
        'home.featuredDesc': 'Sistemas self-hosted, utilitários de manutenção, projetos embarcados e o cluster do laboratório doméstico — desenvolvidos com foco em eficiência, código limpo e utilidade real.',
        'home.featuredTopBtn': 'Ver Todos os Projetos',
        'home.featuredAllBtn': 'Explorar Catálogo Completo de Projetos →',

        // Homepage - Lab & Skills
        'home.labSkillsLabel': 'Infraestrutura Viva & Stack Técnica',
        'home.labSkillsHeading': 'Laboratório & Competências<span class="text-accent">.</span>',
        'home.labSkillsSub': 'As tecnologias aplicadas no dia a dia e o ambiente real onde os serviços e experimentos rodam 24/7.',
        'home.labTitle': '<i class="fas fa-server" aria-hidden="true"></i> Por Dentro do UltimateLab',
        'home.labDesc': 'Cluster de 2 nós computacionais em mini PCs rodando <strong>Proxmox VE</strong>, projetado para oferecer redundância de funcionamento e baixo consumo de energia — hospedando inclusive este site.',
        'home.labStat1': 'Cluster de 2 nós de virtualização Proxmox VE',
        'home.labStat2': 'Serviços em produção (Docker + LXC)',
        'home.labStat3': 'DNS e VPN com Tailscale e AdGuard',
        'home.labStat4': 'Consumo médio total < 40W',
        'home.labBtn': 'Ver Topologia de Rede e Hardware Completo',
        'home.skillsTitle': '<i class="fas fa-terminal" aria-hidden="true"></i> Competências Técnicas',
        'home.skillCat1': 'Sistemas Operacionais',
        'home.skillCat2': 'Redes & Segurança',
        'home.skillCat3': 'Virtualização & Cloud',
        'home.skillCat4': 'Ferramentas & Código',
        'home.skillsBtn': 'Ver Histórico de Formação e Certificações →',
        'home.skillsBtnEdu': 'Formação & Certificados',
        'home.skillsBtnServices': 'Áreas de Consultoria',

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
        'projects.sub': 'Um repositório contínuo de aventuras em infraestrutura, redes, eletrônica e mods de hardware.',
        'projects.subtitle': 'Aqui você encontra uma seleção de sistemas, utilitários, modificações e experimentos que desenvolvi.',
        'projects.softHeading': 'Softwares<span class="text-accent">.</span>',
        'projects.softSub': 'Aplicações, utilitários e ferramentas de código aberto desenvolvidos para automação de sistemas, produtividade e entretenimento.',
        'projects.filterAll': 'Todos',
        'projects.filterSoftware': 'Software & Sistemas',
        'projects.filterInfra': 'Infraestrutura & Hardware',
        'projects.filterAutomotive': 'Automotivo & Embarcados',
        'projects.filterOther': 'Outros Experimentos',

        // About Page (aboutme.html)
        'about.title': 'Sobre Mim | João Figueiró',
        'about.heading': 'Sobre Mim<span class="text-accent">.</span>',
        'about.subtitle': 'Conheça um pouco mais sobre minha história, formação profissional e visão sobre tecnologia.',
        'about.introTitle': 'Quem sou eu',
        'about.eduTitle': 'Formação Acadêmica',
        'about.expTitle': 'Experiência Profissional',
        'about.skillsTitle': 'Habilidades & Competências',
        'about.downloadResume': 'Baixar Currículo em PDF',

        // UltimateLab Page (ultimatelab.html)
        'lab.title': 'UltimateLab | João Figueiró',
        'lab.heading': 'UltimateLab<span class="text-accent">.</span>',
        'lab.subtitle': 'Meu laboratório pessoal de virtualização, redes e automação doméstica.',
        'lab.overviewTitle': 'Visão Geral do Cluster',
        'lab.hardwareTitle': 'Hardware & Infraestrutura Física',
        'lab.servicesTitle': 'Serviços em Execução',
        'lab.networkTitle': 'Topologia de Rede & Segurança',

        // Services Page (services.html)
        'services.title': 'Serviços | João Figueiró',
        'services.heading': 'Serviços & Consultoria<span class="text-accent">.</span>',
        'services.subtitle': 'Soluções personalizadas em infraestrutura de TI, redes e suporte corporativo.',

        // Status Page (/status)
        'status.pageTitle': 'Status de Serviços e Infraestrutura | João Figueiró',
        'status.secLabel': 'Monitoramento em Tempo Real',
        'status.heading': 'Status de Serviços & Infraestrutura<span class="text-accent">.</span>',
        'status.subtitle': 'Disponibilidade dos nós do cluster, serviços self-hosted em produção e conectividade de provedores externos da nuvem.',
        'status.badgeOperational': 'Todos os Sistemas Operacionais',
        'status.badgeDegraded': 'Degradação ou Instabilidade Detectada',
        'status.badgeOffline': 'Interrupção de Serviços Detectada',
        'status.badgeUnavailable': 'Telemetria temporariamente indisponível',
        'status.lastUpdated': 'Última atualização',
        'status.autoRefreshNote': 'Atualização automática a cada 45s',
        'status.refreshBtnTitle': 'Atualizar agora',
        'status.kpiNodesTitle': 'Nós do Cluster',
        'status.kpiNodesSub': 'Nós ativos no Proxmox',
        'status.kpiServicesTitle': 'Serviços em Execução',
        'status.kpiServicesSub': 'Containers & VMs em produção',
        'status.kpiAvailabilityTitle': 'Disponibilidade Global',
        'status.kpiAvailabilitySub': 'Índice médio de disponibilidade',
        'status.infraTitle': 'Infraestrutura Local & Cluster',
        'status.thirdPartyTitle': 'Provedores Externos & Cloud',
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
        'status.lblIsp': 'Provedor / ASN',
        'status.lblCountry': 'Localização',
        'status.btnExternalCheck': 'Validar no IsItDownRightNow →',
        'status.connTitle': 'Sua Conexão Atual',
        'status.connSub': 'Diagnóstico rápido do seu endereço público e provedor de acesso (via IPLeak.net).',
        'status.connIp': 'Endereço IP Público',
        'status.connIsp': 'Provedor / Operadora',
        'status.connLocation': 'Localização',
        'status.connLoading': 'Identificando conexão...',
        'status.connUnavailable': 'Informações de conexão indisponíveis no navegador',
        'status.cybermapTitle': 'Kaspersky Cyberthreat Real-Time Map',
        'status.cybermapSub': 'Visualização interativa em tempo real de incidentes e fluxos globais de ciberameaças (carregado sob demanda para economizar dados e GPU).',
        'status.cybermapLoadBtn': 'Carregar mapa ao vivo',
        'status.cybermapCloseBtn': 'Ocultar mapa',
        'status.toolsTitle': 'Ferramentas Rápidas & Mapas Globais de Ameaças',
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
        'status.errFetchFailed': 'Aguardando conexão com a API. Tente novamente em instantes.',
        'status.okBadge': 'Operacional',
        'status.degradedBadge': 'Instável',
        'status.offlineBadge': 'Inoperante',
        'status.validTls': 'Válido',
        'status.invalidTls': 'Inválido / N/A',
        'status.expiresOn': 'expira em'
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
        'common.repo': 'Repository',
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
        'home.title': 'João Figueiró | IT Analyst, Infrastructure & Technical Projects',
        'home.tagline': '> Gadget builder, gearhead and tech enthusiast_',
        'home.heroPositioning': 'Turning technical challenges into reliable infrastructure, lean software and practical automation.',
        'home.heroLead': '<strong>IT Analyst</strong> specializing in infrastructure, technical support and operations — working across networking, Proxmox VE virtualization, Windows and Linux environments, and open-source tooling.',
        'home.btnProjects': 'View Projects',
        'home.btnAbout': 'About Me',
        'home.btnLab': 'Laboratory',

        // Homepage - Pillars / Areas
        'home.pillarsLabel': 'Focus Areas',
        'home.pillarsHeading': 'Technical Focus Areas<span class="text-accent">.</span>',
        'home.pillarsSub': 'From physical infrastructure and network connectivity to utility software and automation.',
        'home.pillar1Title': 'Infrastructure & Networking',
        'home.pillar1Desc': 'CAT6 structured cabling, rack assembly, managed switches, VLAN segmentation, VPNs (WireGuard and Tailscale), and encrypted DNS via AdGuard Home (DoH/DoT).',
        'home.pillar1Tag1': 'Helpdesk & Support',
        'home.pillar1Tag2': 'Hardware & Diagnostics',
        'home.pillar2Title': 'Servers & Virtualization',
        'home.pillar2Desc': '2-node Proxmox VE cluster, consolidation of virtual machines and Docker containers, SMB file sharing over ZFS datasets, and energy-efficient self-hosted services.',
        'home.pillar2Tag1': 'Cisco Meraki & CAT6',
        'home.pillar2Tag2': 'WireGuard & Tailscale',
        'home.pillar3Title': 'Diagnostics & Operations',
        'home.pillar3Desc': 'Root-cause investigation, hardware and software incident troubleshooting, maintenance and optimization of Windows and Linux environments, and Windows Server/Active Directory administration.',
        'home.pillar3Tag1': 'Proxmox VE Cluster',
        'home.pillar3Tag2': 'Docker & LXC',
        'home.pillar4Title': 'Software, IoT & Automation',
        'home.pillar4Desc': 'Open-source tools and applications, automation and monitoring with Home Assistant, Prometheus, and Grafana, Arduino sensor reading, OBD2 telemetry, and firmware reverse engineering.',
        'home.pillar4Tag1': 'Go & PowerShell',
        'home.pillar4Tag2': 'Embedded Systems',

        // Homepage - Featured Projects
        'home.featuredLabel': 'Selected Portfolio',
        'home.featuredHeading': 'Featured Projects & Software<span class="text-accent">.</span>',
        'home.featuredSub': 'Proprietary software, system studies, and end-to-end documented infrastructure.',
        'home.featuredDesc': 'Self-hosted systems, maintenance utilities, embedded engineering and the homelab cluster — built with a focus on efficiency, clean code and real-world utility.',
        'home.featuredTopBtn': 'View All Projects',
        'home.featuredAllBtn': 'Explore Full Projects Catalog →',

        // Homepage - Lab & Skills
        'home.labSkillsLabel': 'Live Infrastructure & Tech Stack',
        'home.labSkillsHeading': 'Laboratory & Skills<span class="text-accent">.</span>',
        'home.labSkillsSub': 'Technologies applied daily and the real-world environment where services and experiments run 24/7.',
        'home.labTitle': '<i class="fas fa-server" aria-hidden="true"></i> Inside UltimateLab',
        'home.labDesc': '2-node mini PC compute cluster running <strong>Proxmox VE</strong>, designed for operational redundancy and low power consumption — hosting this website as well.',
        'home.labStat1': '2-node Proxmox VE virtualization cluster',
        'home.labStat2': 'Production services (Docker + LXC)',
        'home.labStat3': 'DNS & VPN via Tailscale and AdGuard',
        'home.labStat4': 'Total average draw < 40W',
        'home.labBtn': 'View Complete Network Topology & Hardware',
        'home.skillsTitle': '<i class="fas fa-terminal" aria-hidden="true"></i> Technical Skills',
        'home.skillCat1': 'Operating Systems',
        'home.skillCat2': 'Networking & Security',
        'home.skillCat3': 'Virtualization & Cloud',
        'home.skillCat4': 'Tooling & Code',
        'home.skillsBtn': 'View Background & Certifications →',
        'home.skillsBtnEdu': 'Education & Certificates',
        'home.skillsBtnServices': 'Consulting Areas',

        // Homepage - About Section
        'home.aboutLabel': 'Professional Profile',
        'home.aboutHeading': 'About Me<span class="text-accent">.</span>',
        'home.aboutLocation': 'Santa Maria, RS, Brazil',
        'home.aboutP1': 'I believe effective solutions don\'t need to be needlessly complex. My journey combines hands-on experience since 2019 in technical support, network infrastructure, electronics and IT consulting with custom software development and a homelab operating around the clock — always focused on identifying root causes and delivering clean, reliable, well-documented solutions.',
        'home.aboutP2': 'Graduated in <strong>Systems Analysis and Development (UNIASSELVI, 2025)</strong>, I love exploring computing, electrical and automotive systems to understand how every detail works, why it works, and how to improve it.',
        'home.aboutBtn': 'Full Background & Certifications',

        // Homepage - Contact Section
        'home.contactHeading': 'Let\'s talk<span class="text-accent">?</span>',
        'home.contactDesc': 'Need support with infrastructure, technical troubleshooting, networking projects, or want to discuss technology and systems? Get in touch directly via email or LinkedIn.',
        'home.contactBtnLinkedin': 'Connect on LinkedIn',

        // Projects Catalog Page (projects.html)
        'projects.title': 'Projects | João Figueiró',
        'projects.heading': 'Projects<span class="text-accent">.</span>',
        'projects.sub': 'An ongoing repository of adventures in infrastructure, networking, electronics, and hardware mods.',
        'projects.subtitle': 'Here you will find a curated selection of systems, utilities, mods and experiments I have built.',
        'projects.softHeading': 'Software<span class="text-accent">.</span>',
        'projects.softSub': 'Open-source applications, utilities, and tools developed for system automation, productivity, and entertainment.',
        'projects.filterAll': 'All',
        'projects.filterSoftware': 'Software & Systems',
        'projects.filterInfra': 'Infrastructure & Hardware',
        'projects.filterAutomotive': 'Automotive & Embedded',
        'projects.filterOther': 'Other Experiments',

        // About Page (aboutme.html)
        'about.title': 'About Me | João Figueiró',
        'about.heading': 'About Me<span class="text-accent">.</span>',
        'about.subtitle': 'Learn more about my background, technical education, and philosophy on technology.',
        'about.introTitle': 'Who I am',
        'about.eduTitle': 'Academic Education',
        'about.expTitle': 'Professional Experience',
        'about.skillsTitle': 'Skills & Competencies',
        'about.downloadResume': 'Download Resume (PDF)',

        // UltimateLab Page (ultimatelab.html)
        'lab.title': 'UltimateLab | João Figueiró',
        'lab.heading': 'UltimateLab<span class="text-accent">.</span>',
        'lab.subtitle': 'My personal homelab for virtualization, networking, and home automation.',
        'lab.overviewTitle': 'Cluster Overview',
        'lab.hardwareTitle': 'Hardware & Physical Infrastructure',
        'lab.servicesTitle': 'Running Services',
        'lab.networkTitle': 'Network Topology & Security',

        // Services Page (services.html)
        'services.title': 'Services | João Figueiró',
        'services.heading': 'Services & Consulting<span class="text-accent">.</span>',
        'services.subtitle': 'Custom solutions in IT infrastructure, networking, and enterprise support.',

        // Status Page (/status)
        'status.pageTitle': 'Services & Infrastructure Status | João Figueiró',
        'status.secLabel': 'Real-Time Telemetry & Monitoring',
        'status.heading': 'Services & Infrastructure Status<span class="text-accent">.</span>',
        'status.subtitle': 'Availability of cluster nodes, self-hosted production services, and external cloud provider connectivity.',
        'status.badgeOperational': 'All Systems Operational',
        'status.badgeDegraded': 'Degraded Performance Detected',
        'status.badgeOffline': 'Service Outage Detected',
        'status.badgeUnavailable': 'Telemetry temporarily unavailable',
        'status.lastUpdated': 'Last updated',
        'status.autoRefreshNote': 'Auto-refreshes every 45s',
        'status.refreshBtnTitle': 'Refresh now',
        'status.kpiNodesTitle': 'Cluster Nodes',
        'status.kpiNodesSub': 'Active Proxmox nodes',
        'status.kpiServicesTitle': 'Running Services',
        'status.kpiServicesSub': 'Production containers & VMs',
        'status.kpiAvailabilityTitle': 'Overall Availability',
        'status.kpiAvailabilitySub': 'Average uptime score',
        'status.infraTitle': 'Local Infrastructure & Cluster',
        'status.thirdPartyTitle': 'External Providers & Cloud',
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
        'status.lblIsp': 'Provider / ASN',
        'status.lblCountry': 'Location',
        'status.btnExternalCheck': 'Validate on IsItDownRightNow →',
        'status.connTitle': 'Your Current Connection',
        'status.connSub': 'Quick diagnostic of your public IP address and internet service provider (via IPLeak.net).',
        'status.connIp': 'Public IP Address',
        'status.connIsp': 'Provider / ISP',
        'status.connLocation': 'Location',
        'status.connLoading': 'Detecting connection...',
        'status.connUnavailable': 'Connection info unavailable in browser',
        'status.cybermapTitle': 'Kaspersky Cyberthreat Real-Time Map',
        'status.cybermapSub': 'Interactive real-time visualization of global cyberthreat incidents and flows (loaded on demand to save data and GPU).',
        'status.cybermapLoadBtn': 'Load live map',
        'status.cybermapCloseBtn': 'Hide map',
        'status.toolsTitle': 'Quick Tools & Global Threat Maps',
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
        'status.errFetchFailed': 'Waiting for API connection. Please try again shortly.',
        'status.okBadge': 'Operational',
        'status.degradedBadge': 'Degraded',
        'status.offlineBadge': 'Offline',
        'status.validTls': 'Valid',
        'status.invalidTls': 'Invalid / N/A',
        'status.expiresOn': 'expires on'
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
