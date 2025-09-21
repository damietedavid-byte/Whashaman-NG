
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Order, User, OrderStatus } from '../types';
import { MOCK_INITIAL_ORDERS, MOCK_USER } from '../constants';

interface AppContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  orders: Order[];
  getOrder: (orderId: string) => Order | undefined;
  addOrder: (newOrder: Omit<Order, 'id' | 'createdAt' | 'customerName'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Start logged out
  const [orders, setOrders] = useState<Order[]>(MOCK_INITIAL_ORDERS);

  const login = useCallback(() => {
    setUser(MOCK_USER);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const getOrder = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);
  
  const addOrder = (newOrderData: Omit<Order, 'id' | 'createdAt' | 'customerName'>): Order => {
    if (!user) {
      throw new Error("User must be logged in to place an order.");
    }
    const newOrder: Order = {
      ...newOrderData,
      id: `WHG-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      createdAt: new Date(),
      customerName: user.name,
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const value = { user, login, logout, orders, getOrder, addOrder, updateOrderStatus };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
