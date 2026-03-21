// ===== Complynt Configuration =====
const BASE_URL = '';  // Same origin - no need for localhost:8080

const SEVERITY_COLORS = {
    P1: '#BB0000',
    P2: '#E9730C',
    P3: '#0070F2',
    P4: '#8C9BAB'
};

const STATUS_COLORS = {
    'OPEN': '#0070F2',
    'IN_PROGRESS': '#E9730C',
    'RESOLVED': '#188918',
    'ESCALATED': '#7C3AED',
    'CLOSED': '#8C9BAB'
};

const SLA_COLORS = {
    'ON_TRACK': '#188918',
    'AT_RISK': '#E9730C',
    'BREACHED': '#BB0000'
};

const PRODUCTS = [
    { value: 'CREDIT_CARD', label: 'Credit Card' },
    { value: 'HOME_LOAN', label: 'Home Loan' },
    { value: 'SAVINGS_ACCOUNT', label: 'Savings Account' },
    { value: 'FIXED_DEPOSIT', label: 'Fixed Deposit' },
    { value: 'INSURANCE', label: 'Insurance' },
    { value: 'PERSONAL_LOAN', label: 'Personal Loan' },
    { value: 'OTHER', label: 'Other' }
];

const STATUSES = [
    { value: 'OPEN', label: 'Open' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'RESOLVED', label: 'Resolved' },
    { value: 'ESCALATED', label: 'Escalated' },
    { value: 'CLOSED', label: 'Closed' }
];

const SEVERITIES = [
    { value: 'P1', label: 'P1 Critical' },
    { value: 'P2', label: 'P2 High' },
    { value: 'P3', label: 'P3 Medium' },
    { value: 'P4', label: 'P4 Low' }
];

const ISSUE_TYPES = [
    { value: 'TRANSACTION_DISPUTE', label: 'Transaction Dispute' },
    { value: 'FEE_COMPLAINT', label: 'Fee Issue / Hidden Charges' },
    { value: 'KYC_ISSUE', label: 'KYC / Documentation' },
    { value: 'SERVICE_OUTAGE', label: 'Service Outage / App Issue' },
    { value: 'FRAUD_REPORT', label: 'Fraud Report (Urgent)' },
    { value: 'GENERAL_INQUIRY', label: 'General Inquiry' },
    { value: 'OTHER', label: 'Other' }
];
