import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/slice/productSlice';
import './Product.css';

const ProductList = ({ onSelectProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const { isLoading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 100 }));
  }, [dispatch]);

  return (
    <div className="category-list">
      <h3>Список продуктов</h3>
      {isLoading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id} onClick={() => onSelectProduct(product)}>
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
