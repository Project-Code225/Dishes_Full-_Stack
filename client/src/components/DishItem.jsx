import React from 'react';

const DishItem = ({ dish, onTogglePublish }) => {
  return (
    <div className="dish-item">
      <img src={dish.imageUrl} alt={dish.dishName} />
      <h3>{dish.dishName}</h3>
      <p>Status: {dish.isPublished ? 'Published' : 'Unpublished'}</p>
      <button onClick={() => onTogglePublish(dish.dishId)}>
        {dish.isPublished ? 'Unpublish' : 'Publish'}
      </button>
    </div>
  );
};

export default DishItem;