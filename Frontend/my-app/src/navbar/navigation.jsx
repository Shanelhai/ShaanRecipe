import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from './routes';
import Navbar from './navbar';

const Navigation = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {Object.entries(ROUTES).map(([key, route]) => (
          <Route key={key} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
