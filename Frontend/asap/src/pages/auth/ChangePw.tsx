import useChangePw from 'hooks/api/auth/useChangePw';
import React from 'react';

function ChangePw() {
  const { changePw } = useChangePw();

  const onChangePw = async (id: string, password: string) => {
    await changePw({ id, password });
  };

  return (
    <div>
      ChangePw
      <button
        type="button"
        style={{ border: '1px solid' }}
        onClick={() => onChangePw('moon', '12345')}
      >
        비밀번호 변경 테스트
      </button>
    </div>
  );
}

export default ChangePw;
