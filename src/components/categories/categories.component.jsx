import Category from 'components/category/category.component.jsx';
import './categories.styles.scss';
import React from 'react';

const Categories = (props) => {

    const {categories} = props;
    
    return (
        <div className='categories-container'>
            {categories.map(({ title, id, imageUrl }) => (
                <Category key={id} categoryData={{ title, imageUrl }} />
            ))}
        </div>
    )
}

export default Categories;