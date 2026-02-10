export const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Insurance Package', category: 'Insurance', description: 'Comprehensive coverage for individuals and families', status: 'active', createdDate: '2024-01-10' },
  { id: 2, name: 'Basic Insurance Package', category: 'Insurance', description: 'Essential coverage at an affordable price', status: 'active', createdDate: '2024-01-10' },
  { id: 3, name: 'Elite Insurance Package', category: 'Insurance', description: 'Top-tier coverage with premium benefits', status: 'active', createdDate: '2024-02-15' },
  { id: 4, name: 'Family Package', category: 'Insurance', description: 'Complete family protection plan', status: 'active', createdDate: '2024-03-20' },
];

export const MOCK_PRODUCT_FUNNELS = [
  {
    productId: 1,
    productName: 'Premium Insurance',
    stages: [
      { id: 1, name: 'Initial Contact', order: 1, description: 'First interaction with prospect' },
      { id: 2, name: 'Qualification', order: 2, description: 'Assess customer needs and eligibility' },
      { id: 3, name: 'Proposal', order: 3, description: 'Present insurance proposal' },
      { id: 4, name: 'Negotiation', order: 4, description: 'Discuss terms and pricing' },
      { id: 5, name: 'Closed Won', order: 5, description: 'Policy signed and active' },
    ],
  },
  {
    productId: 2,
    productName: 'Basic Insurance',
    stages: [
      { id: 6, name: 'Lead', order: 1, description: 'New lead received' },
      { id: 7, name: 'Contact Made', order: 2, description: 'Customer contacted' },
      { id: 8, name: 'Quote Sent', order: 3, description: 'Insurance quote provided' },
      { id: 9, name: 'Closed Won', order: 4, description: 'Policy signed' },
    ],
  },
];
