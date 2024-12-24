import React, { useRef, useEffect } from 'react';
import FooterBlock from '../Main/footerblock';
import MainSection from './MainSection';

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
        event.preventDefault(); // Предотвращаем стандартное поведение прокрутки
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
                <MainSection />
            </div>
            <div ref={(el) => (sectionsRef.current[1] = el)} style={{ height: '100vh' }}>
                <FooterBlock />
            </div>
        </div>
    );
};

export default CategoryProduct;