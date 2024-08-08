import React from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { setSelectedCategory } from '../app/features/products/productSlice';

const FilterSelect = () => {
  const dispatch = useDispatch();

  const handleChange = (selectedOption) => {
    dispatch(setSelectedCategory(selectedOption.value));
  };

  const options = [
    { value: "All", label: "All" },
    { value: "Sofa", label: "Sofa" },
    { value: "Chair", label: "Chair" },
    { value: "Watch", label: "Watch" },
    { value: "Mobile", label: "Mobile" },
    { value: "Wireless", label: "Wireless" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      margin: '10px 0',
    }),
  };

  return (
    <Select
      options={options}
      defaultValue={{ value: 'All', label: 'Category' }}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
