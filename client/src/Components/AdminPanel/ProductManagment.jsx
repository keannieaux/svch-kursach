import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductUpdateForm from './ProductUpdateForm';
import ProductAddForm from './ProductAddForm';
import Modal from './Modal';
import './Product.css';

const ProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="centio">
      <div className='productiji'>
        <ProductList onSelectProduct={handleSelectProduct} />
        <ProductAddForm />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ProductUpdateForm product={selectedProduct} />
        </Modal>
      </div>
    </div>
  );
};

export default ProductManagement;
