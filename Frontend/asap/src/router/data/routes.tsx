import React from 'react';

// main
import MainPage from 'pages/main/MainPage';

// account
import SignUp from 'pages/auth/SignUp';
import LogIn from 'pages/auth/LogIn';
import FindAccount from 'pages/auth/FindAccount';
import ChangePw from 'pages/auth/ChangePw';
import Test from 'pages/test';

// api
import ApiList from 'pages/api/ApiList';
import ApiDetail from 'pages/api/ApiDetail';
import ApiUsage from 'pages/api/ApiUsage';
import ApiTest from 'pages/api/ApiTest';
import ApiApply from 'pages/api/ApiApply';

// supply
import ApiSupplySubmit from 'pages/supply/ApiSupplySubmit';
import SupplyApplyList from 'pages/supply/SupplyApplyList';

// myapi
import MyApi from 'pages/myapi/MyApi';
import MyApiDetail from 'pages/myapi/MyApiDetail';

// help
import HelpPage from 'pages/help/HelpPage';

// mypage
import AccountCheck from 'pages/mypage/AccountCheck';
import AccountInfo from 'pages/mypage/AccountInfo';
import AccountMod from 'pages/mypage/AccountMod';
import AccountKey from 'pages/mypage/AccountKey';
import AccountCredit from 'pages/mypage/AccountCredit';
import AccountPay from 'pages/mypage/AccountPay';
import AccountWallet from 'pages/mypage/AccountWallet';

// blockchain
import CheckUsage from 'pages/blockchain/CheckUsage';

// admin
import AdminLogin from 'pages/admin/AdminLogin';
import ApiApproval from 'pages/admin/ApiApproval';

// Not Found
import NotFound from 'components/common/NotFound';

// Route Restrict
import ToggleAuth from 'pages/auth/ToggleAuth';
import NoSplRoute from 'router/route/NoSplRoute';
import ProtectRoute from 'router/route/ProtectRoute';
import PublicRoute from 'router/route/PublicRoute';
import PrivateRoute from 'router/route/PrivateRoute';
import SupplierRoute from 'router/route/SupplierRoute';
import UserRoute from 'router/route/UserRoute';
import AdminRoute from 'router/route/AdminRoute';
import AnyRoute from 'router/route/AnyRoute';

interface Route {
  path: string;
  element: React.ReactElement;
}

const routes: Route[] = [
  {
    path: '/',
    element: (
      <AnyRoute>
        <MainPage />
      </AnyRoute>
    ),
  },

  // auth
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LogIn />
      </PublicRoute>
    ),
  },
  {
    path: '/find_account',
    element: (
      <PublicRoute>
        <FindAccount />
      </PublicRoute>
    ),
  },
  {
    path: '/change_password',
    element: (
      <PrivateRoute>
        <ChangePw />
      </PrivateRoute>
    ),
  },
  {
    path: '/change_account',
    element: (
      <PrivateRoute>
        <ToggleAuth />
      </PrivateRoute>
    ),
  },

  // user
  {
    path: '/api_list',
    element: (
      <NoSplRoute>
        <ApiList />
      </NoSplRoute>
    ),
  },
  {
    path: '/api_list/:apiId',
    element: (
      <NoSplRoute>
        <ApiDetail />
      </NoSplRoute>
    ),
  },
  {
    path: '/api_list/:apiId/usage',
    element: (
      <NoSplRoute>
        <ApiUsage />
      </NoSplRoute>
    ),
  },
  {
    path: '/api_list/:apiId/test',
    element: (
      <NoSplRoute>
        <ApiTest />
      </NoSplRoute>
    ),
  },
  {
    path: '/api_list/:apiId/apply',
    element: (
      <UserRoute>
        <ApiApply />
      </UserRoute>
    ),
  },

  // supplier
  {
    path: '/supply',
    element: (
      <SupplierRoute>
        <SupplyApplyList />
      </SupplierRoute>
    ),
  },
  {
    path: '/supply/submit',
    element: (
      <SupplierRoute>
        <ApiSupplySubmit />
      </SupplierRoute>
    ),
  },

  // 통계
  {
    path: '/myapi',
    element: (
      <PrivateRoute>
        <MyApi />
      </PrivateRoute>
    ),
  },
  {
    path: '/myapi/detail',
    element: (
      <PrivateRoute>
        <MyApiDetail />
      </PrivateRoute>
    ),
  },

  // 블록체인 검증
  {
    path: '/check',
    element: (
      <UserRoute>
        <CheckUsage />
      </UserRoute>
    ),
  },

  // 고객 지원
  {
    path: '/help',
    element: (
      <AnyRoute>
        <HelpPage />
      </AnyRoute>
    ),
  },

  // 마이페이지
  {
    path: '/mypage/check',
    element: (
      <PrivateRoute>
        <AccountCheck />
      </PrivateRoute>
    ),
  },
  {
    path: '/mypage/account',
    element: (
      <ProtectRoute>
        <AccountInfo />
      </ProtectRoute>
    ),
  },
  {
    path: '/mypage/account/modify',
    element: (
      <ProtectRoute>
        <AccountMod />
      </ProtectRoute>
    ),
  },
  {
    path: '/mypage/keys',
    element: (
      <ProtectRoute>
        <AccountKey />
      </ProtectRoute>
    ),
  },
  {
    path: '/mypage/credit',
    element: (
      <ProtectRoute>
        <AccountCredit />
      </ProtectRoute>
    ),
  },
  {
    path: '/mypage/payment',
    element: (
      <ProtectRoute>
        <AccountPay />
      </ProtectRoute>
    ),
  },
  {
    path: '/mypage/wallet',
    element: (
      <ProtectRoute>
        <AccountWallet />
      </ProtectRoute>
    ),
  },

  {
    path: '/admin',
    element: (
      <PublicRoute>
        <AdminLogin />
      </PublicRoute>
    ),
  },
  {
    path: '/admin/approval',
    element: (
      <AdminRoute>
        <ApiApproval />
      </AdminRoute>
    ),
  },
  {
    path: '/test',
    element: (
      <AnyRoute>
        <Test />
      </AnyRoute>
    ),
  },

  { path: '/*', element: <NotFound /> },
];

export default routes;
