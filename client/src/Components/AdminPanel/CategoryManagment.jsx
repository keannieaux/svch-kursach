import React from 'react';
import CategoryAddForm from './CategoryAddForm';
import CategoryList from './CategoryList';
import './Category.css';

const CategoryManagement = () => {
  return (
    <div className='centiosq'>
      <div>
        <CategoryAddForm />
        <CategoryList />
      </div>
    </div>
  );
};

export default CategoryManagement;
