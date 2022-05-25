import React, { useState } from 'react';
import Link from 'next/link';
import styles from 'styles/Navbar.module.scss';
import Input from './Input';

const Navbar = () => {
  const code = 'NklUDX_CzS8qrMGWaDzgKs6VqrinuVFHa0xnpWPDy7_fggtM6kAar4jnTwOgzK7nPYfE9n60rsY4fhDExWzr5bf7sEvMMmSXcT2hWkCstFGIJKoaimoq5GvAEQD8NZ8g';
  const [searchText, setSearchText] = useState('');
  return (
    <nav className={styles.nav}>
      <div style={{ marginRight: '2rem' }}>
        <Link href="/">
          <a>Anime</a>
        </Link>
      </div>
      <Input search searchText={searchText} setSearchText={setSearchText} />
      <a href={`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&code_challenge=${code}&state=RequestID42&redirect_uri=http://localhost:3000`}>login</a>
    </nav>
  );
};

export default Navbar;
