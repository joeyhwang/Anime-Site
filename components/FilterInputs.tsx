/* eslint-disable react/require-default-props */
import React from 'react';
import styles from 'styles/FilterInputs.module.scss';
import Input from './Input';

interface FilterInputsProps {
  showFilter: boolean,
  filterText?: string,
  setFilterText?: React.Dispatch<React.SetStateAction<string>>,
}

const FilterInputs = ({ showFilter, filterText, setFilterText }: FilterInputsProps) => {
  const yearDropdownItems = Array(20).fill(1).map((j, i) => (2022 - i).toString());
  const seasonDropdownItems = ['Winter', 'Spring', 'Summer', 'Fall'];
  return (
    <div className={styles.row}>
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
  );
};

export default FilterInputs;
