import React from 'react';
import { ReactComponent as Car } from 'assets/images/category/Car2.svg';
import { ReactComponent as Weather } from 'assets/images/category/Weather.svg';
import { ReactComponent as Bank } from 'assets/images/category/Bank.svg';
import { ReactComponent as Map } from 'assets/images/category/Map.svg';
import { ReactComponent as Card } from 'assets/images/category/Card.svg';
import { ReactComponent as Etc } from 'assets/images/category/Etc.svg';
import book from 'assets/images/category/Book.png';

interface Props {
  category: string | undefined;
}

function CategoryImg({ category }: Props) {
  if (category === '차량') {
    return <Car className="w-64 h-auto" />;
  }
  if (category === '날씨') {
    return <Weather className="w-56 h-auto" />;
  }
  if (category === '계좌') {
    return <Bank className="w-56 h-auto" />;
  }
  if (category === '지도') {
    return <Map className="w-56 h-auto" />;
  }
  if (category === '카드') {
    return <Card className="w-56 h-auto" />;
  }
  if (category === '도서') {
    return <img src={book} alt="book" className="w-56 h-auto" />;
  }
  return <Etc className="w-56 h-auto" />;
}

export default CategoryImg;
/* eslint-enable no-unused-vars */
