/* ==========================================================================
   jvfigueiro.com - Services & Infrastructure Status Client Script (/status)
   ========================================================================== */

(function () {
    'use strict';

    // State
    let currentStatusData = null;
    let isStatusLoading = false;
    let isChecking = false;
    let lastCheckResult = null;
    let clientConnData = null;
    let clientConnFailed = false;

    // Helper: translate key using SITE_I18N
    const t = (key) => (window.SITE_I18N ? window.SITE_I18N.t(key) : key);
    const getLang = () => (window.SITE_I18N ? window.SITE_I18N.currentLang : (localStorage.getItem('site_lang') || 'pt'));

    // DOM Elements
    const globalStatusText = document.getElementById('globalStatusText');
    const globalStatusDot = document.getElementById('globalStatusDot');
    const statusUpdatedAt = document.getElementById('statusUpdatedAt');
    const btnRefreshStatus = document.getElementById('btnRefreshStatus');

    const kpiNodes = document.getElementById('kpiNodes');
    const kpiServices = document.getElementById('kpiServices');
    const kpiAvailability = document.getElementById('kpiAvailability');

    const thirdPartyList = document.getElementById('thirdPartyList');

    const clientConnContent = document.getElementById('clientConnContent');

    const checkForm = document.getElementById('checkerForm');
    const checkInput = document.getElementById('checkUrlInput');
    const checkBtn = document.getElementById('checkUrlBtn');
    const checkBtnText = document.getElementById('checkBtnText');
    const checkErrorBox = document.getElementById('checkErrorBox');
    const checkResultBox = document.getElementById('checkResultBox');

    // Clean domain helper
    function extractCleanDomain(rawUrl) {
        if (!rawUrl) return '';
        let clean = rawUrl.trim().toLowerCase();
        clean = clean.replace(/^https?:\/\//i, '');
        clean = clean.split('/')[0];
        clean = clean.split(':')[0]; // remove port if present
        return clean;
    }

    // Escape HTML helper for safe rendering
    function escapeHtml(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Helper: Badge generator
    function getStatusBadgeHtml(statusStr) {
        const s = (statusStr || '').toLowerCase();
        if (s === 'operational' || s === 'online' || s === 'up') {
            return `<span class="status-badge-pill status-badge-ok"><i class="fas fa-circle-check"></i> ${t('status.okBadge')}</span>`;
        }
        if (s === 'degraded' || s === 'warning' || s === 'unstable') {
            return `<span class="status-badge-pill status-badge-warn"><i class="fas fa-triangle-exclamation"></i> ${t('status.degradedBadge')}</span>`;
        }
        if (s === 'offline' || s === 'down' || s === 'outage') {
            return `<span class="status-badge-pill status-badge-err"><i class="fas fa-circle-xmark"></i> ${t('status.offlineBadge')}</span>`;
        }
        return `<span class="status-badge-pill status-badge-unknown"><i class="fas fa-circle-question"></i> ${escapeHtml(statusStr || 'N/A')}</span>`;
    }

    // Render Status Data
    function renderStatus(data) {
        currentStatusData = data;

        // 1. Global Banner
        if (globalStatusText) {
            const gStatus = (data.global_status || '').toLowerCase();

            if (gStatus === 'operational') {
                globalStatusText.textContent = t('status.badgeOperational');
            } else if (gStatus === 'degraded') {
                globalStatusText.textContent = t('status.badgeDegraded');
            } else if (gStatus === 'offline') {
                globalStatusText.textContent = t('status.badgeOffline');
            } else {
                globalStatusText.textContent = t('status.badgeUnavailable');
            }
        }
        if (globalStatusDot) {
            globalStatusDot.className = 'status-pulse-dot';
            const gStatus = (data.global_status || '').toLowerCase();
            if (gStatus === 'operational') {
                globalStatusDot.classList.add('status-dot-ok');
            } else if (gStatus === 'degraded') {
                globalStatusDot.classList.add('status-dot-warn');
            } else if (gStatus === 'offline') {
                globalStatusDot.classList.add('status-dot-err');
            } else {
                globalStatusDot.classList.add('status-dot-unknown');
            }
        }

        // Updated time
        if (statusUpdatedAt && data.updated_at) {
            try {
                const d = new Date(data.updated_at);
                statusUpdatedAt.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            } catch (e) {
                statusUpdatedAt.textContent = data.updated_at;
            }
        }

        // 2. Summary KPIs
        if (data.summary) {
            if (kpiNodes) {
                kpiNodes.textContent = `${data.summary.nodes_online ?? '--'} / ${data.summary.nodes_total ?? '--'}`;
            }
            if (kpiServices) {
                kpiServices.textContent = `${data.summary.services_online ?? '--'} / ${data.summary.services_total ?? '--'}`;
            }
            if (kpiAvailability) {
                const pct = data.summary.availability_pct != null ? `${data.summary.availability_pct}%` : '--%';
                kpiAvailability.textContent = pct;
            }
        }

        // 3. Third-Party List (rename AWS Health -> Amazon Web Services, Microsoft 365 -> Microsoft, exclude Slack if present)
        if (thirdPartyList && Array.isArray(data.third_party)) {
            const filteredThirdParty = data.third_party.filter(
                item => item && item.name && item.name.toLowerCase() !== 'slack'
            );
            thirdPartyList.innerHTML = filteredThirdParty.map(item => {
                let displayName = item.name;
                if (displayName === 'AWS Health') displayName = 'Amazon Web Services';
                if (displayName === 'Microsoft 365') displayName = 'Microsoft';
                return `
                    <div class="status-item-row">
                        <a href="${escapeHtml(item.url || '#')}" target="_blank" rel="noopener noreferrer" class="status-item-name" title="Ver status oficial de ${escapeHtml(displayName)}">
                            <i class="fas fa-cloud text-accent"></i> ${escapeHtml(displayName)}
                        </a>
                        ${getStatusBadgeHtml(item.status)}
                    </div>
                `;
            }).join('');
        }
    }

    // Render Error (Never claim operational without API response)
    function renderStatusError(err) {
        if (err) {
            console.warn('Status fetch error:', err);
        }
        currentStatusData = null;

        if (globalStatusText) {
            globalStatusText.textContent = t('status.badgeUnavailable');
        }
        if (globalStatusDot) {
            globalStatusDot.className = 'status-pulse-dot status-dot-warn';
        }

        if (statusUpdatedAt) {
            statusUpdatedAt.textContent = '--:--:--';
        }

        if (kpiNodes) kpiNodes.textContent = '-- / --';
        if (kpiServices) kpiServices.textContent = '-- / --';
        if (kpiAvailability) kpiAvailability.textContent = '--%';

        if (thirdPartyList) {
            thirdPartyList.innerHTML = `
                <div class="alert alert-secondary d-flex align-items-center mb-0 p-3" role="alert" style="border-radius: 0.65rem; grid-column: 1 / -1;">
                    <i class="fas fa-wifi text-secondary me-2 fs-5"></i>
                    <span class="small">${t('status.errFetchFailed')}</span>
                </div>
            `;
        }
    }

    // fetch with timeout (relative paths for backend API; custom timeout supported)
    const API_TIMEOUT_MS = 10000;
    async function apiFetch(path, options, timeoutMs) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), timeoutMs || API_TIMEOUT_MS);
        try {
            return await fetch(path, Object.assign({}, options, { signal: ctrl.signal }));
        } finally {
            clearTimeout(timer);
        }
    }

    // Fetch Status from Backend API
    async function fetchStatus() {
        if (isStatusLoading) return;
        isStatusLoading = true;

        if (btnRefreshStatus) {
            const icon = btnRefreshStatus.querySelector('i');
            if (icon) icon.classList.add('fa-spin');
        }

        try {
            const res = await apiFetch('/api/v1/status', {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            if (!data || typeof data !== 'object' || !data.global_status || !data.summary) {
                throw new Error('Invalid payload');
            }
            renderStatus(data);
        } catch (err) {
            renderStatusError(err);
        } finally {
            isStatusLoading = false;
            if (btnRefreshStatus) {
                const icon = btnRefreshStatus.querySelector('i');
                if (icon) icon.classList.remove('fa-spin');
            }
        }
    }

    // Client-Side Connection Diagnostics (IPLeak.net JSON API)
    function renderClientConnection() {
        if (!clientConnContent) return;

        if (clientConnFailed || !clientConnData) {
            clientConnContent.innerHTML = `
                <div class="text-secondary small d-flex align-items-center gap-2">
                    <i class="fas fa-circle-info text-accent" aria-hidden="true"></i>
                    <span>${t('status.connUnavailable')}</span>
                </div>
            `;
            return;
        }

        const ip = escapeHtml(clientConnData.ip || 'N/A');
        const isp = escapeHtml(clientConnData.isp_name || 'N/A');

        const locParts = [];
        if (clientConnData.city_name) locParts.push(clientConnData.city_name);
        if (clientConnData.region_name) locParts.push(clientConnData.region_name);
        let locStr = locParts.join(', ');
        if (clientConnData.country_name) {
            locStr = locStr ? `${locStr} - ${clientConnData.country_name}` : clientConnData.country_name;
        }
        const location = escapeHtml(locStr || 'N/A');

        clientConnContent.innerHTML = `
            <div class="checker-metrics-grid my-0">
                <div class="checker-metric-box">
                    <div class="checker-metric-label">${t('status.connIp')}</div>
                    <div class="checker-metric-val text-accent">${ip}</div>
                </div>
                <div class="checker-metric-box">
                    <div class="checker-metric-label">${t('status.connIsp')}</div>
                    <div class="checker-metric-val" style="font-family: inherit; font-size: 0.9rem;">${isp}</div>
                </div>
                <div class="checker-metric-box">
                    <div class="checker-metric-label">${t('status.connLocation')}</div>
                    <div class="checker-metric-val" style="font-family: inherit; font-size: 0.9rem;">${location}</div>
                </div>
            </div>
        `;
    }

    async function fetchClientConnection() {
        if (!clientConnContent) return;
        try {
            const res = await apiFetch('https://ipleak.net/json/', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            }, 6000);

            if (!res.ok) {
                clientConnFailed = true;
                renderClientConnection();
                return;
            }

            const data = await res.json();
            if (!data || !data.ip) {
                clientConnFailed = true;
                renderClientConnection();
                return;
            }

            clientConnData = data;
            clientConnFailed = false;
            renderClientConnection();
        } catch (_) {
            // Silently handle adblocker or network blocks without console errors
            clientConnFailed = true;
            renderClientConnection();
        }
    }

    // Render Checker Result
    function renderCheckResult(data, cleanDomain) {
        lastCheckResult = { data, cleanDomain };
        if (!checkResultBox) return;

        checkResultBox.style.display = 'block';

        const isOnline = Boolean(data.reachable);
        const classificationText = escapeHtml(data.classification || (isOnline ? 'Online' : 'Offline'));
        const badgeClass = isOnline ? 'status-badge-ok' : 'status-badge-err';
        const badgeIcon = isOnline ? 'fa-circle-check' : 'fa-circle-xmark';

        const dnsHtml = data.dns_resolved
            ? `<span class="text-success"><i class="fas fa-circle-check me-1"></i> OK</span>`
            : `<span class="text-danger"><i class="fas fa-circle-xmark me-1"></i> ${getLang() === 'en' ? 'Failed' : 'Falha'}</span>`;

        const tcpHtml = data.tcp_connected
            ? `<span class="text-success"><i class="fas fa-circle-check me-1"></i> OK</span>`
            : `<span class="text-danger"><i class="fas fa-circle-xmark me-1"></i> ${getLang() === 'en' ? 'Failed' : 'Falha'}</span>`;

        const httpHtml = data.http_status
            ? `<span class="text-accent fw-bold">${escapeHtml(data.http_status)}</span>`
            : `<span class="text-secondary">N/A</span>`;

        let tlsHtml = '';
        if (data.tls_valid) {
            const expiryStr = data.tls_expiry ? ` (${t('status.expiresOn')} ${escapeHtml(data.tls_expiry)})` : '';
            tlsHtml = `<span class="text-success"><i class="fas fa-lock me-1"></i> ${t('status.validTls')}${expiryStr}</span>`;
        } else {
            tlsHtml = `<span class="text-warning"><i class="fas fa-lock-open me-1"></i> ${t('status.invalidTls')}</span>`;
        }

        const latencyHtml = data.latency_ms != null
            ? `<span>${escapeHtml(data.latency_ms)} ms</span>`
            : `<span class="text-secondary">N/A</span>`;

        const ispBoxHtml = data.isp ? `
            <div class="checker-metric-box">
                <div class="checker-metric-label">${t('status.lblIsp')}</div>
                <div class="checker-metric-val" style="font-family: inherit; font-size: 0.88rem;">${escapeHtml(data.isp)}</div>
            </div>
        ` : '';

        const countryBoxHtml = data.country ? `
            <div class="checker-metric-box">
                <div class="checker-metric-label">${t('status.lblCountry')}</div>
                <div class="checker-metric-val" style="font-family: inherit; font-size: 0.88rem;">${escapeHtml(data.country)}</div>
            </div>
        ` : '';

        const externalUrl = `https://www.isitdownrightnow.com/${encodeURIComponent(cleanDomain)}.html`;

        checkResultBox.innerHTML = `
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div class="d-flex align-items-center gap-2">
                    <span class="status-kpi-icon" style="width: 36px; height: 36px; font-size: 1rem;">
                        <i class="fas fa-globe"></i>
                    </span>
                    <div>
                        <strong class="fs-6 text-body">${escapeHtml(data.target || cleanDomain)}</strong>
                        <div class="text-secondary small font-monospace">${escapeHtml(cleanDomain)}</div>
                    </div>
                </div>
                <span class="status-badge-pill ${badgeClass}">
                    <i class="fas ${badgeIcon}"></i> ${classificationText}
                </span>
            </div>

            <div class="checker-metrics-grid">
                <div class="checker-metric-box">
                    <div class="checker-metric-label">${t('status.lblDns')}</div>
                    <div class="checker-metric-val">${dnsHtml}</div>
                </div>
                <div class="checker-metric-box">
                    <div class="checker-metric-label">${t('status.lblTcp')}</div>
                    <div class="checker-metric-val">${tcpHtml}</div>
                </div>
                <div class="checker-metric-box">
                    <div class="checker-metric-label">${t('status.lblHttp')}</div>
                    <div class="checker-metric-val">${httpHtml}</div>
                </div>
                <div class="checker-metric-box">
                    <div class="checker-metric-label">${t('status.lblTls')}</div>
                    <div class="checker-metric-val">${tlsHtml}</div>
                </div>
                <div class="checker-metric-box">
                    <div class="checker-metric-label">${t('status.lblLatency')}</div>
                    <div class="checker-metric-val">${latencyHtml}</div>
                </div>
                ${ispBoxHtml}
                ${countryBoxHtml}
            </div>

            <div class="pt-2 text-end">
                <a href="${externalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary">
                    ${t('status.btnExternalCheck')}
                </a>
            </div>
        `;
    }

    // Submit Site Availability Check
    async function handleCheckSubmit(e) {
        if (e) e.preventDefault();
        if (isChecking) return;

        const rawUrl = checkInput ? checkInput.value.trim() : '';
        if (!rawUrl) {
            if (checkInput) checkInput.focus();
            return;
        }

        const cleanDomain = extractCleanDomain(rawUrl);
        if (!cleanDomain) {
            showCheckError(t('status.errInvalidUrl'));
            return;
        }

        isChecking = true;
        if (checkBtn) checkBtn.disabled = true;
        if (checkBtnText) checkBtnText.textContent = t('status.btnChecking');
        if (checkErrorBox) checkErrorBox.style.display = 'none';
        if (checkResultBox) checkResultBox.style.display = 'none';

        try {
            const res = await apiFetch('/api/v1/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ url: rawUrl })
            });

            if (res.status === 429) {
                showCheckError(t('status.errRateLimit'));
                return;
            }

            let resultData = null;
            try {
                resultData = await res.json();
            } catch (_) {
                // non-JSON response
            }

            if (res.status === 400) {
                const msg = (resultData && resultData.error) ? resultData.error : t('status.errInvalidUrl');
                showCheckError(msg);
                return;
            }

            if (!res.ok) {
                const msg = (resultData && resultData.error) ? resultData.error : t('status.errFetchFailed');
                showCheckError(msg);
                return;
            }

            renderCheckResult(resultData || {}, cleanDomain);
        } catch (_) {
            showCheckError(t('status.errFetchFailed'));
        } finally {
            isChecking = false;
            if (checkBtn) checkBtn.disabled = false;
            if (checkBtnText) checkBtnText.textContent = t('status.btnCheck');
        }
    }

    function showCheckError(message) {
        if (!checkErrorBox) return;
        checkErrorBox.textContent = message;
        checkErrorBox.style.display = 'block';
    }

    // Event Listeners
    if (checkForm) {
        checkForm.addEventListener('submit', handleCheckSubmit);
    }
    if (checkBtn) {
        checkBtn.addEventListener('click', handleCheckSubmit);
    }
    if (btnRefreshStatus) {
        btnRefreshStatus.addEventListener('click', () => fetchStatus());
    }

    // Auto-refresh every 45s while tab is visible
    setInterval(() => {
        if (!document.hidden) {
            fetchStatus();
        }
    }, 45000);

    // Refresh immediately when returning to tab if not already loading
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            fetchStatus();
        }
    });

    // Language Change Event Listener
    window.addEventListener('languagechange', () => {
        if (currentStatusData) {
            renderStatus(currentStatusData);
        } else if (!isStatusLoading) {
            renderStatusError();
        }
        if (clientConnData || clientConnFailed) {
            renderClientConnection();
        }
        if (lastCheckResult) {
            renderCheckResult(lastCheckResult.data, lastCheckResult.cleanDomain);
        }
    });

    // Initial Load (parallel & non-blocking)
    fetchStatus();
    fetchClientConnection();

})();
