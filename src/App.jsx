import {Suspense, useEffect } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { products } from "./db/data.js";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "./Redux/products/productSlice.js";
import AppRoutes from "./routers/AppRoutes.js";
import {Loader} from "./components/Loader";

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
        <AppRoutes />
      </Router>
    </Suspense>
  );
}

export default App;