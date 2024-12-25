import React from 'react';
import './promoblock.css';
import sticker from '../../img/sticker.png'

const PromoBlock = () => {
    return (
        <div className="promo-container">
                        <div className="left-line">
                <div className="line"></div>
                <div className="number">01</div>
            </div>
            <div className="promo-text">
                <h1>Custom your style</h1>
                <p>Design is the art of creating visual harmony. It involves selecting colors, shapes, and typography that work together to convey a message. Good design enhances user experience and makes information accessible. It requires creativity, attention to detail, and understanding the audience's needs.</p>
            </div>
            <div className="promo-image">
                <img src={sticker} alt="Custom Sneakers" />
            </div>
            <div className='blockic'></div>
        </div>
    );
};

export default PromoBlock;
