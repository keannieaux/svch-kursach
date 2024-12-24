import React from 'react';
import './MainSection.css';
import backgroundImage from '../../img/bakc.png'; 

const MainSection = () => {
    return (
        <div className="main-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="blocki">
                <p className='qwer'>YOUF! is an innovative company specializing in the styling and customization of clothing. We transform basic items into unique works of art that reflect the individuality of our clients.</p>
                <div className='rig'>
                <p className='qwer1'>Our team of designers and craftsmen use modern techniques and materials to create inspiring and original clothing. YOUF! is an expression of your unique style and vision of fashion.</p>
                </div>
            </div>
        </div>
    );
};

export default MainSection;
