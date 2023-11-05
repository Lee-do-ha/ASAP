import axiosInstance from 'utils/axiosInstance';

interface IAddress {
  id: string;
  address: string;
  privateKey: string;
}

const useSetWallet = () => {
  const setWallet = async ({ id, address, privateKey }: IAddress) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/member/registerAddress',
        data: { id, address, privateKey },
      });
      return response;
    } catch (error) {
      console.log('서버 오류:', error);
      return null;
    }
  };

  return { setWallet };
};

export default useSetWallet;
