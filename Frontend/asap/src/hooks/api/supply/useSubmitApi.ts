import axiosInstance from 'utils/axiosInstance';

interface ApiInfo {
  title: string;
  content: string;
  input: string;
  output: string;
  price: number | string;
  api: string;
  tags: string[];
  provideDate: string;
  method: string;
  inputExample: string;
  outputExample: string;
}

const useSubmitApi = () => {
  const submitApi = async ({
    title,
    content,
    input,
    output,
    price,
    api,
    tags,
    method,
    provideDate,
    inputExample,
    outputExample,
  }: ApiInfo) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/apply/submit',
        data: {
          title,
          content,
          input,
          output,
          price,
          api,
          tags: JSON.stringify(tags),
          provideDate,
          method,
          inputExample,
          outputExample,
        },
      });
      if (response.status === 200) {
        window.location.href = '/supply';
      }
    } catch (error) {
      console.log('서버 오류 :', error);
    }
  };

  return { submitApi };
};

export default useSubmitApi;
