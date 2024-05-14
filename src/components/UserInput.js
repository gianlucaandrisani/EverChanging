// UserInput.jsx
import React, { useState } from 'react';
import CardForm from './cardForm';
import Card from './card';

const UserInput = () => {
  const [cards, setCards] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (title, description) => {
    const newCard = { title, description };
    setCards([newCard, ...cards]); // Add new card to the beginning of the array
    setSubmitted(true);
  };

  return (
    <div className="user-input-container">
      <div>
        {cards.map((card, index) => (
          <Card key={index} title={card.title} content={card.description} />
        ))}
      </div>
      <CardForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UserInput;
