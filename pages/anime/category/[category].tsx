/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  useState, useRef, useEffect, Fragment,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from 'styles/Home.module.scss';
import { AnimeRes } from 'components/Interfaces';
import AnimeCard from 'components/AnimeCard';
import Navbar from 'components/Navbar';
import useOnScreen from 'hooks/useOnScreen';
import ScrollButton from 'components/ScrollButton';
import FilterInputs from 'components/FilterInputs';

interface CategoryProps {
  data: { data: AnimeRes[], paging: { next: string, previous?: string } }
}

const Category = ({ data }: CategoryProps) => {
  const router = useRouter();
  const { category } = router.query;
  const [next, setNext] = useState(data.paging.next);
  const [animeData, setAnimeData] = useState(data.data);
  const gridRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const isVisible = useOnScreen(gridRef);
  const [filterText, setFilterText] = useState('');
  useEffect(() => {
    if (filterText === '' && isVisible && next) {
      axios.get('/api/hello', { params: { url: next } }).then((res) => res.data.data).then(({ data: d, paging: p }) => {
        setAnimeData((animeD) => [...animeD, ...d]);
        setNext(p.next);
      });
    }
  }, [isVisible, next, filterText]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* <h1>{category?.toString().toUpperCase()}</h1> */}
        <FilterInputs showFilter filterText={filterText} setFilterText={setFilterText} />
        <ScrollButton />
        <div className={styles.titleContainer}>
          <h1>{category?.toString().toUpperCase()}</h1>
        </div>
        <div className={styles.grid}>
          { animeData && animeData.map(({ node }, i) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const {
              title, id, main_picture, mean, status, genres, rank,
              num_episodes, start_season, media_type, studios,
            } = node;
            const unwrap = rank && mean && status && genres
            && start_season && media_type && studios;
            return (
              <Fragment key={id}>
                {(unwrap && title.toLowerCase().includes(filterText.toLowerCase()))
                  && (
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
                  )}

              </Fragment>
            );
          })}
        </div>
        <div style={{ height: 0 }} ref={gridRef} />
      </div>
    </>
  );
};

export async function getServerSideProps(context: { query: { category: string; }; }) {
  const { category } = context.query;

  const res = await fetch(
    `https://api.myanimelist.net/v2/anime/ranking?ranking_type=${category}&limit=100&fields=id,title,main_picture,mean,status,genres,num_episodes,start_season,media_type,rank,studios`,
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

export default Category;
