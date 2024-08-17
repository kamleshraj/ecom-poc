import { lazy, Suspense, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CustomNavbar} from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import {Loader} from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRouter from "./routers/ProtectedRoute";
import { products } from "./db/data.js";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "./app/features/products/productSlice";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Favorite = lazy(() => import("./pages/Favorite"));
const CompareProduct = lazy(() => import("./pages/CompareProduct"));

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setProducts(products));
      dispatch(setLoading(false));
    }, 100);
  }, [dispatch]);

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
        <CustomNavbar/>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop />} />
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
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/compare-product" element={<CompareProduct/>}/>
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;