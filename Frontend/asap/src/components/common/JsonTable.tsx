import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { ReactComponent as Edit } from 'assets/icons/Edit.svg';
import Modal from './Modal';
import 'styles/common/Input.scss';

/**
 * @prop {string} jsonData Json 파일 String으로 변환한 문자열 전체
 */

interface Pair {
  idx: number;
  key: string;
  name: string;
  type: string;
  required: string;
  description: string;
}

interface JsonTableProps {
  jsonData: string | undefined;
  isEditMode?: boolean;
  updatePair?: (idx: number, updatedData: Pair) => void; // eslint-disable-line no-unused-vars
  deletePair?: (idx: number) => void; // eslint-disable-line no-unused-vars
}

function JsonTable({
  jsonData,
  isEditMode,
  updatePair,
  deletePair,
}: JsonTableProps) {
  const [data, setData] = useState<Pair[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  // 현재 편집 중인 Pair 항목의 idx
  const [editingIdx, setEditingIdx] = useState<number>();
  const [editData, setEditData] = useState<Pair | undefined>();

  // 수정 모달 열기
  const handleEditClick = (idx: number) => {
    const itemToEdit = data.find((item) => item.idx === idx);
    if (itemToEdit) {
      setEditData({ ...itemToEdit });
      setEditingIdx(idx);
      setIsModalOpen(true);
    }
  };

  // input change handler
  const handleInputChange = (
    field: keyof Pair,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: event.target.value,
      });
    }
  };

  // checkbox change handler
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({
        ...editData,
        required: event.target.checked ? 'true' : 'false',
      });
    }
  };

  // 수정 사항 스토어에 저장
  const handleSaveChanges = () => {
    if (!editData?.key) {
      setAlertMessage('key는 필수 입력 값입니다.');
      setIsAlertOpen(true);
      return;
    }
    if (!editData?.name) {
      setAlertMessage('name은 필수 입력 값입니다.');
      setIsAlertOpen(true);
      return;
    }
    if (!editData?.type) {
      setAlertMessage('type은 필수 입력 값입니다.');
      setIsAlertOpen(true);
      return;
    }
    if (editingIdx !== undefined && editData && updatePair) {
      updatePair(editingIdx, editData);
      setIsModalOpen(false);
    }
  };

  // 삭제
  const handleDelete = () => {
    if (editingIdx && deletePair) {
      deletePair(editingIdx);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    try {
      if (jsonData) {
        const parsedData = JSON.parse(jsonData);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Invalid JSON data:', error);
    }
  }, [jsonData]);

  if (!data || data.length === 0) {
    return null;
  }

  const columns = Object.keys(data[0]).filter(
    (column) => column !== 'idx',
  ) as (keyof Pair)[];

  const columnGrid = (column: string) => {
    if (column === 'description') {
      return 'col-span-5';
    }
    if (column === 'required') {
      return 'col-span-1';
    }
    return 'col-span-2';
  };

  return (
    <div className="h-full w-full">
      {data.map((item) => (
        <div key={item.idx} className="grid grid-cols-12 items-center mt-3">
          {columns.map((column) => (
            <div
              key={column}
              className={`${columnGrid(column)} border-5 flex justify-between ${
                column === 'required' ? 'text-center' : 'ps-2'
              }`}
            >
              {column !== 'description' && item[column]}
              {column === 'description' && (
                <div className="grid grid-cols-4 w-full">
                  <div className="col-span-3 text-left pr-1">
                    {item.description || ''}
                  </div>
                  {isEditMode && (
                    <div className="col-span-1 flex justify-end pr-2">
                      <Edit
                        onClick={() => handleEditClick(item.idx)}
                        className="w-5 h-auto cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}{' '}
              {/* {item[column]}
              {isEditMode && column === 'description' && (
                <Edit
                  onClick={() => handleEditClick(item.idx)}
                  className="w-5 h-auto self-center mr-2 cursor-pointer"
                />
              )} */}
            </div>
          ))}
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* 데이터 편집 모달 */}
        <div className="w-96">
          <div className="color-blue my-1 ms-1 font-bold mt-5">key</div>
          <div className="input-container">
            <input
              placeholder="key"
              value={editData?.key || ''}
              className="w-5"
              onChange={(e) => handleInputChange('key', e)}
            />
          </div>
          <div className="color-blue my-1 ms-1 font-bold mt-5">name</div>
          <div className="input-container">
            <input
              placeholder="name"
              value={editData?.name || ''}
              className="w-5"
              onChange={(e) => handleInputChange('name', e)}
            />
          </div>
          <div className="color-blue my-1 ms-1 font-bold mt-5">type</div>
          <div className="input-container">
            <input
              placeholder="type"
              value={editData?.type || ''}
              className="w-5"
              onChange={(e) => handleInputChange('type', e)}
            />
          </div>
          <div className="flex justify-between w-full">
            <div className="color-blue my-1 ms-1 font-bold mt-5">required</div>
            <input
              type="checkbox"
              color="blue"
              className="bg-white w-7 mt-5"
              checked={editData?.required === 'true'}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="color-blue my-1 ms-1 font-bold mt-5">description</div>
          <div className="input-container">
            <textarea
              placeholder="description"
              value={editData?.description || ''}
              onChange={(e) => handleInputChange('description', e)}
            />
          </div>
          <div className="flex justify-center gap-2 mt-5">
            <Button onClick={handleSaveChanges}>수정</Button>
            <Button onClick={handleDelete} className="bg-red-600">
              삭제
            </Button>
          </div>
        </div>
      </Modal>
      {/* 알림 모달 */}
      <Modal
        isOpen={isAlertOpen}
        onClose={closeAlert}
        confirm
        message={alertMessage}
      />
    </div>
  );
}

JsonTable.defaultProps = {
  isEditMode: false,
  updatePair: () => {
    /* no-op */
  },
  deletePair: () => {
    /* no-op */
  },
};

export default JsonTable;
