import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useOnScreen from 'hooks/useOnScreen';
import styles from 'styles/HorizontalAnimeCard.module.scss';
import { AnimeCard as AnimeCardProps } from '../../Interfaces';
// id, title, main_picture, mean, status, genres, num_episodes, start_season media_type
const HorizontalAnimeCard = ({
  title, id, main_picture, mean, status, genres, rank,
  num_episodes, start_season, media_type, studios, i, num_list_users,
}: AnimeCardProps) => {
  const fmtString = (s: string) => (s.split('_').map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLocaleLowerCase()).join(' '));
  const cardRef = useRef() as React.MutableRefObject<any>;
  const isVisible = useOnScreen(cardRef);
  const [faded, setFaded] = useState(false);
  const statusObject: { [key: string]: string } = { finished_airing: 'Finished', currently_airing: 'Airing' };
  const renderStudiosText = () => {
    const studioArray = studios.map(({ name }) => name);
    return <p>{studioArray.join(', ')}</p>;
  };
  
  useEffect(() => {
    if (isVisible) {
      setFaded(true);
    }
  }, [isVisible]);
  return (
    <Link href={`/anime/${id}`} passHref>
      <div
        className={styles.card}
        key={id}
        ref={cardRef}
        style={{ opacity: faded ? 1 : 0, transition: 'all 0.3s ease-in-out' }}
      >
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
        <div className={styles.wholeRowContainer}>

          <div className={styles.rowItemsContainer}>

            <div className={styles.columnContainer}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.genreContainer}>

                { genres
                      && genres.map(({ id, name }) => (
                        <button type="button" key={id}>
                          {name.toLowerCase()}
                        </button>
                      ))}
              </div>
            </div>
          </div>

            <div className={styles.rowItemsContainer} >
              <div className={styles.columnContainer}>
                <h3>
                  {`Score ${mean || 'n/a'}`}
                </h3>
                <p>
                  Users: {num_list_users && num_list_users.toLocaleString('en-US') || 'n/a'}
                </p>
              </div>
              {/* <div className={styles.columnContainer}>
                <h3>
                  {`Studios`}
                </h3>
                {
                studios
                  ? (
                    <>
                      {
                      studios && renderStudiosText()
                    }
                    </>
                  ) : null
              }
              
              </div> */}
              <div className={styles.columnContainer}>
                <h3>{media_type ? (media_type === 'movie' ? 'Movie' : media_type.toUpperCase()) : 'N/A'}</h3>
                <p>{num_episodes && num_episodes === 1 ? `${num_episodes} Episode` : `${num_episodes} Episodes`}</p>
              </div>
              <div className={styles.columnContainer}>
                <h3>{statusObject[status] || 'n/a'}</h3>
                <p>{ start_season ? `${fmtString(start_season.season)} ${start_season.year}` : 'none'}</p>
              </div>
            </div>
        </div>

      </div>
    </Link>

  );
};

export default HorizontalAnimeCard;
