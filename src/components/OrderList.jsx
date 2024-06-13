import React, { useState } from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);


  const totalPages = Math.ceil(orders.length / itemsPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {currentOrders.map(order => (
        <OrderItem key={order.id} order={order} />
      ))}

      <div className="pagination">
        {}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
        .pagination button {
          margin: 0 5px;
          padding: 5px 10px;
          border: 1px solid #ccc;
          background-color: #fff;
          cursor: pointer;
        }
        .pagination button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .pagination button.active {
          font-weight: bold;
          background-color: #eee;
        }
      `}</style>
    </div>
  );
};

export default OrderList;
