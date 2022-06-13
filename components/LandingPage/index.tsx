import React from 'react';
import styles from 'styles/LandingPage.module.scss';
import Link from 'next/link';

const LandingPage = () => (

  <div className={styles.landingPageContainer}>
    <div className={styles.leftContainer}>
      <h1>The next generation anime platform</h1>
      <p>Track, share, and discover your favorite anime </p>
      <Link href="#discover">      
      <button type="button"><a>Discover</a></button>
      </Link>
    </div>
  </div>
);

export default LandingPage;
