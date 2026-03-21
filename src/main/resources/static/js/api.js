// ===== Complynt API Service =====
// All fetch calls live here - nothing else

const API_BASE = BASE_URL + '/api';

// ===== Core HTTP Methods =====
async function apiGet(url) {
    const response = await fetch(API_BASE + url);
    if (!response.ok) {
        throw new Error(`GET ${url}: ${response.status}`);
    }
    return response.json();
}

async function apiPost(url, data) {
    const response = await fetch(API_BASE + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `POST ${url}: ${response.status}`);
    }
    return response.json();
}

async function apiPatch(url, data) {
    const response = await fetch(API_BASE + url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`PATCH ${url}: ${response.status}`);
    }
    return response.json();
}

// ===== Dashboard / Analytics =====
async function getDashboardStats() {
    return apiGet('/analytics/summary');
}

async function getComplaintTrend(days = 7) {
    return apiGet('/analytics/trend?days=' + days);
}

// ===== Complaints =====
async function getComplaints(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
            params.set(key, value);
        }
    });
    return apiGet('/complaints?' + params.toString());
}

async function getComplaintById(id) {
    return apiGet('/complaints/' + id);
}

async function createComplaint(data) {
    return apiPost('/complaints', data);
}

async function updateComplaintStatus(id, status, note) {
    return apiPatch('/complaints/' + id + '/status', { status, note });
}

async function reassignComplaint(id, agentId) {
    return apiPost('/complaints/' + id + '/assign', { agentId });
}

async function escalateComplaint(id) {
    return updateComplaintStatus(id, 'ESCALATED', 'Escalated by supervisor');
}

async function addComment(complaintId, content, authorName, authorRole, isInternal) {
    return apiPost('/complaints/' + complaintId + '/comments', {
        content,
        authorName,
        authorRole,
        isInternal: isInternal || false
    });
}

async function classifyComplaint(id) {
    return apiPost('/complaints/' + id + '/classify', {});
}

// ===== Agents =====
async function getAgents() {
    return apiGet('/agents');
}

async function getAgentComplaints(agentId, page = 0, size = 20) {
    return apiGet('/agents/' + agentId + '/complaints?page=' + page + '&size=' + size);
}

// ===== Customers =====
async function getCustomers(search = '') {
    const params = search ? '?search=' + encodeURIComponent(search) : '';
    return apiGet('/customers' + params);
}

async function getCustomerById(id) {
    return apiGet('/customers/' + id);
}

async function getCustomerComplaints(customerId, page = 0, size = 20) {
    return apiGet('/customers/' + customerId + '/complaints?page=' + page + '&size=' + size);
}

// ===== SLA =====
async function getSlaStatus(complaintId) {
    return apiGet('/sla/' + complaintId);
}

async function getBreachedComplaints() {
    return apiGet('/sla/breached');
}

async function getSlaRules() {
    return apiGet('/sla/rules');
}

async function updateSlaRule(ruleId, data) {
    return apiPatch('/sla/rules/' + ruleId, data);
}

// ===== Reports =====
async function getReportData(type, filters = {}) {
    const params = new URLSearchParams(filters);
    params.set('type', type);
    return apiGet('/reports/data?' + params.toString());
}

async function downloadReportCsv(fromDate, toDate) {
    const response = await fetch(API_BASE + '/reports/export?from=' + fromDate + '&to=' + toDate);
    if (!response.ok) {
        throw new Error('Failed to download report');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'complaints-' + fromDate + '-to-' + toDate + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ===== Backwards compatibility with existing pages =====
const api = {
    get: apiGet,
    post: apiPost,
    patch: apiPatch,
    getComplaints: getComplaints,
    getComplaint: getComplaintById,
    createComplaint: createComplaint,
    updateStatus: updateComplaintStatus,
    assignAgent: reassignComplaint,
    addComment: addComment,
    classifyComplaint: classifyComplaint,
    getSummary: getDashboardStats,
    getTrend: getComplaintTrend,
    getSla: getSlaStatus,
    getBreached: getBreachedComplaints,
    getSlaRules: getSlaRules,
    getAgents: getAgents,
    getCustomers: getCustomers,
    getCustomer: getCustomerById,
    getCustomerComplaints: getCustomerComplaints,
    downloadCsv: downloadReportCsv
};
