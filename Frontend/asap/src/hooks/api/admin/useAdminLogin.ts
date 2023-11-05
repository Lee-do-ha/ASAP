import axios from 'axios';
// import axiosInstance from 'utils/axiosInstance';

interface adminInfo {
  adminId: string;
  adminPassword: string;
}

const useAdminLogin = () => {
  const adminLogin = async ({ adminId, adminPassword }: adminInfo) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/login',
        data: {
          id: adminId,
          password: adminPassword,
        },
      });
      sessionStorage.setItem('authToken', response.data);
      sessionStorage.setItem('loginType', 'user');
      window.location.href = '/admin/approval';
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  return { adminLogin };
};

export default useAdminLogin;
