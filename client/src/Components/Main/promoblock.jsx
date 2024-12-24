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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel nulla quis tellus facilisis posuere nec sed leo. Maecenas non augue iaculis, hendrerit velit sed, vulputate arcu. Integer nec orci sed ligula fringilla lacinia quis eu erat. Quisque nec orci non purus auctor laoreet sed in mauris.</p>
            </div>
            <div className="promo-image">
                <img src={sticker} alt="Custom Sneakers" />
            </div>
            <div className='blockic'></div>
        </div>
    );
};

export default PromoBlock;
