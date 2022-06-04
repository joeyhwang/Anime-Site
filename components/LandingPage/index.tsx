import React from 'react'
import styles from 'styles/LandingPage.module.scss';

const LandingPage = () => {
  return (

    <div className={styles.landingPageContainer}>
        <div className={styles.leftContainer}>
            <h1>The next generation anime platform</h1>
            <p>Track, share, and discover your favorite anime </p>
            
                <button>Discover</button>
        </div>
    </div>
  )
}

export default LandingPage