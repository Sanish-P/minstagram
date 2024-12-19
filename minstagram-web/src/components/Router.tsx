import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './login/Login';
import PrivateRouter from './private/Router';
import PublicRoute from './common/PublicRoute';
import PrivateRoute from './common/PrivateRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<PrivateRouter />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter;