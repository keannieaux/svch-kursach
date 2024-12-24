import React, { useRef, useEffect } from 'react';
import Category from './category';
import FooterBlock from '../Main/footerblock';
import Product from '../Product/ProductGrid';

const CategoryProduct = () => {
    const sectionsRef = useRef([]);
    const currentSection = useRef(0); // Текущая секция

    const scrollToSection = (index) => {
        if (sectionsRef.current[index]) {
            sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
            currentSection.current = index; // Обновляем текущую секцию
        }
    };

    const handleScroll = (event) => {
        if (event.deltaY > 0) {
            // Скролл вниз
            if (currentSection.current < sectionsRef.current.length - 1) {
                scrollToSection(currentSection.current + 1);
            }
        } else {
            // Скролл вверх
            if (currentSection.current > 0) {
                scrollToSection(currentSection.current - 1);
            }
        }
    };

    useEffect(() => {
        // Добавляем обработчик события
        window.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            // Удаляем обработчик события при размонтировании
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    return (
        <div className="main-container">
            <div ref={(el) => (sectionsRef.current[0] = el)} style={{ height: '100vh' }}>
                <Category />
            </div>
            <div ref={(el) => (sectionsRef.current[1] = el)} style={{ height: '100vh' }}>
                <Product />
            </div>
            <div ref={(el) => (sectionsRef.current[2] = el)} style={{ height: '100vh' }}>
                <FooterBlock />
            </div>
        </div>
    );
};

export default CategoryProduct;