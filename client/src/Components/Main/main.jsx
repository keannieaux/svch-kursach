import React, { useRef, useEffect } from 'react';
import Banner from './banner';
import PromoBlock from './promoblock';
import PromoBlock2 from './promoblock2';
import PromoBlock3 from './promoblock3';
import FooterBlock from './footerblock';

const Main = () => {
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
                <Banner />
            </div>
            <div ref={(el) => (sectionsRef.current[1] = el)} style={{ height: '100vh' }}>
                <PromoBlock />
            </div>
            <div ref={(el) => (sectionsRef.current[2] = el)} style={{ height: '100vh' }}>
                <PromoBlock2 />
            </div>
            <div ref={(el) => (sectionsRef.current[3] = el)} style={{ height: '100vh' }}>
                <PromoBlock3 />
            </div>
            <div ref={(el) => (sectionsRef.current[4] = el)} style={{ height: '100vh' }}>
                <FooterBlock />
            </div>
        </div>
    );
};

export default Main;