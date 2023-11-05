import React from 'react';
import { ReactComponent as LoadingSpinner } from 'assets/icons/Loading.svg';
import 'styles/common/Loading.scss';

interface IContent {
  isOn: boolean;
  content: React.ReactNode;
}

function Loading({ isOn, content }: IContent) {
  return (
    <div className="background">
      <div>
        {isOn ? <LoadingSpinner /> : null}
        <div className="flex justify-center font-bold text-xl text-white">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Loading;
