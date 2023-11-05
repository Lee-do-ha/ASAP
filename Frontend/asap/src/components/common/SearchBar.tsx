import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'styles/common/SearchBar.scss';
import { ReactComponent as Search } from 'assets/icons/Search2.svg';
import useSearchStore from 'store/search/useSearchStore';

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchDropdown } = useSearchStore();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get('search') || '';
  const [input, setInput] = useState<string>('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchDropdown(false);
    navigate(`/api_list?search=${input}`);
  };

  useEffect(() => {
    setInput(searchKeyword);
  }, [searchKeyword]);

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="bar-container">
          <input
            value={input}
            type="text"
            className="w-11/12 border-none outline-none"
            onChange={handleInput}
            placeholder="원하시는 상품명을 입력하세요."
          />
          <button type="submit">
            <Search className="w-6" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
