/* eslint-disable @typescript-eslint/naming-convention */
import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/Home.module.scss';
import Navbar from 'components/Navbar';
import AnimeCard from 'components/AnimeCards/AnimeCard';
import { AnimeRes } from 'components/Interfaces';
import ScrollButton from 'components/Buttons/ScrollButton';
import FilterInputs from 'components/FilterInputs';
import { FiArrowRight } from 'react-icons/fi';
import LandingPage from 'components/LandingPage';

interface HomeProps {
  all: { data: AnimeRes[] },
  airing: { data: AnimeRes[] },
  favorite: { data: AnimeRes[] },
  movie: { data: AnimeRes[] },
  popularity: { data: AnimeRes[] },
  upcoming: { data: AnimeRes[] },

}

const Home: NextPage<HomeProps> = ({
  all, airing, favorite, movie, popularity, upcoming,
}: HomeProps) => {
  const categoryArray = [{ anime: all.data, title: 'All Time', route: 'all' },
    { anime: airing.data, title: 'Currently Airing', route: 'airing' },
    { anime: favorite.data, title: 'Favorites', route: 'favorite' },
    { anime: movie.data, title: 'Movies', route: 'movie' },
    { anime: popularity.data, title: 'Most Popular', route: 'bypopularity' },
    { anime: upcoming.data, title: 'Upcoming', route: 'upcoming' }];
  const renderAnime = (anime: AnimeRes[]) => (
    anime.map(({ node }, i) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const {
        title, id, main_picture, mean, status, genres, rank,
        num_episodes, start_season, media_type, studios,
      } = node;

      return (
        <Fragment key={id}>
          <AnimeCard
            title={title}
            id={id}
            main_picture={main_picture}
            rank={rank}
            mean={mean}
            status={status}
            genres={genres}
            num_episodes={num_episodes}
            start_season={start_season}
            media_type={media_type}
            studios={studios}
            i={i}
          />
        </Fragment>
      );
    })
  );

  const renderAnimeLists = () => (
    <>
      {
        categoryArray.map(({ anime, title, route }) => (
          <Fragment key={title}>
            <div className={styles.titleContainer}>
              <h1>{title}</h1>
              <Link href={`/anime/category/${route}`} passHref>
                <button type="button" aria-label="View More" className={styles.viewMoreBtn}>
                  <FiArrowRight />
                </button>
              </Link>
            </div>
            <div className={styles.grid}>
              {renderAnime(anime)}
            </div>
          </Fragment>
        ))
      }
    </>
  );

  return (
    <div className={styles.main}>
      <Head>
        <title>animesite</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar landingPage />
      <ScrollButton />
      <LandingPage />
      <div id="discover" className={styles.container}>
        { renderAnimeLists() }
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  if (process.env.NEXT_PUBLIC_CLIENT_ID) {
    const [allRes, airingRes, upcomingRes, movieRes, favoriteRes, popularityRes] = await Promise.all([
      fetch(
        'https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=6&fields=id,title,main_picture,mean,status,genres,num_episodes,start_season,media_type,rank,studios',
        {
          method: 'get',
          headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.NEXT_PUBLIC_CLIENT_ID }),
        },
      ),
      fetch(
        'https://api.myanimelist.net/v2/anime/ranking?ranking_type=airing&limit=6&fields=id,title,main_picture,mean,status,genres,num_episodes,start_season,media_type,rank,studios',
        {
          method: 'get',
          headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.NEXT_PUBLIC_CLIENT_ID }),
        },
      ),
      fetch(
        'https://api.myanimelist.net/v2/anime/ranking?ranking_type=upcoming&limit=6&fields=id,title,main_picture,mean,status,genres,num_episodes,start_season,media_type,rank,studios',
        {
          method: 'get',
          headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.NEXT_PUBLIC_CLIENT_ID }),
        },
      ),
      fetch(
        'https://api.myanimelist.net/v2/anime/ranking?ranking_type=movie&limit=6&fields=id,title,main_picture,mean,status,genres,num_episodes,start_season,media_type,rank,studios',
        {
          method: 'get',
          headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.NEXT_PUBLIC_CLIENT_ID }),
        },
      ),
      fetch(
        'https://api.myanimelist.net/v2/anime/ranking?ranking_type=favorite&limit=6&fields=id,title,main_picture,mean,status,genres,num_episodes,start_season,media_type,rank,studios',
        {
          method: 'get',
          headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.NEXT_PUBLIC_CLIENT_ID }),
        },
      ),
      fetch(
        'https://api.myanimelist.net/v2/anime/ranking?ranking_type=bypopularity&limit=6&fields=id,title,main_picture,mean,status,genres,num_episodes,start_season,media_type,rank,studios',
        {
          method: 'get',
          headers: new Headers({ 'X-MAL-CLIENT-ID': process.env.NEXT_PUBLIC_CLIENT_ID }),
        },
      ),
    ]);

    const [all, airing, upcoming, movie, favorite, popularity] = await Promise.all([
      allRes.json(),
      airingRes.json(),
      upcomingRes.json(),
      movieRes.json(),
      favoriteRes.json(),
      popularityRes.json(),
    ]);

    // Pass data to the page via props
    return {
      props: {
        all, airing, upcoming, movie, favorite, popularity,
      },
    };
  }
}

export default Home;
