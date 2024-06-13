import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ordersState } from '../recoil/atoms';
import OrderList from './OrderList';
import TotalOrderValue from './TotalOrderValue';
import AddOrder from './AddOrder';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function LoggedIn() {
  const { user, logout } = useKindeAuth();
  const [orders, setOrders] = useRecoilState(ordersState);
  const [loading, setLoading] = useState(true);

  // Only fetch data if orders are not already loaded
  useEffect(() => {
    if (orders.length === 0) {
      fetch('/data.json')
        .then(response => response.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [orders.length, setOrders]);

  return (
    <>
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-3xl font-bold text-white">KindeAuth</h1>
          <div className="profile-blob flex items-center space-x-4">
            {user.picture ? (
              <img
                className="w-19 h-10 rounded-full border-2 border-gray-300"
                src={user.picture}
                alt="user profile avatar"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center text-xl">
                {user?.given_name?.[0]}
                {user?.family_name?.[1]}
              </div>
            )}
            <div className="text-white">
              <p className="text-lg font-semibold">
                {user?.given_name} {user?.family_name}
              </p>
              <button className="text-sm text-gray-300 hover:text-white" onClick={logout}>
                Sign out
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : (
            <>
              <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
                <TotalOrderValue orders={orders} />
              </div>
              <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
                <AddOrder />
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <OrderList orders={orders} />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

<style jsx>{`
  .loader {
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`}</style>