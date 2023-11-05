import React from 'react';

interface IHeaderProps {
  title: string;
  children?: React.ReactNode;
}

function Header({ title, children }: IHeaderProps) {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-44 flex-col">
      <p className="text-4xl font-extrabold">{title}</p>
      <div className="w-full flex justify-center mt-4">{children}</div>
    </div>
  );
}

Header.defaultProps = {
  children: null,
};

export default Header;
