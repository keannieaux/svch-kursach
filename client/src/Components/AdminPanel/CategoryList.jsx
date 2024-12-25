import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, deleteCategory } from '../../store/slice/CategorySlice';
import CategoryUpdateForm from './CategoryUpdateForm';
import ModalCategory from './ModalCategory';
import './Category.css';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(state => state.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    console.log('Category clicked:', categoryId);
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleCloseModal = () => {
    console.log('Modal closed');
    setIsModalOpen(false);
    setSelectedCategoryId(null);
  };

  useEffect(() => {
    console.log('Loading state changed:', isLoading);
  }, [isLoading]);

  useEffect(() => {
    console.log('Error state changed:', error);
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Is Modal Open:', isModalOpen);

  return (
    <div className="category-list">
      <h3>Список категорий</h3>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <span onClick={() => handleCategoryClick(category.id)}>{category.name}</span>
            <button onClick={() => handleDelete(category.id)} className="delete-button">Удалить</button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ModalCategory isOpen={isModalOpen} onClose={handleCloseModal}>
          <CategoryUpdateForm categoryId={selectedCategoryId} onClose={handleCloseModal} />
        </ModalCategory>
      )}
    </div>
  );
};

export default CategoryList;
