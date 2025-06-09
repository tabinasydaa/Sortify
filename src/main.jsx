import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Membungkus aplikasi dengan BrowserRouter
import App from './App'; // Mengimpor komponen utama
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>  {/* Membungkus seluruh aplikasi dengan BrowserRouter */}
    <App />
  </BrowserRouter>
);
