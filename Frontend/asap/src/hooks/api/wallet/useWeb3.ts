import Web3 from 'web3';

const useWeb3 = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://j9c202.p.ssafy.io/lego/'),
  );

  // 잔액 조회하기
  const getBalance = async (account: string) => {
    const balance = await web3.eth.getBalance(account);
    return balance;
  };

  const createAccount = async (password: string) => {
    try {
      // 비밀번호로 계정 생성하기
      const account = await web3.eth.personal.newAccount(password);

      return account;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getTransaction = async (hash: string) => {
    try {
      const tx = await web3.eth.getTransaction(hash);
      return tx.input;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { createAccount, getBalance, getTransaction };
};

export default useWeb3;
