import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';

import ProtectedRouter from './ProtectedRoute';
import {Loader} from '../components/Loader';

const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const Cart = lazy(() => import("../pages/Cart"));
const Product = lazy(() => import("../pages/Product"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const CheckOut = lazy(() => import("../pages/CheckOut"));
const Favorite = lazy(() => import("../pages/Favorite"));
const CompareProduct = lazy(() => import("../pages/CompareProduct"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="checkout"
            element={
              <ProtectedRouter>
                <CheckOut />
              </ProtectedRouter>
            }
          />
          <Route path="favorite" element={<Favorite />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="compare-product" element={<CompareProduct />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
