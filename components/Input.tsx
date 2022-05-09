/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowDropDown } from 'react-icons/md';
import styles from 'styles/Input.module.scss';
import useComponentVisible from 'hooks/useComponentVisible';
import Dropdown from './Dropdown';

interface InputProps {
  search: Boolean,
  dropDownItems?: string[],
  searchText?: string,
  setSearchText?: React.Dispatch<React.SetStateAction<string>>,
}

const Input = ({
  search, dropDownItems = [], searchText, setSearchText,
}: InputProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const items: string[] = dropDownItems;
  const renderDropdown = () => {
    setIsComponentVisible((v) => !v);
  };
  const [selectedValue, setSelectedValue] = useState('');

  // const onInputChange = () => {
  //   setSelectedValue();
  // };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchText) {
      setSearchText(e.target.value);
    }
  };

  return (
    <div ref={ref} className={styles.inputContainer}>
      { search
        ? (
          <>
            <AiOutlineSearch />
            <input
              className={styles.input}
              value={searchText}
              onChange={(e) => onSearchChange(e)}
            />
          </>
        )
        : (
          <>
            <input readOnly value={selectedValue} className={styles.input} />
            <button type="button" onClick={() => renderDropdown()}>
              <MdArrowDropDown color="white" size={20} />
            </button>
          </>
        )}
      { isComponentVisible
      && (
        <Dropdown
          items={items}
          setSelectedValue={setSelectedValue}
          setVisible={setIsComponentVisible}
        />
      )}
    </div>
  );
};

export default Input;
