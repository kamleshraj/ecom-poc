import { useEffect, useState } from "react";
import styled from "styled-components";
import { SlMagnifier } from "react-icons/sl";
import { useSelector } from "react-redux";
// import useDebounce from "../../hooks/useDebounce";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 440px;
  height: 50px;
  padding: 20px;
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

const SearchBar = ({ setFilterList }) => {
  const [searchWord, setSearchWord] = useState(null);
  const products = useSelector((state) => state.cart.products);
  // const debounceSearchWord = useDebounce(searchWord, 300);
  useEffect(() => {
    if (searchWord === null) {
      setFilterList(products);
    } else {
      setFilterList(
        products.filter((item) =>
          item.productName?.toLowerCase().includes(searchWord.toLowerCase())
        )
      );
    }
  }, [searchWord, setFilterList, products]);
  const handelChange = (input) => {
    setSearchWord(input.target.value);
  };
  return (
    <SearchContainer>
      <input
        type="text"
        placeholder="Search Products..."
        onChange={handelChange}
      />
      <SlMagnifier className="search-icon" />
    </SearchContainer>
  );
};

export default SearchBar;
