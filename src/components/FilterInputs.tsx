/* eslint-disable react/require-default-props */
import React from 'react';
import Input from './Input';
import styles from '../../styles/FilterInputs.module.scss';

interface FilterInputsProps {
  showFilter: boolean,
  filterText?: string,
  setFilterText?: React.Dispatch<React.SetStateAction<string>>,
}

const FilterInputs = ({ showFilter, filterText, setFilterText }: FilterInputsProps) => {
  const yearDropdownItems = ['2022', '2021', '2020', '2019'];
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

      <div className={styles.queryContainer}>
        <h2>Genres</h2>
        <Input dropDownItems={seasonDropdownItems} search={false} />
      </div>
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
