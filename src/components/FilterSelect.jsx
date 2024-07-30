import Select from "react-select";
import { products } from "../utils/products";

const options = [
  { value: "all", label: "All" },
  { value: "sofa", label: "Sofa" },
  { value: "chair", label: "Chair" },
  { value: "watch", label: "Watch" },
  { value: "mobile", label: "Mobile" },
  { value: "wireless", label: "Wireless" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    color: "#000",
    borderRadius: "5px",
    boxShadow: "none",
    height: "40px",
    border: "1px solid #e9e9e9",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000",
  }),
};

const FilterSelect = ({ setFilterList }) => {
  const handleChange = (selectedOption) => {
    if (selectedOption.value === "all") {
      setFilterList(products);
    } else {
      setFilterList(
        products.filter((item) => item.category === selectedOption.value)
      );
    }
  };
  return (
    <Select
      options={options}
      defaultValue={{ value: "all", label: "Filter By Category" }}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
