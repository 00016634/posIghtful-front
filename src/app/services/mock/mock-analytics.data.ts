export const MOCK_AGENT_METRICS = {
  leadsByDay: { value: 45, trend: '+12% from yesterday' },
  leadsConverted: { value: 18, trend: '40% conversion rate' },
  salesByDay: { value: 12, trend: '+8% from yesterday' },
  pendingLeads: { value: 27, trend: '3 follow-ups due' },
};

export const MOCK_SUPERVISOR_METRICS = {
  activeAgents: { value: '12/15', trend: '3 inactive' },
  avgLeadsPerAgent: { value: '3.8', trend: '+0.5 from last week' },
  avgTicket: { value: '$1,245', trend: '+$120 from last month' },
  conversionRate: { value: '24.5%', trend: '+2.3% from last month' },
  totalRevenue: { value: '$87,650', trend: '+15% from last month' },
};

export const MOCK_MANAGER_METRICS = {
  totalAgents: { value: 41, subtitle: '3 supervisors' },
  totalRevenue: { value: '$425,000', trend: '+18% from last quarter' },
  conversionRate: { value: '28.7%', trend: '+3.2% from last quarter' },
  bonusExpenses: { value: '$42,500', trend: '10% of revenue' },
};

export const MOCK_CONVERSION_CHART = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    { name: 'Leads', data: [45, 52, 48, 58, 65, 42, 38], color: '#8884d8' },
    { name: 'Conversions', data: [12, 19, 15, 22, 28, 18, 14], color: '#82ca9d' },
  ],
};

export const MOCK_REVENUE_TREND = {
  labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  datasets: [
    { name: 'Revenue', data: [52000, 58000, 61000, 55000, 67000, 72000, 78000], color: '#3b82f6' },
    { name: 'Target', data: [50000, 55000, 60000, 60000, 65000, 70000, 75000], color: '#94a3b8' },
  ],
};

export const MOCK_PERSONNEL_CHART = {
  labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  datasets: [
    { name: 'Agents', data: [35, 36, 37, 38, 39, 40, 41], color: '#3b82f6' },
    { name: 'Supervisors', data: [3, 3, 3, 3, 3, 3, 3], color: '#8b5cf6' },
  ],
};

export const MOCK_CONVERSION_RATE_TREND = {
  labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  datasets: [
    { name: 'Conversion Rate', data: [22, 23, 21, 24, 25, 26, 25, 27, 26, 28, 29, 28.7], color: '#10b981' },
  ],
};

export const MOCK_SUPERVISOR_PERFORMANCE = [
  { name: 'Maria Garcia', code: 'SUP-042', agents: 15, leads: 340, conversions: 98, revenue: 148500 },
  { name: 'David Martinez', code: 'SUP-043', agents: 14, leads: 280, conversions: 82, revenue: 123000 },
  { name: 'Lisa Kim', code: 'SUP-044', agents: 12, leads: 195, conversions: 56, revenue: 84000 },
];

export const MOCK_TOP_AGENTS = [
  { name: 'Michael Brown', code: 'AG-003', leads: 52, conversions: 22, revenue: 33000 },
  { name: 'John Smith', code: 'AG-001', leads: 45, conversions: 18, revenue: 27300 },
  { name: 'Sarah Johnson', code: 'AG-002', leads: 38, conversions: 15, revenue: 22500 },
];

export const MOCK_PERFORMANCE_CHART = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    { name: 'Leads', data: [85, 92, 88, 95], color: '#3b82f6' },
    { name: 'Conversions', data: [24, 28, 25, 31], color: '#10b981' },
  ],
};
