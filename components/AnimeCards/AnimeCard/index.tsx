import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useOnScreen from 'hooks/useOnScreen';
import styles from 'styles/AnimeCard.module.scss';
import { AnimeCard as AnimeCardProps } from '../../Interfaces';

// id, title, main_picture, mean, status, genres, num_episodes, start_season media_type
const AnimeCard = ({
  title, id, main_picture, mean, status, genres, rank,
  num_episodes, start_season, media_type, studios, i,
}: AnimeCardProps) => {
  const [showHoverCard, setShowHoverCard] = useState(false);
  const fmtString = (s: string) => (s.split('_').map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLocaleLowerCase()).join(' '));
  const cardRef = useRef() as React.MutableRefObject<any>;
  const isVisible = useOnScreen(cardRef);
  const [faded, setFaded] = useState(false);
  const previewRef = useRef() as React.MutableRefObject<any>;
  const [overflow, setOverflow] = useState(false);
  const renderStudiosText = () => {
    const studioArray = studios.map(({ name }) => name);
    return <div>{studioArray.join(', ')}</div>;
  };

  useEffect(() => {
    if (isVisible) {
      setFaded(true);
    }
  }, [isVisible]);

  useEffect(() => {
    const { right } = previewRef.current.getBoundingClientRect();
    if (right >= window.innerWidth) {
      setOverflow(true);
    }
  }, [showHoverCard]);
  return (
    <Link href={`/anime/${id}`} passHref>

      <div
        className={styles.card}
        key={id}
        onMouseEnter={() => setShowHoverCard(true)}
        onMouseLeave={() => setShowHoverCard(false)}
        ref={cardRef}
        style={{ opacity: faded ? 1 : 0, transition: `all ${(i % 6) / 3.5}s ease-in-out` }}
      >
        <div className={`${styles.preview} ${overflow && styles.previewLeft}`} ref={previewRef} style={{ display: showHoverCard ? 'flex' : 'none' }}>
          <div className={styles.topPreviewContainer}>
            {
              start_season
                ? <h2>{`${fmtString(start_season.season)} ${start_season.year}`}</h2>
                : <h2>Unknown</h2>
            }
            <div className={styles.ratingContainer}>
              <strong>
                {mean && mean}
              </strong>
              {` ${media_type && media_type.toUpperCase()} ${status && fmtString(status)}`}
            </div>
            <div className={styles.bodyContainer}>
              {
                (num_episodes && num_episodes >= 1)
                  ? (
                    <div>
                      {`${num_episodes} ${num_episodes === 1 ? 'Episode' : 'Episodes'}`}
                    </div>
                  ) : null
              }
              {
                studios
                  ? (
                    <div className={styles.studioContainer}>
                      {
                      studios && renderStudiosText()
                    }
                    </div>
                  ) : null
              }
            </div>

          </div>
          {
            genres
            && (
            <div className={styles.genreContainer}>
              {
                genres && genres.slice(0, 3).map(({ name, id: genreId }) => <button key={genreId} type="button">{name.toLowerCase()}</button>)
              }
            </div>
            )
         }
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={main_picture.large}
            alt={title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
          { rank
          && <div className={styles.rank}>{rank}</div>}
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </Link>

  );
};

export default AnimeCard;
