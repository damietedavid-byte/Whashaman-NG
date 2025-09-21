
import { Order, ServiceItem, User, OrderStatus } from './types';

export const MOCK_SERVICES: ServiceItem[] = [
  { id: 'wash-fold', name: 'Wash & Fold', price: 1500, unit: 'kg' },
  { id: 'dry-clean', name: 'Dry Cleaning', price: 2000, unit: 'item' },
  { id: 'iron-only', name: 'Iron Only', price: 500, unit: 'item' },
  { id: 'bedding', name: 'Duvets & Bedding', price: 3500, unit: 'item' },
];

export const MOCK_INITIAL_ORDERS: Order[] = [
  {
    id: 'WHG-58GZ1',
    customerName: 'Ada Okoro',
    pickupAddress: '123 Aba Road, Port Harcourt, Rivers State',
    pickupDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    pickupTimeSlot: '10:00 AM - 12:00 PM',
    items: [
      { serviceId: 'wash-fold', quantity: 5, price: 1500, name: 'Wash & Fold' },
      { serviceId: 'dry-clean', quantity: 2, price: 2000, name: 'Dry Cleaning' }
    ],
    total: (5 * 1500) + (2 * 2000),
    status: OrderStatus.Completed,
    createdAt: new Date(Date.now() - 86400000),
    hasExpressDelivery: false,
    hasStainTreatment: true,
  },
  {
    id: 'WHG-92KL3',
    customerName: 'Bayo Adekunle',
    pickupAddress: '456 Trans-Amadi Industrial Layout, Port Harcourt, Rivers State',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTimeSlot: '2:00 PM - 4:00 PM',
    items: [
      { serviceId: 'iron-only', quantity: 10, price: 500, name: 'Iron Only' }
    ],
    total: 10 * 500,
    status: OrderStatus.Washing,
    createdAt: new Date(),
    hasExpressDelivery: true,
    hasStainTreatment: false,
  },
];

export const MOCK_USER: User = {
    id: 'usr-001',
    name: 'Chidi Nwosu',
    email: 'chidi@example.com',
    phone: '+2348012345678',
    addresses: [
        '789 Rumuokoro Street, Port Harcourt, Rivers State'
    ]
};

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
    OrderStatus.Pending,
    OrderStatus.PickedUp,
    OrderStatus.Washing,
    OrderStatus.Drying,
    OrderStatus.QualityCheck,
    OrderStatus.OutForDelivery,
    OrderStatus.Completed,
];
