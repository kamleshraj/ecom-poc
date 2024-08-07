import { useState } from "react";
import styled from "styled-components";
import { SlMagnifier } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
// import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { setSelectedCategory } from "../../app/features/products/productSlice";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 440px;
  height: 50px;
  padding: 10px 20px;
  border-radius: 50px;
  background-color: #f2f2f2;
  width: 100%;
  align-self: center;
  align-items: center;
  input {
    width: 100%;
    height: 100%;
    padding: 8px;
    border: none;
    font-size: 16px;
    color: #333;
    outline: none;
    background: transparent;
  }
`;
const SuggestionsList = styled.ul`
  position: absolute;
  top: 50px;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 11;
  li {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const { products } = useSelector((state) => state.products);
  const [suggestions, setSuggestions] = useState([]);
  const categories = [...new Set(products.map((product) => product.category))];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const debounceSearchWord = useDebounce(searchWord, 300);

  // useEffect(() => {
  //   if (searchWord === null) {
  //     setFilterList(products);
  //   } else {
  //     setFilterList(
  //       products.filter((item) =>
  //         item.productName?.toLowerCase().includes(searchWord.toLowerCase())
  //       )
  //     );
  //   }
  // }, [searchWord, setFilterList, products]);

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
      const filteredSuggestions = categories.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setSelectedCategory(products);
    }
  };
  return (
    <SearchContainer>
      <input
        type="text"
        placeholder="Search Categories..."
        value={searchText}
        onChange={handleChange}
      />
      <SlMagnifier className="search-icon" />
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion}
            </li>
          ))}
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};
