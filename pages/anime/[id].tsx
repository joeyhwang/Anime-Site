/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from 'styles/AnimeId.module.scss';
import { Anime as AnimeType } from 'components/Interfaces';
import MiniCardRow from 'components/MiniCardRow';
import Navbar from 'components/Navbar';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface infoArray {
  id: number,
  name: string,
}

interface AnimeProps {
  data: AnimeType
}

const Anime = ({ data }: AnimeProps) => {
  const {
    average_episode_duration, broadcast, end_date, genres, main_picture,
    mean, media_type, num_episodes, num_scoring_users,
    popularity, rank, recommendations, related_anime, source, start_date,
    statistics, status, studios, synopsis, title,
  } = data || {};
  const router = useRouter();
  const { id : animeId} = router.query;  
  const fmtString = (s: string) => (s.split('_').map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLocaleLowerCase()).join(' '));
  const convertSecondsToMin = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const fmtNum = (num: number) => num.toString().padStart(2, '0');
    return `${fmtNum(minutes)} min`;
  };
  const infoColumn = (infoTitle: string, value: string | number | infoArray[] | undefined) => (
    <div className={styles.infoColumn}>
      <h3>{infoTitle}</h3>
      { Array.isArray(value)
        ? ( value.length === 0 ? <div>unknown</div> : 
          value.map(({ id, name }) => (
            <div key={id}>
              {name}
            </div>
        )))
        : <div>{value || 'unknown'}</div>}
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.bodyHeader}>
            <div className={styles.imageContainer}>
              <Image
                src={main_picture.large}
                alt={title}
                layout="fill"
                objectFit="cover"
                className={styles.image}
              />
            </div>
            <div className={styles.headerTextContainer}>
              <div>
                <h1>
                  {`${title} (${media_type.toUpperCase()})`}
                    &nbsp;
                    &nbsp;
                    <a href={`https://myanimelist.net/anime/${animeId}`} target="_blank">
                      <FaExternalLinkAlt />
                    </a>
                    
                </h1>
                <div className={styles.subHeader}>
                  Rank:
                  {' '}
                  <span>{rank || 'N/A'}</span>
                  Score:
                  {' '}
                  <span>{mean || 'N/A'}</span>
                  Popularity:
                  {' '}
                  <span>{popularity || 'N/A'}</span>

                  Members:
                  {' '}
                  <span>{statistics.num_list_users.toLocaleString('en-US') || 'N/A'}</span>

                </div>
              </div>

              <div className={styles.synopsis}>
                {synopsis}
              </div>
            </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.info}>
              { infoColumn('Episodes', num_episodes)}
              { infoColumn('Start Date', start_date)}
              { infoColumn('End Date', end_date)}
              { infoColumn('Broadcast', broadcast && broadcast.start_time)}
              { infoColumn(studios.length > 1 ? 'Studios' : 'Studio', studios)}
              { infoColumn('Source', fmtString(source))}
              { infoColumn('Status', fmtString(status))}
              { infoColumn('Episode Duration', average_episode_duration === 0 ? 'unknown' : convertSecondsToMin(average_episode_duration) )}
              <div>
                <div className={styles.infoColumn}>
                  <h3>{genres.length > 1 ? 'Genres' : 'Genre'}</h3>
                  { genres.length === 0 ? 
                  <div>unknown</div> : 
                  genres.map(({ id, name }) => (
                    <div key={id}>
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.placeholder}>
              <MiniCardRow
                animeData={recommendations}
                title="Recommendations"
              />
              <div>
                <MiniCardRow
                  animeData={related_anime}
                  title="Related Anime"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: { query: { id: number; }; }) {
  const { id } = context.query;
  let data = {}
  if (process.env.NEXT_PUBLIC_CLIENT_ID) {
    const res = await fetch(
      `https://api.myanimelist.net/v2/anime/${id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics`,
      {
        method: 'get',
        headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.NEXT_PUBLIC_CLIENT_ID }),
      },
    );
  
    data = await res.json();
  }


  return {
    props: { data }, // will be passed to the page component as props
  };
}
export default Anime;
