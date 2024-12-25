import React from 'react';
import './promoblock3.css';
import sneaker1 from '../../img/cros1.png';
import sneaker2 from '../../img/cros2.png';
import sneaker3 from '../../img/cros3.png';

const PromoBlock = () => {
    return (
        <div className="promo-container3">
            <div className="left-line3">
            <div className="line1"></div>
                <div className="number3">03</div>
            </div>
            <div className="promo-content3">
                <h1>Design shapes our world</h1>
                <div className="sneaker-designs">
                    <div className="sneaker">
                        <img src={sneaker1} alt="Sneaker Design 1" />
                    </div>
                    <div className="sneaker">
                        <img src={sneaker2} alt="Sneaker Design 2" />
                    </div>
                    <div className="sneaker">
                        <img src={sneaker3} alt="Sneaker Design 3" />
                    </div>
                </div>
            </div>
            <div className='blockic3'></div>
        </div>
    );
};

export default PromoBlock;
