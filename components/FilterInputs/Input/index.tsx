/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useMemo } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowDropDown } from 'react-icons/md';
import styles from 'styles/Input.module.scss';
import debounce from 'lodash.debounce';
import useComponentVisible from 'hooks/useComponentVisible';
import { useRouter } from 'next/router';
import Dropdown from './Dropdown';

interface InputProps {
  search: Boolean,
  dropDownItems?: string[],
  searchText?: string,
  setSearchText?: React.Dispatch<React.SetStateAction<string>>,
  searchOnEnter?: boolean,
}

const Input = ({
  search, dropDownItems = [], searchText, setSearchText, searchOnEnter
}: InputProps) => {
  const router = useRouter();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const items: string[] = dropDownItems;
  const renderDropdown = () => {
    setIsComponentVisible((v) => !v);
  };
  const [selectedValue, setSelectedValue] = useState('');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchText) {
      setSearchText(e.target.value);
    }
  };

  const pushSearch = (e: any) => {
    if (searchOnEnter && e.key === 'Enter' && e.target.value !== '') {
      router.push(`/anime/search/${e.target.value}`).then(() => router.pathname.includes('/anime/search/') && router.reload());
    }
  };
  const debouncedResults = useMemo(() => debounce(onSearchChange, 300), []);

  useEffect(() => () => {
    debouncedResults.cancel();
  });

  return (
    <div ref={ref} className={styles.inputContainer}>
      { search
        ? (
          <>
            <AiOutlineSearch />
            <input
              role="search"
              type="search"
              className={styles.input}
              onChange={debouncedResults}
              onKeyDown={(e) => pushSearch(e)}
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
