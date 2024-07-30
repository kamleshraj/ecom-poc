import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { SlHeart, SlEye, SlBasket } from "react-icons/sl";
import styled from "styled-components";

const ItemWrapper = styled.div`
  background-color: #fff;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  transition: 1s ease-in-out;
  border: 1px solid #dfdfdf85;
  min-height: 330px;
  position: relative;
  cursor: pointer;
  margin: 0 5px;
  .discount {
  position: absolute;
  top: 0;
  left: 0;
  background: #ff5533;
  padding: 3px 10px;
  font-size: 0.7rem;
  border-radius: 50px;
  color: #fff;
  margin:10px 0 0 10px;
  z-index: 11;
}
  img {
    width: 100%;
    object-fit: cover;
    max-height: 150px;
    transition: all .5s ease-in-out;
    &:hover{transform:scale(1.2)}
  }
  .product-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    .product-title {
      font-size: 1rem;
      padding-top: 1rem;
      font-weight: 500;
    }
    .rating-review-count {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      .rating-count {
        font-size: 0.8rem;
      }
      .rate {
        color: #ffcf67;
      }
    }
    .price{
      align-self: self-start;
      padding-top: 5px;
    }
  }
  .product-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 15px;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-size: 1.5rem;
    }
  }
  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    .price{color:#ff5533}
    .product-icon {
      opacity: 1;
      transition: all 0.5s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      button {
        svg {
          transition: color 0.3s ease;
        }
        &:hover svg {
          color: #ff5533;
        }
      }
    }
  }
`;

const ProductCard = ({ productItem,title }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };
  const handleAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };
  return (
    <ItemWrapper>
      {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.imgUrl}
        alt={productItem.title}
      />
      <div className="product-icon">
        <button
          aria-label="Add"
          type="submit"
          onClick={() => handleAdd(productItem)}
        >
          <SlBasket />
        </button>
        <button>
          <SlHeart />
        </button>
        <button onClick={() => handelClick()}>
          <SlEye />
        </button>
      </div>
      <div className="product-details">
        <p className="product-title" onClick={() => handelClick()}>
          {productItem.productName}
        </p>
        <div className="rating-review-count">
          <div className="rate">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <div className="rating-count">{productItem.avgRating}</div>
        </div>
        <div className="price">
          {productItem.prevPrice?
          (<div style={{display:'flex',gap:'10px', alignItems:'center',justifyContent:'center'}}><del>${productItem.prevPrice}</del> <h4>${productItem.price}</h4></div>):
          <h4>${productItem.price}</h4>
          }
        </div>
      </div>
    </ItemWrapper>
  );
};

export default ProductCard;
