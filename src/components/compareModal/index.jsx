import { useDispatch, useSelector } from "react-redux";
import styles from "./compareModalStyle.module.scss";
import { Button } from "react-bootstrap";
import { HiXMark } from "react-icons/hi2";
import {
  deleteProduct,
  setOpenModal,
  resetModal,
} from "../../app/features/compare/compareSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CompareModal = () => {
  const { compareList } = useSelector((state) => state.compare);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModelHandler = () => {
    dispatch(setOpenModal(false));
  };
  const resetModalHandler = () => {
    dispatch(resetModal([]));
    dispatch(setOpenModal(false));
  };
  const compareProductHandler = () => {
    if(compareList.length > 1){
      navigate("/compare-product");
      dispatch(setOpenModal(false));
    }else{
      toast.warning('Please select at least 2 products to compare')
      return
    }
  };
  return (
    <div className={`fixed-bottom ${styles.compareModalWrapper}`}>
      <ul className={styles.compareList}>
        {compareList.map((item) => {
          return (
            <li key={item.id}>
              <button
                className={styles.removeBtn}
                onClick={() => dispatch(deleteProduct(item))}
              >
                <HiXMark />
              </button>
              <h6>{item.productName}</h6>
              <img
                src={item.imgUrl}
                alt={item.productName}
                className="img-fluid"
              />
            </li>
          );
        })}
      </ul>
      <div className={styles.compareProductControl}>
        <button className={styles.closeModal} onClick={closeModelHandler}>
          <HiXMark />
        </button>
        <Button
          variant="outline-secondary text-uppercase"
          onClick={resetModalHandler}
        >
          {" "}
          Clear All
        </Button>
        <Button className="btn btn-primary" onClick={compareProductHandler}>
          Comparison
        </Button>
      </div>
    </div>
  );
};

export default CompareModal;
