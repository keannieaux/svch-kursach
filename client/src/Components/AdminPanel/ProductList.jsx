import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProduct } from '../../store/slice/productSlice';
import './Product.css';

const ProductList = ({ onSelectProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => {
    console.log('State products:', state.product.products);
    return state.product.products;
  });
  const { isLoading, error } = useSelector(state => state.product);

  useEffect(() => {
    console.log('Fetching all products');
    dispatch(getAllProducts({ page: 1, limit: 10 })).then(result => {
      console.log('Result from getAllProducts:', result);
    });
  }, [dispatch]);

  const handleDelete = (_id) => {
    dispatch(deleteProduct(_id));
  };

  return (
    <div className="category-list">
      <h3>Список продуктов</h3>
      {isLoading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <span onClick={() => onSelectProduct(product)}>{product.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
