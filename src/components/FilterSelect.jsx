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
      margin: '10px 0',
    }),
  };

  return (
    <Select
      options={options}
      defaultValue={{ value: 'all', label: 'Filter By Category' }}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
