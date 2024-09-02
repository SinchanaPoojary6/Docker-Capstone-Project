import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <div className="App">
      <h1>eCommerce App</h1>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<OrderForm />} />
      </Routes>
    </div>
  );
}

export default App;
