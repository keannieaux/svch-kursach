import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../store/slice/productSlice';
import CategorySelect from './CategorySelect';
import './Product.css';

const ProductUpdateForm = ({ product }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [newImages, setNewImages] = useState([]);
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector(state => state.product);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setStock(product.stock || '');
      setSize(product.size ? product.size.join(',') : '');
      setCategoryId(product.categoryId || '');
    }
  }, [product]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    console.log('Form Data:', formData);

    if (product) {
      dispatch(updateProduct({ _id: product._id, productData: formData }));
    }
  };

  return (
    <div>
      {product ? (
        <>
          <h3>Обновить продукт {product.name}</h3>
          <form onSubmit={handleSubmit} className="inputiki1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание"
              required
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Цена"
              required
            />
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Количество"
              required
            />
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Размер"
              required
            />
            <CategorySelect selectedCategory={categoryId} onSelectCategory={setCategoryId} />
            <input type="file" multiple onChange={handleImageChange} />
            <button type="submit" disabled={isLoading}>Обновить продукт</button>
            {success && <p className="success">Продукт успешно обновлен!</p>} {/* Сообщение об успешном обновлении */}
          </form>
        </>
      ) : (
        <p>Продукт не выбран</p> 
      )}
    </div>
  );
};

export default ProductUpdateForm;
