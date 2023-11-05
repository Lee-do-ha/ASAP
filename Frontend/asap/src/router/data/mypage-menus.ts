interface IMenu {
  name: string;
  path: string;
}

const menus: IMenu[] = [
  { name: '기본 정보', path: '/mypage/account' },
  { name: '키 관리', path: '/mypage/keys' },
  { name: '지갑 정보', path: '/mypage/wallet' },
  { name: '결제 수단 관리', path: '/mypage/credit' },
];

export default menus;
