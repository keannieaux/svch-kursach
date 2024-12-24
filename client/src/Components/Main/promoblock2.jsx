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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel nulla quis tellus facilisis posuere nec sed leo. Maecenas non augue iaculis, hendrerit velit sed, vulputate arcu. Integer nec orci sed ligula fringilla lacinia quis eu erat. Quisque nec orci non purus auctor laoreet sed in mauris.</p>
            </div>
            <div className="promo-image1">
                <img src={sticker2} alt="Custom Sneakers" />
            </div>
            <div className='blockic1'></div>
        </div>
    );
};

export default PromoBlock;
