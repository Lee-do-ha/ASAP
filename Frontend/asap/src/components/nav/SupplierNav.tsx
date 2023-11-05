import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuthStore from 'store/auth/useAuthStore';
import useSearchStore from 'store/search/useSearchStore';
import { Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { ReactComponent as MyPage } from 'assets/icons/MyPage.svg';
import NoticeBadge from 'components/notice/NoticeBadge';
import logoImage from 'assets/images/logo2.png';
import MyPageDrop from './MyPageDrop';
import SearchDrop from './SearchDrop';
import Switch from './Switch';

const activeStyle = {
  color: '#004096',
  fontWeight: '700',
  textDecoration: 'underline',
  textDecorationThickness: '4px',
  textUnderlinePosition: 'under',
  textUnderlineOffset: '23px',
};

function SupplierNav() {
  const { searchDropdown, toggleSearchDropdown } = useSearchStore();
  const { isLoggedIn } = useAuthStore((state) => state);
  const MyPageRef = React.createRef();

  const location = useLocation();
  const isMyPage = location.pathname.includes('/mypage');

  return (
    <div>
      <div className="bg-gray-50 flex h-full items-center relative">
        <div className="z-10">
          <Link to="/">
            <img src={logoImage} alt="asap logo" className="h-20 w-50" />
          </Link>
        </div>
        <div className="flex justify-center gap-20 w-full absolute z-0">
          {/* API 신청 리스트로 이동 */}
          <NavLink
            to="/supply"
            className="font-bold text-xl"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            API 신청
          </NavLink>
          {/* 내가 제공 중인 API 통계로 이동 */}
          <NavLink
            to="/myapi"
            className="font-bold text-xl"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            My API
          </NavLink>
          {/* 마이 페이지로 이동 */}
          <NavLink
            to="/mypage/account"
            className="font-bold text-xl"
            style={isMyPage ? activeStyle : undefined}
          >
            My Page
          </NavLink>
        </div>
        <div className="flex items-center absolute -right-0">
          {/* 계정 전환 Switch */}
          <Switch />

          {/* 알림 뱃지 */}
          {isLoggedIn && <NoticeBadge />}

          {isLoggedIn ? (
            <Menu
              placement="top-start"
              open={searchDropdown}
              handler={toggleSearchDropdown}
            >
              <MenuHandler>
                <button
                  type="button"
                  className="bg-skyblue w-20 h-20 flex items-center justify-center text-white font-bold"
                >
                  <MyPage className="w-5" />
                </button>
              </MenuHandler>
              <MenuList>
                <MyPageDrop ref={MyPageRef} />
              </MenuList>
            </Menu>
          ) : (
            <Link to="/login">
              <div className="bg-skyblue w-20 h-20 flex items-center justify-center text-white font-bold">
                LOGIN
              </div>
            </Link>
          )}
          <Menu placement="top-start">
            <MenuHandler>
              <button
                type="button"
                className="bg-blue w-20 h-20 flex items-center justify-center text-white font-bold"
              >
                <Search className="w-5" />
              </button>
            </MenuHandler>
            <MenuList className="bg-gray-200 w-full">
              <SearchDrop />
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default SupplierNav;
