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

    // Helper: translate key using SITE_I18N
    const t = (key) => (window.SITE_I18N ? window.SITE_I18N.t(key) : key);
    const getLang = () => (window.SITE_I18N ? window.SITE_I18N.currentLang : (localStorage.getItem('site_lang') || 'pt'));

    // DOM Elements
    const globalBanner = document.getElementById('globalStatusBanner');
    const globalStatusText = document.getElementById('globalStatusText');
    const globalStatusDot = document.getElementById('globalStatusDot');
    const statusUpdatedAt = document.getElementById('statusUpdatedAt');
    const btnRefreshStatus = document.getElementById('btnRefreshStatus');

    const kpiNodes = document.getElementById('kpiNodes');
    const kpiServices = document.getElementById('kpiServices');
    const kpiAvailability = document.getElementById('kpiAvailability');

    const infraList = document.getElementById('infraList');
    const thirdPartyList = document.getElementById('thirdPartyList');

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
        return `<span class="status-badge-pill status-badge-unknown"><i class="fas fa-circle-question"></i> ${statusStr || 'N/A'}</span>`;
    }

    // Render Status Data
    function renderStatus(data) {
        currentStatusData = data;

        // 1. Global Banner
        if (globalStatusDot && globalStatusText) {
            globalStatusDot.className = 'status-pulse-dot';
            const gStatus = (data.global_status || '').toLowerCase();

            if (gStatus === 'operational') {
                globalStatusDot.classList.add('status-dot-ok');
                globalStatusText.textContent = t('status.badgeOperational');
            } else if (gStatus === 'degraded') {
                globalStatusDot.classList.add('status-dot-warn');
                globalStatusText.textContent = t('status.badgeDegraded');
            } else if (gStatus === 'offline') {
                globalStatusDot.classList.add('status-dot-err');
                globalStatusText.textContent = t('status.badgeOffline');
            } else {
                globalStatusDot.classList.add('status-dot-unknown');
                globalStatusText.textContent = t('status.badgeUnavailable');
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

        // 3. Infrastructure List
        if (infraList && Array.isArray(data.infrastructure)) {
            infraList.innerHTML = data.infrastructure.map(item => `
                <div class="status-item-row">
                    <span class="status-item-name">
                        <i class="fas fa-server text-accent"></i> ${item.name}
                    </span>
                    ${getStatusBadgeHtml(item.status)}
                </div>
            `).join('');
        }

        // 4. Third-Party List
        if (thirdPartyList && Array.isArray(data.third_party)) {
            thirdPartyList.innerHTML = data.third_party.map(item => `
                <div class="status-item-row">
                    <a href="${item.url || '#'}" target="_blank" rel="noopener noreferrer" class="status-item-name" title="Ver status oficial de ${item.name}">
                        <i class="fas fa-cloud text-accent"></i> ${item.name}
                        <i class="fas fa-arrow-up-right-from-square text-secondary" style="font-size: 0.72rem;"></i>
                    </a>
                    ${getStatusBadgeHtml(item.status)}
                </div>
            `).join('');
        }
    }

    // Render Error (Never claim operational without API response)
    function renderStatusError(err) {
        console.warn('Status fetch error:', err);
        currentStatusData = null;

        if (globalStatusDot && globalStatusText) {
            globalStatusDot.className = 'status-pulse-dot status-dot-unknown';
            globalStatusText.textContent = t('status.badgeUnavailable');
        }

        if (statusUpdatedAt) {
            statusUpdatedAt.textContent = '--:--:--';
        }

        if (kpiNodes) kpiNodes.textContent = '-- / --';
        if (kpiServices) kpiServices.textContent = '-- / --';
        if (kpiAvailability) kpiAvailability.textContent = '--%';

        if (infraList) {
            infraList.innerHTML = `
                <div class="alert alert-warning d-flex align-items-center mb-0 p-3" role="alert" style="border-radius: 0.65rem;">
                    <i class="fas fa-triangle-exclamation me-2 fs-5"></i>
                    <div>
                        <strong class="d-block">${t('status.badgeUnavailable')}</strong>
                        <span class="small">${t('status.errFetchFailed')}</span>
                    </div>
                </div>
            `;
        }

        if (thirdPartyList) {
            thirdPartyList.innerHTML = `
                <div class="alert alert-secondary d-flex align-items-center mb-0 p-3" role="alert" style="border-radius: 0.65rem;">
                    <i class="fas fa-wifi text-secondary me-2 fs-5"></i>
                    <span class="small">${t('status.errFetchFailed')}</span>
                </div>
            `;
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
            const res = await fetch('/api/v1/status', {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                cache: 'no-store'
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
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

    // Render Checker Result
    function renderCheckResult(data, cleanDomain) {
        lastCheckResult = { data, cleanDomain };
        if (!checkResultBox) return;

        checkResultBox.style.display = 'block';

        const isOnline = Boolean(data.reachable);
        const classificationText = data.classification || (isOnline ? 'Online' : 'Offline');
        const badgeClass = isOnline ? 'status-badge-ok' : 'status-badge-err';
        const badgeIcon = isOnline ? 'fa-circle-check' : 'fa-circle-xmark';

        const dnsHtml = data.dns_resolved
            ? `<span class="text-success"><i class="fas fa-circle-check me-1"></i> OK</span>`
            : `<span class="text-danger"><i class="fas fa-circle-xmark me-1"></i> ${getLang() === 'en' ? 'Failed' : 'Falha'}</span>`;

        const tcpHtml = data.tcp_connected
            ? `<span class="text-success"><i class="fas fa-circle-check me-1"></i> OK</span>`
            : `<span class="text-danger"><i class="fas fa-circle-xmark me-1"></i> ${getLang() === 'en' ? 'Failed' : 'Falha'}</span>`;

        const httpHtml = data.http_status
            ? `<span class="text-accent fw-bold">${data.http_status}</span>`
            : `<span class="text-secondary">N/A</span>`;

        let tlsHtml = '';
        if (data.tls_valid) {
            const expiryStr = data.tls_expiry ? ` (${t('status.expiresOn')} ${data.tls_expiry})` : '';
            tlsHtml = `<span class="text-success"><i class="fas fa-lock me-1"></i> ${t('status.validTls')}${expiryStr}</span>`;
        } else {
            tlsHtml = `<span class="text-warning"><i class="fas fa-lock-open me-1"></i> ${t('status.invalidTls')}</span>`;
        }

        const latencyHtml = data.latency_ms != null
            ? `<span>${data.latency_ms} ms</span>`
            : `<span class="text-secondary">N/A</span>`;

        const externalUrl = `https://www.isitdownrightnow.com/${encodeURIComponent(cleanDomain)}.html`;

        checkResultBox.innerHTML = `
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div class="d-flex align-items-center gap-2">
                    <span class="status-kpi-icon" style="width: 36px; height: 36px; font-size: 1rem;">
                        <i class="fas fa-globe"></i>
                    </span>
                    <div>
                        <strong class="fs-6 text-body">${data.target || cleanDomain}</strong>
                        <div class="text-secondary small font-monospace">${cleanDomain}</div>
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
            </div>

            <div class="pt-2 text-end">
                <a href="${externalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary">
                    <i class="fas fa-arrow-up-right-from-square me-1"></i> ${t('status.btnExternalCheck')}
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
            const res = await fetch('/api/v1/check', {
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
            } catch (jsonErr) {
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
        } catch (netErr) {
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
    let refreshInterval = setInterval(() => {
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
        }
        if (lastCheckResult) {
            renderCheckResult(lastCheckResult.data, lastCheckResult.cleanDomain);
        }
    });

    // Initial Load
    fetchStatus();

})();
