import React from 'react';
import 'styles/nav/SideBar.scss';
import { NavLink } from 'react-router-dom';

interface IMenu {
  name: string;
  path: string;
}

interface ISideBarProps {
  menus: IMenu[];
}

const activeStyle = {
  backgroundColor: 'rgba(122, 192, 240, 0.37)',
  width: '180px',
  height: '35px',
  color: '#222222',
  fontWeight: '700',
  borderRadius: '8px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
};

const nonActiveStyle = {
  width: '180px',
  height: '35px',
  color: 'grey',
  fontWeight: '700',
  borderRadius: '8px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
};

function SideBar(props: ISideBarProps) {
  const { menus } = props;

  return (
    <div className="side-container">
      {menus.map((menu) => {
        return (
          <NavLink
            to={menu.path}
            key={menu.path}
            style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
            className="my-1"
          >
            <p>{menu.name}</p>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SideBar;
