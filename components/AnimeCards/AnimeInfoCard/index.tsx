import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useOnScreen from 'hooks/useOnScreen';
import styles from 'styles/AnimeInfoCard.module.scss';
import { AnimeCard as AnimeCardProps } from '../../Interfaces';
// id, title, main_picture, mean, status, genres, num_episodes, start_season media_type
const AnimeInfoCard = ({
  title, id, main_picture, status, genres, rank,
  num_episodes, start_season, media_type, studios, synopsis,
}: AnimeCardProps) => {
  const fmtString = (s: string) => (s.split('_').map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLocaleLowerCase()).join(' '));
  const cardRef = useRef() as React.MutableRefObject<any>;
  const isVisible = useOnScreen(cardRef);
  const [faded, setFaded] = useState(false); const statusObject: { [key: string]: string } = { finished_airing: 'Finished', currently_airing: 'Airing' };
  const [synopsisActive, setSynopsisActive] = useState(false);
  const renderStudiosText = () => {
    const studioArray = studios.map(({ name }) => name);
    return <div>{studioArray.join(', ')}</div>;
  };

  const mediaText =  media_type === 'movie' ? 'Movie' : media_type.toUpperCase();
  const startSeasonText = `${fmtString(start_season.season)} ${start_season.year}`;
  useEffect(() => {
    if (isVisible) {
      setFaded(true);
    }
  }, [isVisible]);
  return (
    <div
      className={styles.card}
      key={id}
      ref={cardRef}
      style={{ opacity: faded ? 1 : 0, transition: 'all 0.3s ease-in-out' }}
    >
      <Link href={`/anime/${id}`} passHref>

        <div className={styles.imageContainer}>
          <Image
            src={main_picture.large}
            alt={title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
          <div className={styles.imageOverlay}>
            {title}
          </div>
          { rank
          && <div className={styles.rank}>{rank}</div>}
        </div>
      </Link>

      <div className={styles.textContentContainer}>
        <div className={styles.headerContentContainer}>
          <h3>
            { start_season ? startSeasonText : 'none'}
            {' '}
            -
            {' '}
            <span>{statusObject[status] || 'n/a'}</span>
          </h3>
          <p>
            {media_type ? mediaText : 'N/A'}
            {' '}
            -
            {' '}
            {num_episodes && num_episodes === 1 ? `${num_episodes} Episode` : `${num_episodes} Episodes`}
          </p>
          <div>{studios && renderStudiosText()}</div>
        </div>

        <p className={`${styles.synopsis}`} style={{ paddingRight: synopsisActive ? 14 : 20, overflow: synopsisActive ? 'auto' : 'hidden' }} onMouseEnter={() => setSynopsisActive(true)} onMouseLeave={() => setSynopsisActive(false)}>
          {synopsis}
        </p>
        <div className={styles.genreContainer}>
          { genres
                  && genres.slice(0, 3).map(({ id: genreId, name }) => (
                    <button type="button" key={genreId}>
                      {name.toLowerCase()}
                    </button>
                  ))}
        </div>
      </div>
    </div>

  );
};

export default AnimeInfoCard;
