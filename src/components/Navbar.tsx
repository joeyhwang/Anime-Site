import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.scss';
import Input from './Input';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <nav className={styles.nav}>
      <div style={{ marginRight: '2rem' }}>
        <Link href="/">
          <a>Anime</a>
        </Link>
      </div>

      <Input search searchText={searchText} setSearchText={setSearchText} />
    </nav>
  );
};

export default Navbar;
