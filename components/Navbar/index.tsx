/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import Link from 'next/link';
import styles from 'styles/Navbar.module.scss';
import Input from 'components/FilterInputs/Input';

interface NavbarProps {
  landingPage?: boolean,
}

const Navbar = ({ landingPage }: NavbarProps) => {
  const [searchText, setSearchText] = useState('');
  return (
    <nav className={`${styles.nav} ${landingPage && styles.test}`}>

      <div>
        <Link href="/" passHref>
          <a>animesite</a>
        </Link>
      </div>
      <div>
        <Input search searchText={searchText} setSearchText={setSearchText} searchOnEnter />
        {/* <a href={`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&code_challenge=${code}&state=RequestID42&redirect_uri=http://localhost:3000`}>Login</a> */}
      </div>

    </nav>
  );
};

export default Navbar;
