import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../store/slice/CategorySlice';

const CategorySelect = ({ selectedCategory, onSelectCategory }) => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error loading categories: {error}</div>;
  }

  return (
    <select value={selectedCategory} onChange={e => onSelectCategory(e.target.value)}>
      <option value="">Select Category</option>
      {categories.map(category => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
