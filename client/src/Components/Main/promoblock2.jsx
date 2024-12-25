import React from 'react';
import './promoblock2.css';
import sticker2 from '../../img/sticker2.png';

const PromoBlock = () => {
    return (
        <div className="promo-container1">
            <div className="left-line1">
                <div className="line1"></div>
                <div className="number1">02</div>
            </div>
            <div className="promo-text1">
                <h1>Make your own design</h1>
                <p>Design is about creating visual harmony and balance. It involves choosing colors, shapes, and typography that work together to convey a message. Good design enhances user experience and makes information accessible. It requires creativity, attention to detail, and an understanding of the audience's needs.</p>
            </div>
            <div className="promo-image1">
                <img src={sticker2} alt="Custom Sneakers" />
            </div>
            <div className='blockic1'></div>
        </div>
    );
};

export default PromoBlock;
