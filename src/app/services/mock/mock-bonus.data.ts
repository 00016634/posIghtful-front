export const MOCK_BONUS_RULES = [
  { id: 1, name: 'High Value Sale Bonus', dimension: 'SELL_AMOUNT', operator: 'GTE', value: '$5,000', payoutType: 'percent', payoutValue: '15%', capAmount: '$1,000', priority: 1, isActive: true },
  { id: 2, name: 'Quick Conversion Bonus', dimension: 'LEAD_TO_SELL_DELTA', operator: 'LTE', value: '2 days', payoutType: 'fixed', payoutValue: '$100', capAmount: '', priority: 2, isActive: true },
  { id: 3, name: 'Premium Product Bonus', dimension: 'POTENTIAL_PRODUCT', operator: 'IN', value: 'Premium, Elite', payoutType: 'percent', payoutValue: '12%', capAmount: '$800', priority: 3, isActive: true },
  { id: 4, name: 'Weekend Sale Bonus', dimension: 'SELL_TIME', operator: 'BETWEEN', value: 'Sat-Sun', payoutType: 'fixed', payoutValue: '$50', capAmount: '', priority: 4, isActive: false },
];

export const MOCK_MONTHLY_BONUSES = [
  { month: 'Jan 2026', totalBonus: 52800, agentCount: 41, avgPerAgent: 1288 },
  { month: 'Dec 2025', totalBonus: 48500, agentCount: 40, avgPerAgent: 1213 },
  { month: 'Nov 2025', totalBonus: 45200, agentCount: 39, avgPerAgent: 1159 },
  { month: 'Oct 2025', totalBonus: 43100, agentCount: 38, avgPerAgent: 1134 },
  { month: 'Sep 2025', totalBonus: 41800, agentCount: 38, avgPerAgent: 1100 },
  { month: 'Aug 2025', totalBonus: 39500, agentCount: 37, avgPerAgent: 1068 },
  { month: 'Jul 2025', totalBonus: 38500, agentCount: 35, avgPerAgent: 1100 },
];

export const MOCK_MONTHLY_DETAIL = [
  { agentName: 'Michael Brown', agentCode: 'AG-003', conversions: 18, totalSales: 27300, bonusAmount: 2730 },
  { agentName: 'John Smith', agentCode: 'AG-001', conversions: 15, totalSales: 22500, bonusAmount: 2250 },
  { agentName: 'Sarah Johnson', agentCode: 'AG-002', conversions: 14, totalSales: 21000, bonusAmount: 2100 },
  { agentName: 'Emily Davis', agentCode: 'AG-004', conversions: 12, totalSales: 18300, bonusAmount: 1830 },
  { agentName: 'James Wilson', agentCode: 'AG-005', conversions: 13, totalSales: 19500, bonusAmount: 1950 },
];

export const MOCK_ATTRIBUTION_POLICY = {
  name: 'Default Attribution Policy',
  mode: 'LAST_TOUCH',
  windowValue: 30,
  windowUnit: 'days',
  effectiveFrom: '2026-01-01',
  isActive: true,
};
