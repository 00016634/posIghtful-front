export const MOCK_AGENTS = [
  { id: 1, fullName: 'John Smith', agentCode: 'AG-001', role: 'agent', supervisor: 'Maria Garcia', region: 'North Region', phone: '+998901234567', hireDate: '2023-01-15', leads: 45, conversions: 18, revenue: 27300, status: 'active', profileImage: '' },
  { id: 2, fullName: 'Sarah Johnson', agentCode: 'AG-002', role: 'agent', supervisor: 'Maria Garcia', region: 'North Region', phone: '+998901234568', hireDate: '2023-03-20', leads: 38, conversions: 15, revenue: 22500, status: 'active', profileImage: '' },
  { id: 3, fullName: 'Michael Brown', agentCode: 'AG-003', role: 'agent', supervisor: 'David Martinez', region: 'South Region', phone: '+998901234569', hireDate: '2023-06-10', leads: 52, conversions: 22, revenue: 33000, status: 'active', profileImage: '' },
  { id: 4, fullName: 'Emily Davis', agentCode: 'AG-004', role: 'agent', supervisor: 'David Martinez', region: 'East Region', phone: '+998901234570', hireDate: '2023-09-05', leads: 29, conversions: 10, revenue: 15000, status: 'active', profileImage: '' },
  { id: 5, fullName: 'James Wilson', agentCode: 'AG-005', role: 'agent', supervisor: 'Lisa Kim', region: 'West Region', phone: '+998901234571', hireDate: '2024-01-12', leads: 18, conversions: 5, revenue: 7500, status: 'inactive', profileImage: '' },
];

export const MOCK_SUPERVISORS = [
  { id: 10, fullName: 'Maria Garcia', agentCode: 'SUP-042', role: 'supervisor', supervisor: 'Robert Johnson', region: 'North Region', phone: '+998909876543', hireDate: '2022-06-15', leads: 340, conversions: 98, revenue: 148500, status: 'active', profileImage: '' },
  { id: 11, fullName: 'David Martinez', agentCode: 'SUP-043', role: 'supervisor', supervisor: 'Robert Johnson', region: 'South Region', phone: '+998909876544', hireDate: '2022-08-20', leads: 280, conversions: 82, revenue: 123000, status: 'active', profileImage: '' },
  { id: 12, fullName: 'Lisa Kim', agentCode: 'SUP-044', role: 'supervisor', supervisor: 'Robert Johnson', region: 'West Region', phone: '+998909876545', hireDate: '2023-02-01', leads: 195, conversions: 56, revenue: 84000, status: 'active', profileImage: '' },
];

export const MOCK_AGENT_PROFILE = {
  fullName: 'John Doe',
  agentCode: 'AG-12345',
  phone: '+998 (90) 123-4567',
  region: 'North Region',
  supervisor: 'Jane Smith',
  hireDate: 'January 15, 2023',
};

export const MOCK_SUPERVISOR_PROFILE = {
  fullName: 'Maria Garcia',
  supervisorCode: 'SUP-042',
  phone: '+998 (90) 987-6543',
  region: 'North Region',
  manager: 'David Martinez',
  hireDate: 'Jun 15, 2022',
};
