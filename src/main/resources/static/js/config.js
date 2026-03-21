// ===== COMPLYNT CONFIGURATION =====

// Base URL for API calls - Change this for production
const BASE_URL = '';  // Empty for same-origin, or 'http://localhost:8080' for development

// Severity color mapping
const SEVERITY_COLORS = {
    P1: '#BB0000',
    P2: '#E9730C',
    P3: '#0070F2',
    P4: '#8C9BAB'
};

// Status color mapping
const STATUS_COLORS = {
    'OPEN': '#0070F2',
    'IN_PROGRESS': '#E9730C',
    'RESOLVED': '#188918',
    'ESCALATED': '#BB0000',
    'CLOSED': '#8C9BAB'
};

// SLA status colors
const SLA_COLORS = {
    'ON_TRACK': '#188918',
    'AT_RISK': '#E9730C',
    'BREACHED': '#BB0000'
};

// Product type labels
const PRODUCT_LABELS = {
    'CREDIT_CARD': 'Credit Card',
    'HOME_LOAN': 'Home Loan',
    'SAVINGS_ACCOUNT': 'Savings Account',
    'FIXED_DEPOSIT': 'Fixed Deposit',
    'INSURANCE': 'Insurance',
    'PERSONAL_LOAN': 'Personal Loan',
    'OTHER': 'Other'
};

// Channel labels
const CHANNEL_LABELS = {
    'WEB': 'Web Portal',
    'EMAIL': 'Email',
    'WHATSAPP': 'WhatsApp',
    'PHONE': 'Phone',
    'CHAT': 'Chat'
};

// Default pagination settings
const DEFAULT_PAGE_SIZE = 15;

// Toast duration in milliseconds
const TOAST_DURATION = 4000;
