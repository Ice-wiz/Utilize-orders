import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ordersState } from '../recoil/atoms';

const OrderItem = ({ order }) => {
  const [orders, setOrders] = useRecoilState(ordersState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);

  const productPrices = {
    "Product 1": 29,
    "Product 2": 49,
    "Product 3": 149,
  };

  const calculateOrderValue = (product, quantity) => {
    return productPrices[product] * quantity;
  };

  useEffect(() => {
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      order_value: calculateOrderValue(prevOrder.product, prevOrder.quantity),
    }));
  }, [editedOrder.product, editedOrder.quantity]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedOrders = orders.map((o) =>
      o.id === editedOrder.id ? editedOrder : o
    );
    setOrders(updatedOrders);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedOrders = orders.filter((o) => o.id !== order.id);
    setOrders(updatedOrders);
  };

  return (
    <div className="order-item bg-white shadow-md p-6 mb-4">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="customer_name"
              value={editedOrder.customer_name}
              onChange={handleEditChange}
              className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="customer_email"
              value={editedOrder.customer_email}
              onChange={handleEditChange}
              className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <select
              name="product"
              value={editedOrder.product}
              onChange={handleEditChange}
              className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
              <option value="Product 3">Product 3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={editedOrder.quantity}
              onChange={handleEditChange}
              min="1"
              className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <p className="text-gray-900 font-semibold">Order Value: ${editedOrder.order_value}</p>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-900">{order.customer_name}</h3>
          <p className="text-gray-600">Email: {order.customer_email}</p>
          <p className="text-gray-600">Product: {order.product}</p>
          <p className="text-gray-600">Quantity: {order.quantity}</p>
          <p className="text-gray-900 font-semibold">Order Value: ${order.order_value}</p>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderItem;
