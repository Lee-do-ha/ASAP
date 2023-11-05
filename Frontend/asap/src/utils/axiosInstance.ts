import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://j9c202.p.ssafy.io', // 원하는 API 서버의 기본 URL을 설정합니다.
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 전에 처리해야 할 작업
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${authToken}`;
      return newConfig;
    }
    return config;
  },
  (error) => {
    // 요청 전에 에러가 발생한 경우
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // refresh token 갱신 추가 필요
    return Promise.reject(error);
  },
);

export default axiosInstance;
