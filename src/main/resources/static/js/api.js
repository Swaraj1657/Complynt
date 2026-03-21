// ===== COMPLYNT API SERVICE =====
// All fetch calls to the backend API

const api = {
    // ===== Core HTTP Methods =====
    async get(url) {
        const res = await fetch(BASE_URL + '/api' + url);
        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || `Request failed: ${res.status}`);
        }
        return res.json();
    },

    async post(url, data) {
        const res = await fetch(BASE_URL + '/api' + url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || `Request failed: ${res.status}`);
        }
        return res.json();
    },

    async patch(url, data) {
        const res = await fetch(BASE_URL + '/api' + url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || `Request failed: ${res.status}`);
        }
        return res.json();
    },

    async delete(url) {
        const res = await fetch(BASE_URL + '/api' + url, {
            method: 'DELETE'
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || `Request failed: ${res.status}`);
        }
        return res.ok;
    },

    // ===== Complaints API =====
    
    // GET all complaints with optional filters
    getComplaints(filters = {}) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                params.set(key, value);
            }
        });
        const query = params.toString();
        return this.get('/complaints' + (query ? '?' + query : ''));
    },

    // GET single complaint by ID
    getComplaint(id) {
        return this.get('/complaints/' + id);
    },

    // POST create new complaint
    createComplaint(data) {
        return this.post('/complaints', data);
    },

    // PATCH update complaint status
    updateStatus(id, status, note) {
        return this.patch('/complaints/' + id + '/status', { status, note });
    },

    // POST assign agent to complaint
    assignAgent(complaintId, agentId) {
        return this.post('/complaints/' + complaintId + '/assign', { agentId });
    },

    // POST escalate complaint
    escalateComplaint(id) {
        return this.patch('/complaints/' + id + '/status', { status: 'ESCALATED' });
    },

    // POST add comment to complaint
    addComment(complaintId, content, authorName, authorRole, isInternal) {
        return this.post('/complaints/' + complaintId + '/comments', {
            content,
            authorName,
            authorRole,
            isInternal: isInternal || false
        });
    },

    // POST run AI classification
    classifyComplaint(id) {
        return this.post('/complaints/' + id + '/classify', {});
    },

    // GET breached SLA complaints
    getBreachedComplaints() {
        return this.get('/complaints/breached-sla');
    },

    // ===== Analytics API =====

    // GET dashboard summary stats
    getSummary() {
        return this.get('/analytics/summary');
    },

    // GET complaint trend data
    getTrend(days = 7) {
        return this.get('/analytics/trend?days=' + days);
    },

    // ===== Agents API =====

    // GET all agents
    getAgents() {
        return this.get('/agents');
    },

    // POST create agent
    createAgent(data) {
        return this.post('/agents', data);
    },

    // GET agent's complaints
    getAgentComplaints(agentId, page = 0, size = 20) {
        return this.get('/agents/' + agentId + '/complaints?page=' + page + '&size=' + size);
    },

    // ===== Customers API =====

    // GET all customers
    getCustomers(search = '') {
        const query = search ? '?search=' + encodeURIComponent(search) : '';
        return this.get('/customers' + query);
    },

    // GET customer by ID
    getCustomer(id) {
        return this.get('/customers/' + id);
    },

    // GET customer's complaints
    getCustomerComplaints(customerId, page = 0, size = 20) {
        return this.get('/customers/' + customerId + '/complaints?page=' + page + '&size=' + size);
    },

    // ===== SLA API =====

    // GET SLA status for a complaint
    getSlaStatus(complaintId) {
        return this.get('/sla/' + complaintId);
    },

    // GET all breached complaints
    getBreachedSla() {
        return this.get('/sla/breached');
    },

    // GET SLA rules
    getSlaRules() {
        return this.get('/sla/rules');
    },

    // POST create/update SLA rule
    updateSlaRule(rule) {
        return this.post('/sla/rules', rule);
    },

    // ===== Reports API =====

    // Download CSV export
    async downloadCsv(from, to) {
        const res = await fetch(BASE_URL + '/api/reports/export?from=' + from + '&to=' + to);
        if (!res.ok) throw new Error('Export failed');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'complaints-' + from + '-to-' + to + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
