import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/main/HowToUse.scss';
import { ReactComponent as DownArrow } from 'assets/main/downarrow.svg';
import { ReactComponent as Question } from 'assets/main/question.svg';
import SearchBar from 'components/common/SearchBar';
import { Fade } from 'react-awesome-reveal';
import Cards from 'components/main/Cards';

interface HowToUseProps {
  authority: string;
}

function HowToUse({ authority }: HowToUseProps) {
  const navigate = useNavigate();
  const categoryList = ['지도', '검색', '도서', '차량'];
  const onCategoryHandler = (page: string) => {
    navigate('/api_list', { state: { category: page } });
  };

  const onSupplyHandler = (page: string) => {
    if (page === 'supply') {
      navigate('/supply');
    } else {
      navigate('/supply/submit');
    }
  };

  const scrollToHowToUse = () => {
    const howToUseSection = document.getElementById('howToUse');
    if (howToUseSection) {
      howToUseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="all-container" id="howToUse">
      <Fade cascade damping={0.15}>
        <div className="center pb-5">
          <DownArrow className="arrow" onClick={scrollToHowToUse} />
        </div>
        <div className="center text-3xl font-bold pt-3 pb-10 set-font">
          ASAP에서 당신의 비즈니스를 시작해보세요 !
        </div>
        {authority === 'user' ? (
          <div className="center pb-14 flex-col items-center">
            <div className="enlarge w-full center">
              <SearchBar />
            </div>
            <div>
              {categoryList.map((category) => (
                <button
                  type="button"
                  key={category}
                  className="tag-button"
                  onClick={() => onCategoryHandler(category)}
                >
                  #&nbsp;{category}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="center pb-14 items-center">
            <button
              type="button"
              className="supplier-button up"
              onClick={() => onSupplyHandler('supply')}
            >
              API 제공 내역
            </button>

            <button
              type="button"
              className="supplier-button up"
              onClick={() => onSupplyHandler('submit')}
            >
              API 제공 신청
            </button>
          </div>
        )}

        <div className="how-to-use center">
          <div className="center">
            <div className="flex-col flex">
              <div className="flex items-baseline pb-5">
                <div className="title-text">How To Use</div>
                <Question className="w-12 h-auto" />
              </div>
              <Cards authority={authority} />
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default HowToUse;
