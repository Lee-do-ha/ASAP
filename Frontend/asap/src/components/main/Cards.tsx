import React from 'react';
import Card from 'components/common/Card';
import { ReactComponent as RightArrow } from 'assets/main/RightArrow.svg';

// user 이미지
import { ReactComponent as Search } from 'assets/main/ApiSearch.svg';
import { ReactComponent as Apply } from 'assets/main/Apply.svg';
import { ReactComponent as Credit } from 'assets/main/Credit.svg';
import { ReactComponent as Test } from 'assets/main/Test.svg';

interface CardsProps {
  authority: string;
}

function Cards({ authority }: CardsProps) {
  if (authority === 'user') {
    return (
      <div className="cards">
        <Card text="API 검색">
          <Search />
        </Card>
        <RightArrow className="mb-10" />
        <Card text="사용 신청">
          <Apply />
        </Card>
        <RightArrow className="mb-10" />
        <Card text="결제 수단 등록">
          <Credit />
        </Card>
        <RightArrow className="mb-10" />
        <Card text="API 사용">
          <Test />
        </Card>
      </div>
    );
  }
  return (
    <div className="cards">
      <Card text="API 제공 신청">
        <Search />
      </Card>
      <RightArrow className="mb-10" />
      <Card text="승인 대기">
        <Apply />
      </Card>
      <RightArrow className="mb-10" />
      <Card text="API 제공">
        <Test />
      </Card>
      <RightArrow className="mb-10" />
      <Card text="사용금액 수령">
        <Credit />
      </Card>
    </div>
  );
}

export default Cards;
