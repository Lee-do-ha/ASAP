import React, { ChangeEvent, useState } from 'react';
import useSubmitApi from 'hooks/api/supply/useSubmitApi';
import Header from 'components/common/Header';
import Modal from 'components/common/Modal';
import SubmitTags from 'components/supply/SubmitTags';
import useSubmitStore from 'store/supply/useSubmitStore';
import SubmitInput from 'components/supply/SubmitInput';
import SubmitOutput from 'components/supply/SubmitOutput';
import Calendar from 'components/common/Calendar';
import { Button, Radio } from '@material-tailwind/react';
import 'styles/common/Input.scss';
import CodeEditor from 'components/supply/CodeEditor';

function ApiSupply() {
  const { submitApi } = useSubmitApi();

  const {
    title,
    content,
    input,
    output,
    price,
    api,
    tags,
    provideDate,
    method,
    inputExample,
    outputExample,
    setTitle,
    setContent,
    setPrice,
    setApi,
    setMethod,
    setInputExample,
    setOutputExample,
  } = useSubmitStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onPriceHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const valueStr = event.target.value;
    const valueNum = parseInt(valueStr, 10);
    setPrice(valueNum);
  };

  const onApiHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setApi(event.target.value);
  };

  const onMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value);
  };

  // 유효한 JSON인지 확인
  const isValidJSON = (str: string) => {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) return false;

        const allEmptyObjects = parsed.every(
          (item) =>
            item && typeof item === 'object' && Object.keys(item).length === 0,
        );
        if (allEmptyObjects) return false;
      } else if (
        Object.keys(parsed).length === 0 &&
        parsed.constructor === Object
      ) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  // 제출 submit 함수
  const onSubmitHandler = () => {
    if (!title) {
      setModalMessage('API 이름은 필수 입력값입니다.');
      setIsModalOpen(true);
      return;
    }
    if (!content) {
      setModalMessage('상세 내용은 10자 이상으로 입력해주세요.');
      setIsModalOpen(true);
      return;
    }
    if (!api) {
      setModalMessage('EndPoint는 필수 입력값입니다.');
      setIsModalOpen(true);
      return;
    }
    if (!input || !output) {
      setModalMessage('input 값과 output 값은 각각 한개 이상 입력해주세요.');
      setIsModalOpen(true);
      return;
    }
    if (!isValidJSON(inputExample)) {
      setModalMessage('INPUT 예시는 유효한 JSON 형식이어야 합니다.');
      setIsModalOpen(true);
      return;
    }
    if (!isValidJSON(outputExample)) {
      setModalMessage('OUTPUT 예시는 유효한 JSON 형식이어야 합니다.');
      setIsModalOpen(true);
      return;
    }
    if (!price) {
      setModalMessage('가격은 필수 입력 값입니다.');
      setIsModalOpen(true);
      return;
    }
    if (!tags) {
      setModalMessage('태그는 필수 입력 값입니다.');
      setIsModalOpen(true);
      return;
    }
    submitApi({
      title,
      content,
      input,
      output,
      price,
      api,
      tags,
      provideDate,
      method,
      inputExample,
      outputExample,
    });
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        confirm
        message={modalMessage}
      />
      <Header title="API 제공 신청하기" />
      <div className="container mx-auto page-container">
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">API 이름</p>
          <div className="input-container">
            <input placeholder="제목" value={title} onChange={onTitleHandler} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="mb-5 pe-10">
            <p className="text-lg font-bold mb-2">Endpoint</p>
            <div className="input-container">
              <input
                placeholder="Endpoint"
                value={api}
                onChange={onApiHandler}
                className="pr-20"
              />
            </div>
          </div>
          <div className="mb-5">
            <p className="text-lg font-bold mb-2">Method</p>
            <div className="flex gap-10">
              <Radio
                name="type"
                color="blue"
                label="GET"
                defaultChecked
                onChange={onMethodChange}
                value="GET"
                crossOrigin=""
              />
              <Radio
                name="type"
                color="blue"
                label="POST"
                onChange={onMethodChange}
                value="POST"
                crossOrigin=""
              />
              <Radio
                name="type"
                color="blue"
                label="PUT"
                onChange={onMethodChange}
                value="PUT"
                crossOrigin=""
              />
              <Radio
                name="type"
                color="blue"
                label="DELETE"
                value="DELETE"
                onChange={onMethodChange}
                crossOrigin=""
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">상세 내용</p>
          <div className="input-container">
            <textarea
              placeholder="API에 대한 설명을 간단하게 적어주세요. (200자 이내)"
              value={content}
              onChange={onContentHandler}
              className="pr-20"
              maxLength={200}
            />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="mb-5">
            <p className="text-lg font-bold mb-2">1회 요청당 비용</p>
            <div className="input-container flex w-96">
              <input
                placeholder="price"
                value={price || ''}
                onChange={onPriceHandler}
                type="number"
                step="1"
                min={0}
              />
              <p className="self-center">원</p>
            </div>
          </div>
          <div className="mb-5">
            <p className="text-lg font-bold mb-2">제공 종료 날짜</p>
            <div>
              <Calendar />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-lg font-bold mb-2">관련 태그</p>
          <div>
            <SubmitTags />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">INPUT</p>
          <div>
            <SubmitInput />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">INPUT 예시</p>
          <div className="input-container">
            <CodeEditor setStore={setInputExample} />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">OUTPUT</p>
          <div>
            <SubmitOutput />
          </div>
        </div>
        <div className="mb-5">
          <p className="text-lg font-bold mb-2">OUTPUT 예시</p>
          <div className="input-container">
            <CodeEditor setStore={setOutputExample} />
          </div>
        </div>
        <div className="flex justify-center my-10">
          <Button ripple onClick={onSubmitHandler} className="text-lg bg-blue">
            신청하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApiSupply;
