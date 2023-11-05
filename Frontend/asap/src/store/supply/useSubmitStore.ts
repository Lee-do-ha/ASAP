import { create } from 'zustand';
import { format } from 'date-fns';

interface ISubmitStore {
  title: string;
  content: string;
  input: string;
  output: string;
  price: number | string;
  api: string;
  tag: string;
  tags: string[];
  provideDate: string;
  method: string;
  inputExample: string;
  outputExample: string;
  setTitle: (title: string) => void; // eslint-disable-line no-unused-vars
  setContent: (content: string) => void; // eslint-disable-line no-unused-vars
  setInput: (input: string) => void; // eslint-disable-line no-unused-vars
  setOutput: (output: string) => void; // eslint-disable-line no-unused-vars
  setPrice: (price: number) => void; // eslint-disable-line no-unused-vars
  setApi: (api: string) => void; // eslint-disable-line no-unused-vars
  setTag: (tag: string) => void; // eslint-disable-line no-unused-vars
  setTags: (tags: string[]) => void; // eslint-disable-line no-unused-vars
  setProvideDate: (provideDate: string) => void; // eslint-disable-line no-unused-vars
  setMethod: (method: string) => void; // eslint-disable-line no-unused-vars
  setInputExample: (inputExample: string) => void; // eslint-disable-line no-unused-vars
  setOutputExample: (outputExample: string) => void; // eslint-disable-line no-unused-vars
}

const useSubmitStore = create<ISubmitStore>((set) => ({
  title: '',
  content: '',
  input: '',
  output: '',
  price: '',
  api: '',
  tag: '',
  tags: [],
  provideDate: format(new Date(), 'yyyy-MM-dd'),
  method: 'GET',
  inputExample: '',
  outputExample: '',
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setInput: (input) => set({ input }),
  setOutput: (output) => set({ output }),
  setPrice: (price) => set({ price }),
  setApi: (api) => set({ api }),
  setTag: (tag) => set({ tag }),
  setTags: (tags) => set({ tags }),
  setProvideDate: (provideDate) => set({ provideDate }),
  setMethod: (method) => set({ method }),
  setInputExample: (inputExample) => set({ inputExample }),
  setOutputExample: (outputExample) => set({ outputExample }),
}));

export default useSubmitStore;
