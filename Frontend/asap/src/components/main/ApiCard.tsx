import React from 'react';
import { Link } from 'react-router-dom';
import CategoryImg from 'components/api/CategoryImg';
import 'styles/common/Card.scss';

interface ApiCardProps {
  apiId: string;
  title: string;
  category: string;
}

function ApiCard({ apiId, title, category }: ApiCardProps) {
  return (
    <div className="card-container">
      <Link to={`/api_list/${apiId}`}>
        <div className="icon-container">
          <CategoryImg category={category} />
        </div>
        <div className="use-text">{title}</div>
      </Link>
    </div>
  );
}

export default ApiCard;
