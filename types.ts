
export enum OrderStatus {
  Pending = 'Pending Pickup',
  PickedUp = 'Picked Up',
  Washing = 'In Wash',
  Drying = 'Drying & Ironing',
  QualityCheck = 'Quality Check',
  OutForDelivery = 'Out for Delivery',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  unit: 'kg' | 'item';
}

export interface SelectedService {
  serviceId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface Order {
  id: string;
  customerName: string;
  pickupAddress: string;
  pickupDate: string;
  pickupTimeSlot: string;
  items: SelectedService[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  hasExpressDelivery: boolean;
  hasStainTreatment: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: string[];
}
