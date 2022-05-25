import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/AnimeCard.module.scss';
import { AnimeCard as AnimeCardProps } from './Interfaces';
// id, title, main_picture, mean, status, genres, num_episodes, start_season media_type
const AnimeCard = ({
  title, id, main_picture, mean, status, genres, rank,
  num_episodes, start_season, media_type, studios,
}: AnimeCardProps) => {
  const [show, setShow] = useState(false);
  const fmtString = (s: string) => (s.split('_').map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLocaleLowerCase()).join(' '));
  const renderStudiosText = () => {
    const studioArray = studios.map(({ name }) => name);
    return <div>{studioArray.join(', ')}</div>;
  };

  return (
    <Link href={`/anime/${id}`} passHref>

      <div
        className={styles.card}
        key={id}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className={styles.preview} style={{ display: show ? 'flex' : 'none' }}>
          <div className={styles.topPreviewContainer}>
            {
              start_season
                ? <h2>{`${fmtString(start_season.season)} ${start_season.year}`}</h2>
                : <h2>Unknown</h2>
            }
            <div className={styles.ratingContainer}>
              <strong>
                {mean}
              </strong>
              {` ${media_type.toUpperCase()} ${fmtString(status)}`}
            </div>
            <div>
              {
                (num_episodes && num_episodes >= 1)
                && (
                <div>
                  {`${num_episodes} Episodes`}
                </div>
                )
              }

              {
                studios
                && (
                  <div className={styles.studioContainer}>
                    {
                      renderStudiosText()
                    }
                  </div>
                )
              }
            </div>

          </div>
          {
            genres
            && (
            <div className={styles.genreContainer}>
              {
                genres.slice(0, 3).map(({ name, id: genreId }) => <button key={genreId} type="button">{name}</button>)
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
