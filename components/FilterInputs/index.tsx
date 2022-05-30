/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import styles from 'styles/FilterInputs.module.scss';
import Input from './Input';
import { BsGrid3X3GapFill, BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';


interface FilterInputsProps {
  showFilter: boolean,
  filterText?: string,
  setFilterText?: React.Dispatch<React.SetStateAction<string>>,
  setFilterButton?: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
  filterButton?: 0 | 1 | 2;
}

const FilterInputs = ({ showFilter, filterText, setFilterText, filterButton, setFilterButton }: FilterInputsProps) => {
  const yearDropdownItems = Array(20).fill(1).map((j, i) => (2022 - i).toString());
  const seasonDropdownItems = ['Winter', 'Spring', 'Summer', 'Fall'];
  const a = 'r';
  return (
    <div className={styles.row}>
      <div className={styles.leftContainer}>
        { showFilter
            && (
            <div className={styles.queryContainer}>
              <h2>Filter</h2>
              <Input search searchText={filterText} setSearchText={setFilterText} />
            </div>
            )}

        {/* <div className={styles.queryContainer}>
          <h2>Genres</h2>
          <Input dropDownItems={seasonDropdownItems} search={false} />
        </div> */}
        <div className={styles.queryContainer}>
          <h2>Season</h2>
          <Input dropDownItems={seasonDropdownItems} search={false} />
        </div>
        <div className={styles.queryContainer}>
          <h2>Year</h2>
          <Input dropDownItems={yearDropdownItems} search={false} />
        </div>
      </div>

      { filterButton !== undefined && setFilterButton && 
        <div className={styles.rightContainer}>
          <button type="button" style={{color: filterButton === 0 ? 'white' : '#647380'}} onClick={() => setFilterButton(0)}>
            <BsGrid3X3GapFill />
          </button>
          <button type="button" style={{color: filterButton === 1 ? 'white' : '#647380'}} onClick={() => setFilterButton(1)}>
            <BsFillGridFill />
          </button>
          <button type="button" style={{color: filterButton === 2 ? 'white' : '#647380'}} onClick={() => setFilterButton(2)}>
            <FaThList />
          </button>
        </div>
      }
      
    </div>
  );
};

export default FilterInputs;
