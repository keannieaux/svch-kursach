import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory, getCategoryById } from '../../store/slice/CategorySlice';
import './Category.css';

const CategoryUpdateForm = ({ categoryId, onClose }) => {
  const dispatch = useDispatch();
  const { category, isLoading, error } = useSelector(state => state.category);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (categoryId && !isLoadedRef.current) {
      console.log('Fetching category:', categoryId);
      dispatch(getCategoryById(categoryId)).then(() => {
        isLoadedRef.current = true;
      });
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (category && category.id === categoryId && !isLoadedRef.current) {
      setName(category.name || '');
    }
  }, [category, categoryId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    dispatch(updateCategory({ id: categoryId, name, image })).then(() => {
      onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit} className='inputiki'>
      <h3>Обновить категорию</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" required />
      <input type="file" onChange={handleImageChange} />
      <button type="submit" disabled={isLoading}>Обновить категорию</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CategoryUpdateForm;
