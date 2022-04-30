/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  useState, useRef, useEffect, Fragment,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AnimeRes } from '../../../src/components/Interfaces';
import AnimeCard from '../../../src/components/AnimeCard';
import styles from '../../../styles/Category.module.scss';
import Navbar from '../../../src/components/Navbar';
import useOnScreen from '../../../src/hooks/useOnScreen';
import ScrollButton from '../../../src/components/ScrollButton';
import FilterInputs from '../../../src/components/FilterInputs';

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
    if (isVisible) {
      axios.get('/api/hello', { params: { url: next } }).then((res) => res.data.data).then(({ data: d, paging: p }) => {
        setAnimeData((animeD) => [...animeD, ...d]);
        setNext(p.next);
      });
    }
  }, [isVisible, next]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* <h1>{category?.toString().toUpperCase()}</h1> */}
        <FilterInputs showFilter filterText={filterText} setFilterText={setFilterText} />
        <ScrollButton />
        <div className={styles.grid}>
          { animeData && animeData.map(({ node }) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const {
              title, id, main_picture, mean, status, genres, rank,
              num_episodes, start_season, media_type, studios,
            } = node;
            return (
              <Fragment key={id}>
                {title.toLowerCase().includes(filterText.toLowerCase())
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
