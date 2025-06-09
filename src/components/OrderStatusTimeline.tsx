
import React, { useState, useEffect } from 'react';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import { CheckCircle, Clock, Package, Truck, CircleDot } from 'lucide-react';

interface OrderStatusTimelineProps {
  orderId: string;
  currentStatus: string;
}

interface StatusStep {
  key: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ 
  orderId, 
  currentStatus 
}) => {
  const { fetchOrderStatusHistory } = useOrderTracking();
  const [statusHistory, setStatusHistory] = useState<any[]>([]);

  const statusSteps: StatusStep[] = [
    {
      key: 'pending',
      label: 'Order Placed',
      icon: <CircleDot className="w-4 h-4" />,
      description: 'Your order has been received and is being reviewed'
    },
    {
      key: 'processing',
      label: 'Processing',
      icon: <Package className="w-4 h-4" />,
      description: 'Your order is being prepared for shipment'
    },
    {
      key: 'shipped',
      label: 'Shipped',
      icon: <Truck className="w-4 h-4" />,
      description: 'Your order is on its way to you'
    },
    {
      key: 'delivered',
      label: 'Delivered',
      icon: <CheckCircle className="w-4 h-4" />,
      description: 'Your order has been delivered successfully'
    }
  ];

  useEffect(() => {
    const loadStatusHistory = async () => {
      const history = await fetchOrderStatusHistory(orderId);
      setStatusHistory(history);
    };
    loadStatusHistory();
  }, [orderId, fetchOrderStatusHistory]);

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  const currentStatusIndex = getStatusIndex(currentStatus);

  const getStepClass = (stepIndex: number) => {
    if (stepIndex <= currentStatusIndex) {
      return 'text-primary border-primary bg-primary/10';
    }
    return 'text-muted-foreground border-muted-foreground/30 bg-muted/10';
  };

  const getConnectorClass = (stepIndex: number) => {
    if (stepIndex < currentStatusIndex) {
      return 'bg-primary';
    }
    return 'bg-muted-foreground/30';
  };

  const getStatusDate = (status: string) => {
    const historyItem = statusHistory.find(item => item.status === status);
    return historyItem ? new Date(historyItem.created_at).toLocaleDateString() : null;
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm text-muted-foreground">Order Timeline</h3>
      <div className="relative">
        {statusSteps.map((step, index) => (
          <div key={step.key} className="relative flex items-start space-x-3 pb-6 last:pb-0">
            {/* Connector line */}
            {index < statusSteps.length - 1 && (
              <div 
                className={`absolute left-4 top-8 w-0.5 h-6 ${getConnectorClass(index)}`}
              />
            )}
            
            {/* Status icon */}
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${getStepClass(index)}`}
            >
              {step.icon}
            </div>
            
            {/* Status content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-medium ${index <= currentStatusIndex ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </h4>
                {getStatusDate(step.key) && (
                  <span className="text-xs text-muted-foreground">
                    {getStatusDate(step.key)}
                  </span>
                )}
              </div>
              <p className={`text-xs mt-1 ${index <= currentStatusIndex ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
