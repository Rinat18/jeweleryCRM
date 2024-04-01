import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Layout from "../components/Layout";
import HomePage from "../pages/home/HomePage";
import Staff from "../pages/staff/Staff";
import ProductPage from "../pages/product/ProductPage";
import DetailProduct from "../components/detailProduct/DetailProduct";
import Client from "../pages/client/Client";
import DetailClient from "../components/detailClient/DetailClient";
import CashPage from "../pages/cash/CashPage";

export default function MainRoutes() {
  const NOT_AUTH = [
    { link: "/login", element: <Login /> },
    {
      link: "/",
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
    },
    {
      link: "/staff",
      element: (
        <Layout>
          <Staff />
        </Layout>
      ),
    },
    {
      link: "/product",
      element: (
        <Layout>
          <ProductPage />
        </Layout>
      ),
    },
    {
      link: "/detail/:id",
      element: (
        <Layout>
          <DetailProduct />
        </Layout>
      ),
    },
    {
      link: "/client",
      element: (
        <Layout>
          <Client />
        </Layout>
      ),
    },
    {
      link: "/detailClient/:id",
      element: (
        <Layout>
          <DetailClient />
        </Layout>
      ),
    },
    {
      link: "/cash",
      element: (
        <Layout>
          <CashPage />
        </Layout>
      ),
    },
  ];

  return (
    <Routes>
      {NOT_AUTH.map((elem) => (
        <Route key={elem.link} path={elem.link} element={elem.element} />
      ))}
    </Routes>
  );
}
