import React from 'react';
import 'styles/common/Card.scss';

interface CardProps {
  text: string;
  children: React.ReactNode;
}

function Card({ text, children }: CardProps) {
  return (
    <div className="card-container">
      <div className="icon-container">{children}</div>
      <div className="use-text">{text}</div>
    </div>
  );
}

export default Card;
