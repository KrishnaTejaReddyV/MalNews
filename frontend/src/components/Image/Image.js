import React from 'react';

const Image = props => {
    const imgSrc = (props.src || "").replace(/^http:\/\//i, 'https://');

    return (
        <img 
            src={imgSrc} 
            alt="Not found" 
            onError={
                (e) => {
                    e.target.onerror = null;
                    e.target.src='https://www.cisco.com/c/en/us/products/security/advanced-malware-protection/what-is-malware/_jcr_content/Grid/category_atl_9819/layout-category-atl/anchor_info_a0df/image.img.png/1526550535037.png';
                }
            } 
        />
    );
}

export default Image;