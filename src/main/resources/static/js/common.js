// ===== Shared Layout & Helpers =====

function initLayout(activePage) {
    // Shell Bar
    const shellBar = document.createElement('div');
    shellBar.className = 'shell-bar';
    shellBar.innerHTML = `
        <div class="shell-bar-left">
            <span class="shell-logo" style="font-weight:800;font-size:15px;letter-spacing:-.3px;">CH</span>
            <span class="shell-title">ComplaintHub</span>
            <span class="shell-subtitle">Admin Console</span>
        </div>
        <div class="shell-bar-right">
            <div class="shell-icon" title="SLA Alerts" onclick="window.location.href='/sla'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <div class="shell-avatar" title="Admin">A</div>
        </div>
    `;
    document.body.prepend(shellBar);

    // Sidebar
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <div class="nav-section">
            <div class="nav-section-label">Overview</div>
            <a href="/" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></span>
                Dashboard
            </a>
            <a href="/complaints" class="nav-item ${activePage === 'complaints' ? 'active' : ''}">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
                Complaints
            </a>
        </div>
        <div class="nav-section">
            <div class="nav-section-label">Management</div>
            <a href="/agents" class="nav-item ${activePage === 'agents' ? 'active' : ''}">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
                Agents
            </a>
            <a href="/customers" class="nav-item ${activePage === 'customers' ? 'active' : ''}">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                Customers
            </a>
            <a href="/sla" class="nav-item ${activePage === 'sla' ? 'active' : ''}">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                SLA Monitor
            </a>
        </div>
        <div class="nav-section">
            <div class="nav-section-label">Analytics</div>
            <a href="/reports" class="nav-item ${activePage === 'reports' ? 'active' : ''}">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span>
                Reports
            </a>
        </div>
        <div class="sidebar-footer">
            Complaint Management System<br>&copy; 2026 Somaiya Hackathon
        </div>
    `;
    document.body.prepend(sidebar);

    // Toast container
    if (!document.getElementById('toast-wrap')) {
        const tw = document.createElement('div');
        tw.id = 'toast-wrap';
        tw.className = 'toast-wrap';
        document.body.appendChild(tw);
    }
}

// ===== Toast =====
function showToast(msg, type = 'info') {
    const wrap = document.getElementById('toast-wrap');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 3500);
}

// ===== Formatters =====
function formatDate(d) {
    if (!d) return '\u2014';
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        + ' ' + dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function formatDateShort(d) {
    if (!d) return '\u2014';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function statusBadge(s) {
    if (!s) return '';
    return '<span class="badge badge-' + s.toLowerCase() + '">' + s.replace(/_/g, ' ') + '</span>';
}

function severityBadge(s) {
    if (!s) return '';
    const labels = { P1: 'P1 Critical', P2: 'P2 High', P3: 'P3 Medium', P4: 'P4 Low' };
    return '<span class="badge badge-' + s.toLowerCase() + '">' + (labels[s] || s) + '</span>';
}

function slaBadge(sla) {
    if (!sla || !sla.status) return '<span class="badge badge-unknown">N/A</span>';
    return '<span class="badge badge-' + sla.status.toLowerCase() + '">' + sla.status.replace(/_/g, ' ') + '</span>';
}

function productLabel(p) {
    if (!p) return '\u2014';
    return p.replace(/_/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
}

// ===== Chart Helper =====
function renderBarChart(containerId, data, colors) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var entries = Object.entries(data);
    if (!entries.length) { el.innerHTML = '<div class="empty-state" style="padding:30px;"><p class="empty-text">No data available</p></div>'; return; }
    var max = Math.max.apply(null, entries.map(function(e) { return e[1]; }).concat([1]));
    el.innerHTML = entries.map(function(entry, i) {
        var label = entry[0], value = entry[1];
        var pct = (value / max) * 100;
        var color = colors[i % colors.length];
        var short = label.replace(/_/g, ' ');
        return '<div class="bar-item">' +
            '<div class="bar-value">' + value + '</div>' +
            '<div class="bar" style="height:' + Math.max(pct, 5) + '%;background:' + color + ';"></div>' +
            '<div class="bar-label" title="' + short + '">' + (short.length > 14 ? short.substring(0, 12) + '\u2026' : short) + '</div>' +
        '</div>';
    }).join('');
}
