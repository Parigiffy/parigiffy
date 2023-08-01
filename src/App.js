import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Lists from "./Components/Lists";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Load from "./imgs/spin.gif";
import { app } from "./Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProductPage from "./Components/ProductPage";
import CartSection from "./Components/CartSection";
import Payment from "./Components/Payment";
import Profile from "./Components/Profile";
import Orders from "./Components/Orders";
import Error from "./Components/Error";
import AllProducts from "./Components/AllProducts";
import Category from "./Components/Category";
import AdminLogin from "./view/Admin/Pages/login";
import AdminPanel from "./view/Admin/Pages/panel";
import ProductsView from "./view/Admin/Pages/products";
import AddProducts from "./view/Admin/Pages/AddProducts";
import EditProducts from "./view/Admin/Pages/EditProducts";
import OrderDetails from "./view/Admin/Pages/OrderDetails";
import Users from "./view/Admin/Pages/Users";
import Departments from "./view/Admin/Pages/Departments";
import BasicSlider from "./Components/Carousel";
import Payments from "./Components/Admin/Payments/Paymets";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <div className='loading'>
          <img src={Load} className='loading-img' />
        </div>
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Navigate to='/home' /> : <Signin />} />
        <Route path='/home' element={<Home />} />
        <Route
          path='/signup'
          element={user ? <Navigate to='/home' /> : <Signup />}
        />
        {user && (
          <>
            
            <Route path='/wishlists' element={<Lists />} />
            <Route path='/cart' element={<CartSection />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/account' element={<Profile />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/category/:id' element={<Category />} />
            <Route path='*' element={<Error />} />
            <Route path='/allproducts' element={<AllProducts />} />
          </>
        )}

        <React.Fragment>
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/admin/products' element={<ProductsView />} />
          <Route path='/admin/addProducts' element={<AddProducts />} />

          <Route path='/admin/payments' element={<Payments />} />
          <Route path='/admin/editProduct/:id' element={<EditProducts />} />
          <Route path='/admin/orders' element={<OrderDetails />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/departments' element={<Departments />} />
        </React.Fragment>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
