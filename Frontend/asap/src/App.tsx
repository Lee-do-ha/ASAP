import React from 'react';
import TopButton from 'components/common/TopButton';
import './App.scss';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import routes from 'router/data/routes';
import ScrollToTop from 'router/route/ScrollToTop';

import NavBar from 'components/nav/NavBar';
import Footer from 'components/common/Footer';

function AppBody() {
  const location = useLocation();
  const showFooter = !location.pathname.includes('admin');

  return (
    <div>
      <ScrollToTop />
      <NavBar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {showFooter && <Footer />}
      <TopButton />
    </div>
  );
}

function App() {
  return (
    <div className="font-container">
      <BrowserRouter>
        <AppBody />
      </BrowserRouter>
    </div>
  );
}

export default App;
