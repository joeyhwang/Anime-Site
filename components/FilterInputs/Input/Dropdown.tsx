import React from 'react';
import styles from 'styles/Dropdown.module.scss';

interface DropdownProps {
  items: string[],
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Dropdown = ({ items, setSelectedValue, setVisible }: DropdownProps) => {
  const handleClick = (item: string) => {
    setSelectedValue(item);
    setVisible(false);
  };

  return (
    <ul className={styles.dropdown}>
      {items?.map((item) => (
        <li key={item} onClick={() => handleClick(item)} onKeyDown={() => handleClick(item)}>
          <div aria-hidden>
            {item}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
