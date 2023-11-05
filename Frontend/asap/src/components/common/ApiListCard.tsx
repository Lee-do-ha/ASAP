import React, { useState } from 'react';
import CategoryImg from 'components/api/CategoryImg';

interface cardInfo {
  category: string;
  title: string;
  tags: string;
  content: string;
}

function ApiListCard({ category, title, tags, content }: cardInfo) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${
        isHovered ? 'lg:scale-105 transform transition-transform' : ''
      } bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-sm w-full h-72 flex flex-col justify-center items-center cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CategoryImg category={category} />
      {isHovered ? (
        <div className="text-gray-700 mb-1">{content}</div>
      ) : (
        <>
          <h1 className="text-2xl text-gray-700 mb-1">{title}</h1>
          <div className="flex">
            {JSON.parse(tags).map((tag: string) => (
              <p key={tag} className="text-sm" style={{ color: '#3888B5' }}>
                #{tag}&nbsp;&nbsp;
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default ApiListCard;
