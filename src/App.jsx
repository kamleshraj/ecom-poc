import { lazy, Suspense, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CustomNavbar} from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import {Loader} from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Favorite from "./pages/Favorite";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import ProtectedRouter from "./routers/ProtectedRoute";
import CheckOut from "./pages/CheckOut";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const products = useSelector((state)=>state.cart.products)
  const [filterList, setFilterList] = useState(products);
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <CustomNavbar setFilterList={setFilterList}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop setFilterList={setFilterList} filterList={filterList}/>} />
          <Route path="/shop/:id" element={<Product/>} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path='/checkout'
            element={
              <ProtectedRouter>
                <CheckOut />
              </ProtectedRouter>
            }
          />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;