import React from 'react'
import styles from 'styles/ViewMoreButton.module.scss';

interface ViewMoreBtnProps {
    setViewMore: () => void,
    viewMore: boolean,
    text: 'show' | 'view',
}

const ViewMoreBtn = ({viewMore, text, setViewMore} : ViewMoreBtnProps) => {
  return (
      <button className={styles.viewMoreBtn} type="button" onClick={setViewMore}>
        {viewMore ? `${text} less` : `${text} more`}
      </button>
  )
}

export default ViewMoreBtn