// ===== COMPLYNT SHARED UTILITIES =====
// Common functions used across all pages

// ===== Layout Initialization =====
function initLayout(activePage) {
    // Create Shell Bar
    const shellBar = document.createElement('header');
    shellBar.className = 'shell-bar';
    shellBar.innerHTML = `
        <button class="nav-toggle" onclick="toggleNav()" title="Toggle Navigation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
        </button>
        <span class="shell-bar__logo">Complynt</span>
        <div class="shell-bar__spacer"></div>
        <button class="shell-bar__icon" title="Notifications" onclick="window.location.href='/sla.html'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="badge-dot" id="notification-count" style="display:none;">0</span>
        </button>
        <button class="shell-bar__icon" title="Help">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
        </button>
        <div class="avatar-wrap">
            <div class="avatar" onclick="toggleAvatarMenu()" title="User Menu">AD</div>
            <div class="avatar-menu" id="avatar-menu">
                <div class="avatar-menu__name">Admin User</div>
                <div class="avatar-menu__role">Supervisor</div>
                <hr/>
                <a href="#" onclick="signOut(); return false;">Sign Out</a>
            </div>
        </div>
    `;
    document.body.prepend(shellBar);

    // Create Left Navigation
    const leftNav = document.createElement('nav');
    leftNav.className = 'left-nav';
    leftNav.id = 'left-nav';
    leftNav.innerHTML = `
        <div class="nav-section-label">Overview</div>
        <a href="/" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}" data-page="dashboard">
            <span class="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
            </span>
            <span class="nav-label">Dashboard</span>
        </a>
        <a href="/complaints.html" class="nav-item ${activePage === 'complaints' ? 'active' : ''}" data-page="complaints">
            <span class="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
            </span>
            <span class="nav-label">Complaints</span>
        </a>
        
        <div class="nav-section-label">Management</div>
        <a href="/agents.html" class="nav-item ${activePage === 'agents' ? 'active' : ''}" data-page="agents">
            <span class="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
            </span>
            <span class="nav-label">Agents</span>
        </a>
        <a href="/customers.html" class="nav-item ${activePage === 'customers' ? 'active' : ''}" data-page="customers">
            <span class="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            </span>
            <span class="nav-label">Customers</span>
        </a>
        <a href="/sla.html" class="nav-item ${activePage === 'sla' ? 'active' : ''}" data-page="sla">
            <span class="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            </span>
            <span class="nav-label">SLA Monitor</span>
        </a>
        
        <div class="nav-section-label">Analytics</div>
        <a href="/reports.html" class="nav-item ${activePage === 'reports' ? 'active' : ''}" data-page="reports">
            <span class="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
            </span>
            <span class="nav-label">Reports</span>
        </a>
        
        <div class="nav-divider"></div>
        <a href="/new-complaint.html" class="nav-item nav-item--bottom" data-page="new-complaint" style="color: var(--color-primary);">
            <span class="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
            </span>
            <span class="nav-label">New Complaint</span>
        </a>
    `;
    document.body.appendChild(leftNav);

    // Create Toast Container
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Check for breached complaints notification count
    loadNotificationCount();

    // Close avatar menu on outside click
    document.addEventListener('click', function(e) {
        const avatarMenu = document.getElementById('avatar-menu');
        const avatarWrap = document.querySelector('.avatar-wrap');
        if (avatarMenu && avatarWrap && !avatarWrap.contains(e.target)) {
            avatarMenu.classList.remove('open');
        }
    });
}

// ===== Navigation Functions =====
function toggleNav() {
    const nav = document.getElementById('left-nav');
    const main = document.querySelector('.app-layout');
    if (nav) {
        nav.classList.toggle('collapsed');
        if (main) {
            main.classList.toggle('nav-collapsed');
        }
    }
}

