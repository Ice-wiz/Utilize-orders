import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ordersState } from '../recoil/atoms';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddOrder = () => {
    const [orders, setOrders] = useRecoilState(ordersState);
    const [newOrder, setNewOrder] = useState({
        id: uuidv4(),
        customer_name: '',
        customer_email: '',
        product: 'Product 1',
        quantity: 1,
        order_value: 29,
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [showFilteredOrders, setShowFilteredOrders] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder((prevOrder) => {
            const updatedOrder = { ...prevOrder, [name]: value };
            if (name === 'product' || name === 'quantity') {
                updatedOrder.order_value = calculateOrderValue(updatedOrder.product, updatedOrder.quantity);
            }
            return updatedOrder;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrders([newOrder, ...orders]);
        setNewOrder({
            id: uuidv4(),
            customer_name: '',
            customer_email: '',
            product: 'Product 1',
            quantity: 1,
            order_value: 29,
        });
        setIsFormOpen(false);
    };

    const calculateOrderValue = (product, quantity) => {
        const productPrices = {
            'Product 1': 29,
            'Product 2': 49,
            'Product 3': 149,
        };
        return productPrices[product] * quantity;
    };

    const filteredOrders = orders.filter(order => {
        return (
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (priceRange === '' ||
                (priceRange === '1-100' && order.order_value >= 1 && order.order_value <= 100) ||
                (priceRange === '100-200' && order.order_value >= 100 && order.order_value <= 200) ||
                (priceRange === '200-300' && order.order_value >= 200 && order.order_value <= 300) ||
                (priceRange === '300-400' && order.order_value >= 300 && order.order_value <= 400) ||
                (priceRange === '400-500' && order.order_value >= 400 && order.order_value <= 500) ||
                (priceRange === '500-600' && order.order_value >= 500 && order.order_value <= 600) ||
                (priceRange === '600-700' && order.order_value >= 600 && order.order_value <= 700) ||
                (priceRange === '700-800' && order.order_value >= 700 && order.order_value <= 800) ||
                (priceRange === '800-900' && order.order_value >= 800 && order.order_value <= 900) ||
                (priceRange === '900-1000' && order.order_value >= 900 && order.order_value <= 1000) ||
                (priceRange === '1000+' && order.order_value > 1000)) &&
            (newOrder.product === 'All' || order.product === newOrder.product)
        );
    });

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const openModal = () => {
        setShowFilteredOrders(true);
    };

    const closeModal = () => {
        setShowFilteredOrders(false);
    };

    return (
        <div className="add-order-container p-4 bg-gray-50 h-1/2 flex">
            <div className="add-order-form-container w-1/2 pr-4">
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add New Order
                </button>

                {isFormOpen && (
                    <div className="add-order-form p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Add New Order</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="customer_name"
                                placeholder="Customer Name"
                                value={newOrder.customer_name}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="email"
                                name="customer_email"
                                placeholder="Customer Email"
                                value={newOrder.customer_email}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <select
                                name="product"
                                value={newOrder.product}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="Product 1">Product 1</option>
                                <option value="Product 2">Product 2</option>
                                <option value="Product 3">Product 3</option>
                            </select>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={newOrder.quantity}
                                onChange={handleInputChange}
                                min="1"
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Add Order
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <div className="search-filter-container w-1/2 pl-4">
                <div className="search-bar-container flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by customer name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded mr-2"
                    />

                    <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="p-2 border border-gray-300 rounded mr-2"
                    >
                        <option value="">Price Range</option>
                        <option value="1-100">1 - 100</option>
                        <option value="100-200">100 - 200</option>
                        <option value="200-300">200 - 300</option>
                        <option value="300-400">300 - 400</option>
                        <option value="400-500">400 - 500</option>
                        <option value="500-600">500 - 600</option>
                        <option value="600-700">600 - 700</option>
                        <option value="700-800">700 - 800</option>
                        <option value="800-900">800 - 900</option>
                        <option value="900-1000">900 - 1000</option>
                        <option value="1000+">1000+</option>
                    </select>

                    <select
                        name="product"
                        value={newOrder.product}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="Product 1">Product 1</option>
                        <option value="Product 2">Product 2</option>
                        <option value="Product 3">Product 3</option>
                    </select>

                    <button
                        onClick={openModal}
                        className="p-2 ml-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
            </div>

            <Modal
                isOpen={showFilteredOrders}
                onRequestClose={closeModal}
                contentLabel="Filtered Orders"
                className="modal bg-white p-4 rounded shadow-lg"
                overlayClassName="modal-overlay bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
            >
                <h2 className="text-xl font-bold mb-4">Filtered Orders</h2>
                {currentOrders.length > 0 ? (
                    <>
                        <ul className="divide-y divide-gray-300 mb-4">
                            {currentOrders.map(order => (
                                <li key={order.id} className="py-2">
                                    {order.customer_name} - {order.product} - ${order.order_value}
                                </li>
                            ))}
                        </ul>
                        <div className="pagination mt-4 flex justify-between">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={currentOrders.length < ordersPerPage}
                                className={`px-3 py-1 rounded ${currentOrders.length < ordersPerPage ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No orders found.</p>
                )}
                <button onClick={closeModal} className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default AddOrder;
