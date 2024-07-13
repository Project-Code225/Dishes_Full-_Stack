import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import DishItem from '../components/DishItem';

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchDishes();
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('dishUpdated', (updatedDish) => {
        setDishes(prevDishes => 
          prevDishes.map(dish => 
            dish.dishId === updatedDish.dishId ? updatedDish : dish
          )
        );
      });
    }
  }, [socket]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dishes');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleTogglePublish = async (dishId) => {
    try {
      await axios.patch(`http://localhost:5000/api/dishes/${dishId}`);
      // The update will be handled by the socket event
    } catch (error) {
      console.error('Error toggling dish status:', error);
    }
  };

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <DishItem
          key={dish.dishId}
          dish={dish}
          onTogglePublish={handleTogglePublish}
        />
      ))}
    </div>
  );
};

export default DishList;