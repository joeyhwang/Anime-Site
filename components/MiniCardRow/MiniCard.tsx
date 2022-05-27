/* eslint-disable react/require-default-props */
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Anime } from 'components/Interfaces';
import styles from 'styles/MiniCard.module.scss';
import useIsOverflow from 'hooks/useIsOverflow';
import useOnScreen from 'hooks/useOnScreen';

interface RecommendationCardProps {
  data: Anime,
  num_recommendations?: number,
  relation_type_formatted?: string,
  i: number,
}

const MiniCard = ({
  data, num_recommendations, relation_type_formatted, i
}: RecommendationCardProps) => {
  const { id, title, main_picture: mainPicture } = data;
  const overflowRef = useRef<HTMLHeadingElement>(null);
  const isOverflow = useIsOverflow(overflowRef, true, undefined);
  const cardRef = useRef() as React.MutableRefObject<any>;
  const [faded, setFaded] = useState(false);
  const isVisible = useOnScreen(cardRef);
  useEffect(() => {
    if (isVisible) {
      setFaded(true);
    } 
  },[isVisible])

  return (
    <Link href={`/anime/${id}`} passHref>

      <div className={styles.card} ref={cardRef}
        style={{ opacity: faded ? 1 : 0, transition: `all ${(i % 10)/3}s ease-in-out` }}
        >
        <div className={styles.imageContainer}>
          <Image
            src={mainPicture.large}
            alt={title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
        <div ref={overflowRef} style={{ overflow: 'hidden', height: '1.1rem' }}>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
    </Link>

  );
};

export default MiniCard;
