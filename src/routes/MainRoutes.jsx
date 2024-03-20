import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Layout from "../components/Layout";
import HomePage from "../pages/home/HomePage";
import Staff from "../pages/staff/Staff";
import ProductPage from "../pages/product/ProductPage";

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
  }
  ];

  return (
    <Routes>
      {NOT_AUTH.map((elem) => (
        <Route key={elem.link} path={elem.link} element={elem.element} />
      ))}
    </Routes>
  );
}
