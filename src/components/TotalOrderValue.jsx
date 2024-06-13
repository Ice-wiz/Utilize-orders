import React from 'react';

const TotalOrderValue = ({ orders }) => {
  const totalValue = orders.reduce((acc, order) => acc + order.order_value, 0);

  return <div>Total Order Value: ${totalValue}</div>;
};

export default TotalOrderValue;
