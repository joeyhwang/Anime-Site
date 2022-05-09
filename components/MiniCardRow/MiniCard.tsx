/* eslint-disable react/require-default-props */
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Anime } from 'components/Interfaces';
import styles from 'styles/MiniCard.module.scss';
import useIsOverflow from 'hooks/useIsOverflow';

interface RecommendationCardProps {
  data: Anime,
  num_recommendations?: number,
  relation_type_formatted?: string,
}

const MiniCard = ({
  data, num_recommendations, relation_type_formatted,
}: RecommendationCardProps) => {
  const { id, title, main_picture: mainPicture } = data;
  const ref = useRef<HTMLHeadingElement>(null);
  const isOverflow = useIsOverflow(ref, true, undefined);
  // console.log(isOverflow, title);
  return (
    <Link href={`/anime/${id}`} passHref>

      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={mainPicture.large}
            alt={title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
        <div ref={ref} style={{ overflow: 'hidden', height: '1.1rem' }}>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
    </Link>

  );
};

export default MiniCard;
