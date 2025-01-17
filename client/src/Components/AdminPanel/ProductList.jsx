import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProduct } from '../../store/slice/productSlice';
import './Product.css';

const ProductList = ({ onSelectProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const { isLoading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleDelete = (_id) => {
    dispatch(deleteProduct(_id));
  };

  return (
    <div className="category-list">
      <h3>Список продуктов</h3>
      {isLoading && <p>Загрузка...</p>}
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <span onClick={() => onSelectProduct(product)}>{product.name}</span>
            <button onClick={() => handleDelete(product._id)} className="delete-button">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
