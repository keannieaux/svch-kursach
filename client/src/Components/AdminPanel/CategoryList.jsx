import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../store/slice/CategorySlice';
import CategoryUpdateForm from './CategoryUpdateForm';
import ModalCategory from './ModalCategory'; // Ensure this is the correct import
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

  const handleCloseModal = () => {
    console.log('Modal closed');
    setIsModalOpen(false);
    setSelectedCategoryId(null); // Сбрасываем выбранную категорию при закрытии модального окна
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="category-list">
      <h3>Список категорий</h3>
      <ul>
        {categories.map(category => (
          <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
            <span>{category.name}</span>
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
