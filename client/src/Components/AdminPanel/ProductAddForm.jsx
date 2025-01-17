import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../store/slice/productSlice';
import { getAllCategories } from '../../store/slice/CategorySlice';
import './Product.css';

const ProductAddForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [newImages, setNewImages] = useState([]);
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryId || categoryId.length !== 24) {
      alert('Некорректный идентификатор категории');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('size', size);
    formData.append('categoryId', categoryId);
    newImages.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(createProduct(formData));
  };

  return (
    <form onSubmit={handleSubmit} className='inputiki1'>
      <h3>Добавить новый продукт</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Цена" required />
      <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Количество" required />
      <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Размер" />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="">Выберите категорию</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
      <input type="file" multiple onChange={handleImageChange} />
      <button type="submit" className='buttonchick' disabled={isLoading}>Добавить продукт</button>
    </form>
  );
};

export default ProductAddForm;
