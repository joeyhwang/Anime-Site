import React, { useState, useEffect } from 'react';
// import { FaArrowCircleUp } from 'react-icons/fa';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import styles from 'styles/ScrollButton.module.scss';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);

    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <>
      {/* <FaArrowCircleUp /> */}
      <BsFillArrowUpCircleFill
        className={styles.scrollButton}
        onClick={scrollToTop}
        style={{ opacity: visible ? '100%' : '0' }}
      />
    </>
  );
};

export default ScrollButton;
