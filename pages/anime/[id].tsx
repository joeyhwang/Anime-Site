/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from 'styles/AnimeId.module.scss';
import { Anime as AnimeType } from 'components/Interfaces';
import MiniCardRow from '@/components/MiniCardRow';
import Navbar from '@/components/Navbar';

interface AnimeProps {
  data: AnimeType
}

const Anime = ({ data }: AnimeProps) => {
  console.log(data);
  const {
    average_episode_duration, broadcast, end_date, genres, main_picture,
    mean, media_type, num_episodes, num_list_users, num_scoring_users,
    popularity, rank, recommendations, related_anime, source, start_date,
    statistics, status, studios, synopsis, title,
  } = data || {};
  const fmtString = (s: string) => (s.split('_').map((e) => e.charAt(0).toUpperCase() + e.substring(1).toLocaleLowerCase()).join(' '));

  const convertSecondsToMin = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const fmtNum = (num: number) => num.toString().padStart(2, '0');
    return `${fmtNum(minutes)} min`;
  };
  // const router = useRouter();
  // const { id } = router.query;
  const infoColumn = (infoTitle: string, value: string | number | undefined) => {
    const info = value || 'unknown';
    return (
      <div className={styles.infoColumn}>
        <h3>{infoTitle}</h3>
        <div>{info}</div>
      </div>
    );
  };

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
                </h1>
                <div className={styles.subHeader}>
                  Rank:
                  {' '}
                  <span>{rank || 'N/A'}</span>
                  Popularity:
                  {' '}
                  <span>{popularity || 'N/A'}</span>
                  Score:
                  {' '}
                  <span>{mean || 'N/A'}</span>
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
              { infoColumn('Source', fmtString(source))}
              { infoColumn('Status', fmtString(status))}
              { infoColumn('Episode Duration', convertSecondsToMin(average_episode_duration))}
              <div>
                {genres.map(({ id, name }) => (
                  <div key={id}>
                    {name}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.placeholder}>
              <MiniCardRow
                recommendations={recommendations}
                title="Recommendations"
              />

              {/* <div className={styles.recommendationContainer}>
                <h3>Recommendations</h3>
                <div className={styles.recommendationGrid}>
                  {
                  recommendations.map(({ node, num_recommendations }) => (
                    <div key={node.id}>
                      <RecommendationCard
                        data={node}
                        num_recommendations={num_recommendations}
                      />
                    </div>
                  ))
                }
                </div>
              </div> */}
              <div>
                <MiniCardRow
                  relatedAnime={related_anime}
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

  const res = await fetch(
    `https://api.myanimelist.net/v2/anime/${id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics`,
    {
      method: 'get',
      headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.NEXT_PUBLIC_CLIENT_ID }),
    },
  );

  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
export default Anime;
