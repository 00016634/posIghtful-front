export const MOCK_USERS = [
  { id: 1, fullName: 'John Smith', email: 'john.smith@acme.com', agentCode: 'AG-001', role: 'agent', region: 'North Region', supervisor: 'Maria Garcia', hireDate: '2023-01-15', status: 'active' },
  { id: 2, fullName: 'Maria Garcia', email: 'maria.garcia@acme.com', agentCode: 'SUP-042', role: 'supervisor', region: 'North Region', supervisor: 'Robert Johnson', hireDate: '2022-06-15', status: 'active' },
  { id: 3, fullName: 'Robert Johnson', email: 'robert.johnson@acme.com', agentCode: 'MGR-001', role: 'manager', region: 'All Regions', supervisor: '', hireDate: '2021-03-01', status: 'active' },
  { id: 4, fullName: 'Lisa Chen', email: 'lisa.chen@acme.com', agentCode: 'ACC-001', role: 'accountant', region: 'HQ', supervisor: '', hireDate: '2022-11-20', status: 'active' },
  { id: 5, fullName: 'Admin User', email: 'admin@acme.com', agentCode: 'ADM-001', role: 'admin', region: 'HQ', supervisor: '', hireDate: '2021-01-01', status: 'active' },
];

export const MOCK_ADMIN_STATS = {
  tenantName: 'Acme Insurance Corp',
  totalUsers: 48,
  activeUsers: 45,
  totalProducts: 8,
};

export const MOCK_RECENT_ACTIVITY = [
  { action: 'New user created', detail: 'James Wilson (Agent)', time: '2 hours ago' },
  { action: 'Product updated', detail: 'Premium Insurance Package', time: '5 hours ago' },
  { action: 'User deactivated', detail: 'Tom Harris (Agent)', time: '1 day ago' },
  { action: 'New product added', detail: 'Family Package', time: '3 days ago' },
];

export const MOCK_ACCOUNTANT_DATA = {
  bonusSummary: [
    { agentName: 'Michael Brown', agentCode: 'AG-003', conversions: 18, totalSales: 27300, bonusAmount: 2730 },
    { agentName: 'John Smith', agentCode: 'AG-001', conversions: 15, totalSales: 22500, bonusAmount: 2250 },
    { agentName: 'Sarah Johnson', agentCode: 'AG-002', conversions: 14, totalSales: 21000, bonusAmount: 2100 },
    { agentName: 'Emily Davis', agentCode: 'AG-004', conversions: 12, totalSales: 18300, bonusAmount: 1830 },
    { agentName: 'James Wilson', agentCode: 'AG-005', conversions: 13, totalSales: 19500, bonusAmount: 1950 },
  ],
  auditTrail: [
    { agentName: 'Michael Brown', agentCode: 'AG-003', leadId: 'LD-10030', customerName: 'Carol Davis', saleDate: '2026-01-20', saleAmount: 2100, ruleName: 'High Value Sale', ruleType: 'percent', bonusAmount: 210, formula: '2100 × 10%' },
    { agentName: 'John Smith', agentCode: 'AG-001', leadId: 'LD-10023', customerName: 'Alice Cooper', saleDate: '2026-01-15', saleAmount: 1500, ruleName: 'Quick Conversion', ruleType: 'fixed', bonusAmount: 100, formula: 'Fixed $100' },
    { agentName: 'Sarah Johnson', agentCode: 'AG-002', leadId: 'LD-10033', customerName: 'Dan Evans', saleDate: '2026-01-25', saleAmount: 1800, ruleName: 'Premium Product', ruleType: 'percent', bonusAmount: 216, formula: '1800 × 12%' },
    { agentName: 'Michael Brown', agentCode: 'AG-003', leadId: 'LD-10036', customerName: 'Eve Franklin', saleDate: '2026-01-28', saleAmount: 1350, ruleName: 'High Value Sale', ruleType: 'percent', bonusAmount: 135, formula: '1350 × 10%' },
    { agentName: 'Emily Davis', agentCode: 'AG-004', leadId: 'LD-10039', customerName: 'Frank Green', saleDate: '2026-02-01', saleAmount: 1650, ruleName: 'Quick Conversion', ruleType: 'fixed', bonusAmount: 100, formula: 'Fixed $100' },
    { agentName: 'John Smith', agentCode: 'AG-001', leadId: 'LD-10042', customerName: 'Grace Hill', saleDate: '2026-02-05', saleAmount: 1950, ruleName: 'Premium Product', ruleType: 'percent', bonusAmount: 234, formula: '1950 × 12%' },
    { agentName: 'James Wilson', agentCode: 'AG-005', leadId: 'LD-10045', customerName: 'Henry Irving', saleDate: '2026-02-08', saleAmount: 1200, ruleName: 'Weekend Sale', ruleType: 'fixed', bonusAmount: 50, formula: 'Fixed $50' },
  ],
};
