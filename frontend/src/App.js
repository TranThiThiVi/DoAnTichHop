import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Register/Register";
import Sizecheck from "./pages/Sizecheck/Sizecheck";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Payment from "./pages/Payment/Payment";
import PaymentOrders from "./pages/PaymentOrders/PaymentOrders";
import Cart from "./pages/Cart/Cart";
import AccountManagement from "./pages/Admin/AccountManagement/AccountManagement";
import History from "./pages/History/History";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import SaleProduct from "./pages/SaleProduct/SaleProduct";
import CatalogManagement from "./pages/Admin/CatalogManagement/CatalogManagement";
import OrderManagement from "./pages/Admin/OrderManagement/OrderManagement";
import PaymentManagement from "./pages/Admin/PaymentManagement/PaymentManagement";

function App() {
  const admin = localStorage.getItem("admin");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/size-check" element={<Sizecheck />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          {/* {admin === false && ( */}
          <Route path="/productDetail/payment/:id" element={<Payment />} />
          {/* )} */}
          {/* {admin === false && ( */}
          <Route
            path="/productDetail/order/payment/:id"
            element={<PaymentOrders />}
          />
          {/* )} */}
          <Route path="/sale-product" element={<SaleProduct />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/account" element={<AccountManagement />} />
          <Route path="/admin/order" element={<OrderManagement />} />
          <Route path="/admin/payment" element={<PaymentManagement />} />
          <Route path="/admin/catalog" element={<CatalogManagement />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
