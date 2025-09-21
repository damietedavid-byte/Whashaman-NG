
import React from 'react';
import { OrderStatus } from '../types';
import { ORDER_STATUS_SEQUENCE } from '../constants';
import { CheckCircleIcon } from './IconComponents';

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
}

const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ currentStatus }) => {
  const currentStatusIndex = ORDER_STATUS_SEQUENCE.indexOf(currentStatus);

  return (
    <div className="space-y-4">
      {ORDER_STATUS_SEQUENCE.map((status, index) => {
        const isCompleted = index < currentStatusIndex;
        const isActive = index === currentStatusIndex;
        
        let statusColor = 'text-slate-400';
        if (isCompleted) statusColor = 'text-whasha-green';
        if (isActive) statusColor = 'text-whasha-blue';

        return (
          <div key={status} className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-whasha-green' : isActive ? 'bg-whasha-blue animate-pulse' : 'bg-slate-300'}`}>
                {isCompleted ? (
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                ) : (
                  <span className={`font-bold text-white`}>{index + 1}</span>
                )}
              </div>
              {index < ORDER_STATUS_SEQUENCE.length - 1 && (
                <div className={`w-0.5 h-12 mt-1 ${isCompleted ? 'bg-whasha-green' : 'bg-slate-300'}`}></div>
              )}
            </div>
            <div>
              <h4 className={`font-bold ${isActive ? 'text-slate-800' : 'text-slate-600'}`}>{status}</h4>
              <p className={`text-sm ${statusColor}`}>
                {isActive && "Your order is currently at this stage."}
                {isCompleted && "This stage has been completed."}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatusTimeline;
