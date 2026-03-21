// ===== Complynt Shared Layout & Utilities =====
// This file is included in every admin page

// ===== Shell Bar HTML =====
function getShellBarHTML() {
    return `
    <header class="shell-bar">
        <button class="nav-toggle" onclick="toggleNav()" title="Toggle Navigation">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>
        <span class="shell-bar__logo">
            <span class="shell-bar__logo-icon">C</span>
            Complynt
        </span>
        <div class="shell-bar__spacer"></div>
        <button class="shell-bar__icon" title="SLA Alerts" onclick="window.location.href='/sla.html'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
        </button>
        <button class="shell-bar__icon" title="Help" onclick="showToast('Help documentation coming soon', 'info')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
        </button>
        <div class="avatar-wrap">
            <div class="avatar" onclick="toggleAvatarMenu()" title="Admin User">AD</div>
            <div class="avatar-menu" id="avatar-menu">
                <div class="avatar-menu__header">
                    <div class="avatar-menu__name">Admin User</div>
                    <div class="avatar-menu__role">Supervisor</div>
                </div>
                <a href="#" class="avatar-menu__item" onclick="showToast('Settings coming soon', 'info'); return false;">Settings</a>
                <div class="avatar-menu__divider"></div>
                <a href="#" class="avatar-menu__item" onclick="signOut(); return false;">Sign Out</a>
            </div>
        </div>
    </header>`;
}

// ===== Left Navigation HTML =====
function getLeftNavHTML(activePage) {
    const navItems = [
        { href: '/', page: 'dashboard', icon: getDashboardIcon(), label: 'Dashboard' },
        { href: '/complaints.html', page: 'complaints', icon: getComplaintsIcon(), label: 'Complaints' },
        { divider: true },
        { href: '/agents.html', page: 'agents', icon: getAgentsIcon(), label: 'Agents' },
        { href: '/customers.html', page: 'customers', icon: getCustomersIcon(), label: 'Customers' },
        { href: '/sla.html', page: 'sla', icon: getSlaIcon(), label: 'SLA Monitor' },
        { divider: true },
        { href: '/reports.html', page: 'reports', icon: getReportsIcon(), label: 'Reports' }
    ];

    let navHTML = '<nav class="left-nav" id="left-nav">';
    navHTML += '<div class="nav-section"><div class="nav-section-label">Navigation</div>';
    
    navItems.forEach(item => {
        if (item.divider) {
            navHTML += '<div class="nav-divider"></div>';
        } else {
            const isActive = activePage === item.page ? 'active' : '';
            navHTML += `
                <a href="${item.href}" class="nav-item ${isActive}" data-page="${item.page}">
                    <span class="nav-icon">${item.icon}</span>
                    <span class="nav-label">${item.label}</span>
                </a>`;
        }
    });
    
    navHTML += '</div>';
    navHTML += '<div class="nav-spacer"></div>';
    navHTML += `
        <a href="/new-complaint.html" class="nav-item" target="_blank" style="background: var(--color-primary-light);">
            <span class="nav-icon">${getAddIcon()}</span>
            <span class="nav-label">New Complaint</span>
        </a>`;
    navHTML += '<div class="nav-footer">Complynt v2.0<br>Enterprise Complaint Management</div>';
    navHTML += '</nav>';
    
    return navHTML;
}

// ===== Icons =====
function getDashboardIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
    </svg>`;
}

function getComplaintsIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>`;
}

function getAgentsIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`;
}

function getCustomersIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>`;
}

function getSlaIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>`;
}

function getReportsIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>`;
}

function getAddIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>`;
}

// ===== Initialize Layout =====
function initLayout(activePage) {
    // Insert Shell Bar
    const shellBarContainer = document.getElementById('shell-bar');
    if (shellBarContainer) {
        shellBarContainer.outerHTML = getShellBarHTML();
    } else {
        document.body.insertAdjacentHTML('afterbegin', getShellBarHTML());
    }
    
    // Insert Left Nav
    const navContainer = document.getElementById('left-nav-container');
    if (navContainer) {
        navContainer.outerHTML = getLeftNavHTML(activePage);
    } else {
        const shellBar = document.querySelector('.shell-bar');
        if (shellBar) {
            shellBar.insertAdjacentHTML('afterend', getLeftNavHTML(activePage));
        }
    }
    
    // Create Toast Container
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Close menus on outside click
    document.addEventListener('click', function(e) {
        const avatarMenu = document.getElementById('avatar-menu');
        if (avatarMenu && avatarMenu.classList.contains('open')) {
            if (!e.target.closest('.avatar-wrap')) {
                avatarMenu.classList.remove('open');
            }
        }
    });
    
    // Load nav collapsed state from localStorage
    const navCollapsed = localStorage.getItem('navCollapsed') === 'true';
    if (navCollapsed) {
        document.getElementById('left-nav')?.classList.add('collapsed');
        document.querySelector('.app-layout')?.classList.add('nav-collapsed');
    }
}

// ===== Navigation Toggle =====
function toggleNav() {
    const nav = document.getElementById('left-nav');
    const main = document.querySelector('.app-layout');
    
    if (nav && main) {
        nav.classList.toggle('collapsed');
        main.classList.toggle('nav-collapsed');
        localStorage.setItem('navCollapsed', nav.classList.contains('collapsed'));
    }
}

// ===== Avatar Menu =====
function toggleAvatarMenu() {
    const menu = document.getElementById('avatar-menu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

function signOut() {
    showToast('Signing out...', 'info');
    setTimeout(() => {
        window.location.href = '/';
    }, 1000);
}

// ===== Toast Notifications =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <span class="toast__icon">${getToastIcon(type)}</span>
        <span class="toast__message">${message}</span>
        <button class="toast__close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 4000);
}

function getToastIcon(type) {
    switch (type) {
        case 'success':
            return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        case 'error':
            return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
        case 'warning':
            return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
        default:
            return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }
}

// ===== Skeleton Loading =====
function showTableSkeleton(tbodyId, colCount = 6, rowCount = 5) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    
    let html = '';
    for (let i = 0; i < rowCount; i++) {
        html += '<tr class="skeleton-row">';
        for (let j = 0; j < colCount; j++) {
            const width = Math.floor(Math.random() * 40) + 40;
            html += `<td><div class="skeleton skeleton-cell" style="width: ${width}%"></div></td>`;
        }
        html += '</tr>';
    }
    
    tbody.innerHTML = html;
}

// ===== Date Formatters =====
function formatDate(isoString) {
    if (!isoString) return '\u2014';
    const date = new Date(isoString);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-IN', options);
}

function formatDateShort(isoString) {
    if (!isoString) return '\u2014';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
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
    
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
        return Math.floor(hours / 24) + 'd ' + (hours % 24) + 'h';
    }
    return hours + 'h ' + minutes + 'm';
}

// ===== Badge Helpers =====
function severityBadge(level) {
    if (!level) return '';
    const labels = { P1: 'P1 Critical', P2: 'P2 High', P3: 'P3 Medium', P4: 'P4 Low' };
    return `<span class="badge badge-${level.toLowerCase()}">${labels[level] || level}</span>`;
}

function statusBadge(status) {
    if (!status) return '';
    const cls = status.toLowerCase().replace(/ /g, '_');
    const label = status.replace(/_/g, ' ');
    return `<span class="badge badge-${cls}">${label}</span>`;
}

function slaBadge(slaStatus) {
    if (!slaStatus || !slaStatus.status) return '<span class="badge badge-closed">N/A</span>';
    const cls = slaStatus.status.toLowerCase().replace(/ /g, '_');
    const label = slaStatus.status.replace(/_/g, ' ');
    return `<span class="badge badge-${cls}">${label}</span>`;
}

// ===== Product Label =====
function productLabel(productType) {
    if (!productType) return '\u2014';
    return productType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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
        ...data.map(row => headers.map(h => {
            let val = row[h];
            if (val === null || val === undefined) val = '';
            if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
                val = '"' + val.replace(/"/g, '""') + '"';
            }
            return val;
        }).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('CSV exported successfully', 'success');
}

// ===== Chart Helper =====
function renderBarChart(containerId, data, colors) {
    const el = document.getElementById(containerId);
    if (!el) return;
    
    const entries = Object.entries(data);
    if (!entries.length) {
        el.innerHTML = '<div class="empty-state" style="padding: 30px;"><p class="empty-text">No data available</p></div>';
        return;
    }
    
    const max = Math.max(...entries.map(e => e[1]), 1);
    
    el.innerHTML = entries.map((entry, i) => {
        const [label, value] = entry;
        const pct = (value / max) * 100;
        const color = colors[i % colors.length];
        const shortLabel = label.replace(/_/g, ' ');
        const displayLabel = shortLabel.length > 12 ? shortLabel.substring(0, 10) + '...' : shortLabel;
        
        return `
            <div class="bar-item">
                <div class="bar-value">${value}</div>
                <div class="bar" style="height: ${Math.max(pct, 5)}%; background: ${color};"></div>
                <div class="bar-label" title="${shortLabel}">${displayLabel}</div>
            </div>`;
    }).join('');
}

// ===== Debounce Utility =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Generate Initials =====
function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}
