import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../store/slice/productSlice';
import './ProductGrid.css';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(state => state.product);
  const selectedCategoryId = useSelector(state => state.category.selectedCategoryId);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 10, categoryId: selectedCategoryId }));
  }, [dispatch, selectedCategoryId]);

  useEffect(() => {
    console.log("Loaded products:", products);
  }, [products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-grid">
      <div className="filter-icon">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="white" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
        </svg>
      </div>
      <div className="products">
        {products.map(product => (
          <ProductCard
            key={product.id}
            _id={product.id}
            name={product.name}
            price={product.price}
            colors={product.colors || []}
            images={product.ProductImages || []}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
