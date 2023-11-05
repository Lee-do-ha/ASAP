import React from 'react';

function CopyTextComponent(selecttext: string) {
  const handleCopyClick = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('텍스트가 복사되었습니다.');
      })
      .catch((error) => {
        console.error('복사 실패:', error);
      });
  };

  return (
    <span aria-hidden onClick={() => handleCopyClick(selecttext)}>
      클릭하여 텍스트 복사
    </span>
  );
}

export default CopyTextComponent;
