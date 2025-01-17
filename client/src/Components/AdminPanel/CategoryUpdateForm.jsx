import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryById, updateCategory } from '../../store/slice/CategorySlice';
import './Category.css';

const CategoryUpdateForm = ({ categoryId, onClose }) => {
  const dispatch = useDispatch();
  const { category, isLoading, error } = useSelector(state => state.category);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (categoryId && !category) {
      dispatch(getCategoryById(categoryId));
    }
  }, [dispatch, categoryId, category]);

  useEffect(() => {
    if (category) {
      setName(category.name || '');
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }
    dispatch(updateCategory({ _id: categoryId, formData }));
    onClose();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="inputiki1">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название категории"
        required
      />
      <input
        type="file"
        onChange={handleImageChange}
        placeholder="Изображение категории"
      />
      <button type="submit" disabled={isLoading}>
        Обновить
      </button>
    </form>
  );
};

export default CategoryUpdateForm;