function toggleAvatarMenu() {
    const menu = document.getElementById('avatar-menu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

function signOut() {
    showToast('Signing out...', 'info');
    setTimeout(function() {
        window.location.href = '/';
    }, 1000);
}

// ===== Notification Badge =====
async function loadNotificationCount() {
    try {
        const breached = await api.getBreachedSla();
        const count = Array.isArray(breached) ? breached.length : 0;
        const badge = document.getElementById('notification-count');
        if (badge && count > 0) {
            badge.textContent = count > 9 ? '9+' : count;
            badge.style.display = 'flex';
        }
    } catch (e) {
        // Silently fail - notifications are non-critical
    }
}

// ===== Toast Notifications =====
function showToast(message, type) {
    type = type || 'info';
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    const toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.innerHTML = `
        <span class="toast__icon">${icons[type] || icons.info}</span>
        <span class="toast__message">${escapeHtml(message)}</span>
        <button class="toast__close" onclick="this.parentElement.remove()">&times;</button>
    `;
    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(function() {
        if (toast.parentElement) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-100%)';
            setTimeout(function() { toast.remove(); }, 300);
        }
    }, TOAST_DURATION || 4000);
}

// ===== Table Skeleton Loading =====
function showTableSkeleton(tbodyId, colCount, rowCount) {
    colCount = colCount || 6;
    rowCount = rowCount || 5;
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    let html = '';
    for (let i = 0; i < rowCount; i++) {
        html += '<tr class="skeleton-row">';
        for (let j = 0; j < colCount; j++) {
            const width = 40 + Math.random() * 40; // Random width between 40-80%
            html += '<td><div class="skeleton skeleton-cell" style="width:' + width + '%;"></div></td>';
        }
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

// ===== Date Formatters =====
function formatDate(isoString) {
    if (!isoString) return '\u2014';
    const date = new Date(isoString);
    const options = { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };
    return date.toLocaleDateString('en-IN', options);
}

function formatDateShort(isoString) {
    if (!isoString) return '\u2014';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function timeAgo(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
    return formatDateShort(isoString);
}

function formatCountdown(ms) {
    if (ms <= 0) return 'Overdue';
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    if (hours > 24) {
        return Math.floor(hours / 24) + 'd ' + (hours % 24) + 'h';
    }
    return hours + 'h ' + minutes + 'm';
}

// ===== Badge Generators =====
function severityBadge(level) {
    if (!level) return '';
    const labels = { P1: 'P1 Critical', P2: 'P2 High', P3: 'P3 Medium', P4: 'P4 Low' };
    return '<span class="badge badge-' + level.toLowerCase() + '">' + (labels[level] || level) + '</span>';
}

function statusBadge(status) {
    if (!status) return '';
    const label = status.replace(/_/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    return '<span class="badge badge-' + status.toLowerCase() + '">' + label + '</span>';
}

function slaBadge(slaStatus) {
    if (!slaStatus) return '<span class="badge badge-unknown">N/A</span>';
    const status = typeof slaStatus === 'object' ? slaStatus.status : slaStatus;
    if (!status) return '<span class="badge badge-unknown">N/A</span>';
    const label = status.replace(/_/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    return '<span class="badge badge-' + status.toLowerCase() + '">' + label + '</span>';
}

function sentimentBadge(sentiment) {
    if (!sentiment) return '<span class="badge badge-unknown">Unknown</span>';
    return '<span class="badge badge-' + sentiment.toLowerCase() + '">' + sentiment + '</span>';
}

// ===== Label Formatters =====
function productLabel(productType) {
    if (!productType) return '\u2014';
    if (PRODUCT_LABELS && PRODUCT_LABELS[productType]) {
        return PRODUCT_LABELS[productType];
    }
    return productType.replace(/_/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
}

function channelLabel(channel) {
    if (!channel) return '\u2014';
    if (CHANNEL_LABELS && CHANNEL_LABELS[channel]) {
        return CHANNEL_LABELS[channel];
    }
    return channel.replace(/_/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
}

// ===== Drawer Functions =====
function openDrawer(drawerId) {
    const overlay = document.getElementById(drawerId + '-overlay');
    const drawer = document.getElementById(drawerId);
    if (overlay) overlay.classList.add('open');
    if (drawer) drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDrawer(drawerId) {
    const overlay = document.getElementById(drawerId + '-overlay');
    const drawer = document.getElementById(drawerId);
    if (overlay) overlay.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== CSV Export =====
function exportToCSV(data, filename) {
    if (!data || !data.length) {
        showToast('No data to export', 'warning');
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(function(row) {
            return headers.map(function(header) {
                let cell = row[header];
                if (cell === null || cell === undefined) cell = '';
                cell = String(cell).replace(/"/g, '""');
                if (cell.indexOf(',') !== -1 || cell.indexOf('"') !== -1 || cell.indexOf('\n') !== -1) {
                    cell = '"' + cell + '"';
                }
                return cell;
            }).join(',');
        })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename || 'export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Export downloaded', 'success');
}

// ===== Bar Chart Renderer =====
function renderBarChart(containerId, data, colors) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const entries = Object.entries(data);
    if (!entries.length) {
        el.innerHTML = '<div class="empty-state" style="padding:40px;"><p class="empty-text">No data available</p></div>';
        return;
    }

    const max = Math.max.apply(null, entries.map(function(e) { return e[1]; }).concat([1]));
    colors = colors || ['#0070F2', '#188918', '#E9730C', '#BB0000', '#8C9BAB'];

    el.innerHTML = entries.map(function(entry, i) {
        const label = entry[0];
        const value = entry[1];
        const pct = (value / max) * 100;
        const color = colors[i % colors.length];
        const shortLabel = label.replace(/_/g, ' ');
        return '<div class="bar-item">' +
            '<div class="bar-value">' + value + '</div>' +
            '<div class="bar" style="height:' + Math.max(pct, 5) + '%;background:' + color + ';"></div>' +
            '<div class="bar-label" title="' + shortLabel + '">' + 
                (shortLabel.length > 12 ? shortLabel.substring(0, 10) + '\u2026' : shortLabel) + 
            '</div>' +
        '</div>';
    }).join('');
}

// ===== Utility Functions =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function getInitials(name) {
    if (!name) return '?';
    return name.split(' ')
        .map(function(n) { return n.charAt(0); })
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

// ===== SLA Bar Renderer =====
function renderSlaBar(createdAt, deadline) {
    if (!createdAt || !deadline) return '';
    
    const now = new Date();
    const created = new Date(createdAt);
    const deadlineDate = new Date(deadline);
    
    const total = deadlineDate - created;
    const remaining = deadlineDate - now;
    const elapsed = now - created;
    
    const pct = Math.max(0, Math.min(100, (elapsed / total) * 100));
    let colorClass = 'green';
    if (pct > 75) colorClass = 'red';
    else if (pct > 50) colorClass = 'orange';
    
    const timeLeft = remaining > 0 ? formatCountdown(remaining) : 'Overdue';
    
    return '<div class="sla-bar-wrap">' +
        '<span class="sla-bar-label">SLA Progress</span>' +
        '<div class="sla-bar-track"><div class="sla-bar-fill ' + colorClass + '" style="width:' + pct + '%;"></div></div>' +
        '<span class="sla-bar-time">' + timeLeft + '</span>' +
    '</div>';
}

// ===== Pagination Renderer =====
function renderPagination(currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) return '';
    
    let html = '<div class="pagination">';
    
    // Previous button
    html += '<button class="pagination-btn" ' + (currentPage === 0 ? 'disabled' : '') + 
            ' onclick="' + onPageChange + '(' + (currentPage - 1) + ')">Prev</button>';
    
    // Page info
    html += '<span class="pagination-info">Page ' + (currentPage + 1) + ' of ' + totalPages + '</span>';
    
    // Next button
    html += '<button class="pagination-btn" ' + (currentPage >= totalPages - 1 ? 'disabled' : '') + 
            ' onclick="' + onPageChange + '(' + (currentPage + 1) + ')">Next</button>';
    
    html += '</div>';
    return html;
}

// ===== Animate Workload Bars =====
function animateWorkloadBars() {
    document.querySelectorAll('.workload-bar-fill[data-width]').forEach(function(bar) {
        const width = bar.getAttribute('data-width');
        setTimeout(function() {
            bar.style.width = width + '%';
        }, 100);
    });
}
