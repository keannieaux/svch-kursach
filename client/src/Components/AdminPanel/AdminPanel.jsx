import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import productIcon from '../../img/heart.png';
import userIcon from '../../img/user.png';
import orderIcon from '../../img/box.png';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../store/slice/cartSlice';
import { getOrders } from '../../store/slice/orderSlice';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import UserSelect from './UserSelect';

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState('');
  const carts = useSelector(state => state.cart.items);
  const orders = useSelector(state => state.order.orders);
  const isLoadingCarts = useSelector(state => state.cart.isLoading);
  const isLoadingOrders = useSelector(state => state.order.isLoading);
  const { users, isLoading: isLoadingUsers } = useSelector(state => state.user);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getCartItems(selectedUserId));
      dispatch(getOrders(selectedUserId));
    }
  }, [selectedUserId, dispatch]);

  useEffect(() => {
    console.log('Users:', users);
    console.log('Orders:', orders);
  }, [users, orders]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const generateCartReport = () => {
    if (!carts.length) {
      alert("No carts available to generate report.");
      return;
    }

    if (!Array.isArray(users.rows)) {
      console.error("Users data is not an array");
      return;
    }

    console.log("Selected User ID:", selectedUserId);
    const selectedUser = users.rows.find(user => user.id === Number(selectedUserId));

    if (!selectedUser) {
      console.error("Selected user not found");
      alert("Selected user not found.");
      return;
    }

    const pdfDoc = new jsPDF();
    pdfDoc.setFont("times", "bold");
    pdfDoc.setFontSize(14);
    pdfDoc.setCharSpace(0.5);
    
    const formattedDate = new Date().toLocaleDateString();
    pdfDoc.text(`Cart Report. Date: ${formattedDate}`, 10, 10);
    pdfDoc.text(`Creator of report: Admin`, 10, 20);
    pdfDoc.text(`User Email: ${selectedUser.email}`, 10, 30);

    const columns = ["Product Name", "Quantity"];
    const rows = carts.map(cart => [
      cart.Product.name,
      cart.quantity
    ]);

    console.log("Report rows:", rows);

    autoTable(pdfDoc, {
      theme: "grid",
      headStyles: { fontSize: 10 },
      bodyStyles: { fontSize: 8, fontStyle: "italic" },
      head: [columns],
      body: rows,
      startY: 40,
    });

    pdfDoc.save("CartReport.pdf");
  };

  const generateOrderReport = () => {
    if (!orders.length) {
      alert("No orders available to generate report.");
      return;
    }

    if (!Array.isArray(users.rows)) {
      console.error("Users data is not an array");
      return;
    }

    console.log("Selected User ID:", selectedUserId);
    const selectedUser = users.rows.find(user => user.id === Number(selectedUserId));

    if (!selectedUser) {
      console.error("Selected user not found");
      alert("Selected user not found.");
      return;
    }

    const pdfDoc = new jsPDF();
    pdfDoc.setFont("times", "bold");
    pdfDoc.setFontSize(14);
    pdfDoc.setCharSpace(0.5);
    
    const formattedDate = new Date().toLocaleDateString();
    pdfDoc.text(`Order Report. Date: ${formattedDate}`, 10, 10);
    pdfDoc.text(`Creator of report: Admin`, 10, 20);
    pdfDoc.text(`User Email: ${selectedUser.email}`, 10, 30);

    const columns = ["Order ID", "Product Name", "Quantity", "Price"];
    const rows = orders.map(order => {
      console.log("Order data:", order);
      return order.items.map(item => [
        order.id,
        item.productName,
        item.quantity,
        item.productPrice
      ]);
    }).flat();

    console.log("Report rows:", rows);

    autoTable(pdfDoc, {
      theme: "grid",
      headStyles: { fontSize: 10 },
      bodyStyles: { fontSize: 8, fontStyle: "italic" },
      head: [columns],
      body: rows,
      startY: 40,
    });

    pdfDoc.save("OrderReport.pdf");
  };

  return (
    <div className='admen'>
      <div className='admin-panel'>
        <h2>Admin Panel</h2>
        <div className="user-select-container">
          <UserSelect selectedUserId={selectedUserId} onSelectUser={setSelectedUserId} />
        </div>
        <div className="admin-buttons">
          <button className="admin-button" onClick={() => handleNavigation('/admin/products')}><img src={productIcon} alt="Products" /> Products</button>
          <button className="admin-button" onClick={() => handleNavigation('/admin/users')}><img src={userIcon} alt="Users" /> Users</button>
          <button className="admin-button" onClick={() => handleNavigation('/admin/category')}><img src={orderIcon} alt="Category" /> Category</button>
          <button className="admin-button" onClick={generateCartReport} disabled={!selectedUserId || isLoadingUsers || isLoadingCarts}>
            <img src={orderIcon} alt="Cart Report" /> Generate Cart Report
          </button>
          <button className="admin-button" onClick={generateOrderReport} disabled={!selectedUserId || isLoadingUsers || isLoadingOrders}>
            <img src={orderIcon} alt="Order Report" /> Generate Order Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
