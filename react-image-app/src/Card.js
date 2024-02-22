import React from 'react';
import './Card.css';
import { useAppContext } from './AppContext';

const Card = () => {
  const { name, surname, imageUrl } = useAppContext();

  return (
    <div className="card">
      <p>Name: {name}</p>
      <p>Surname: {surname}</p>
      {imageUrl && <img src={imageUrl} alt="Selected Topic" className="thumbnail" />}
    </div>
  );
};

export default Card;