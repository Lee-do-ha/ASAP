import React, { useState, KeyboardEvent } from 'react';
import 'styles/supply/InputTags.scss';
import useSubmitStore from 'store/supply/useSubmitStore';

function SubmitTags() {
  const [tags, setAddTags] = useState<string[]>([]);
  const isInputDisabled = tags.length >= 5;
  const { setTags } = useSubmitStore();

  const removeTags = (indexToRemove: number) => {
    const filteredTags = tags.filter((_, index) => index !== indexToRemove);
    setAddTags(filteredTags);
  };

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    if (
      event.key === 'Enter' &&
      inputElement.value !== '' &&
      !tags.includes(inputElement.value)
    ) {
      const updatedTags = [...tags, inputElement.value];
      setAddTags(updatedTags);
      setTags(updatedTags);
      inputElement.value = ''; // Clear the input
    }
  };

  return (
    <div className="flex flex-col">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={tag} className="tag">
            <span className="tag-title">{tag}</span>
            <button
              type="button"
              className="tag-close-icon"
              onClick={() => removeTags(index)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div className="tags-input">
        <input
          className="tag-input"
          type="text"
          onKeyUp={(e) => addTags(e)}
          placeholder="# 태그를 입력해주세요. (최대 5개)"
          disabled={isInputDisabled}
        />
      </div>
    </div>
  );
}

export default SubmitTags;
