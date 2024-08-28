import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setProducts,
  setSelectedCategory,
} from "../../Redux/products/productSlice";
import styles from './searchBox.module.scss'

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { products} = useSelector((state) => state.products);
  const [suggestions, setSuggestions] = useState([]);
  const categories = [...new Set(products.map((product) => product.category))];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = (category) => {
    if (typeof category !== "string" || category.trim() === "") return;
    setSearchText(category);
    navigate("/shop");
    setSuggestions([]);
    dispatch(setSelectedCategory(category));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (value.length > 0) {
      const filteredSuggestions = categories
        .filter((category) =>
          category.toLowerCase().includes(value.toLowerCase())
        )
        .map(
          (category) => category.charAt(0).toUpperCase() + category.slice(1)
        );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setSelectedCategory(products);
      dispatch(setProducts(products))
    }
  };
  return (
    <div className={styles.searchBoxWrapper}>
      <input
        type="text"
        placeholder="Search Categories..."
        value={searchText}
        onChange={handleChange}
      />
      <SlMagnifier className="search-icon" />
      {suggestions.length > 0 && (
        <div className="searchSuggestion">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
