import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../store/slice/CategorySlice';
import './Category.css';

const CategoryAddForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.category);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    dispatch(createCategory({ name, image }));
  };

  return (
    <form onSubmit={handleSubmit} className='inputiki1'>
      <h3>Добавить новую категорию</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" required />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit" disabled={isLoading}>Добавить категорию</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CategoryAddForm;
