import React, {
  useState, useRef, useEffect, Fragment,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from 'styles/AnimeCardGrid.module.scss';
import { AnimeRes } from 'components/Interfaces';
import AnimeCard from 'components/AnimeCards/AnimeCard';
import Navbar from 'components/Navbar';
import useOnScreen from 'hooks/useOnScreen';
import ScrollButton from 'components/ScrollButton';
import FilterInputs from 'components/FilterInputs';
import HorizontalAnimeCard from 'components/AnimeCards/HorizontalAnimeCard';
import AnimeInfoCard from 'components/AnimeCards/AnimeInfoCard';

interface AnimeCardGridProps {
  data: { data: AnimeRes[], paging?: { next: string, previous?: string } },
}

const AnimeCardGrid = ({ data }: AnimeCardGridProps) => {

  if (!data) {
    return null
  }

  const router = useRouter();
  const { category, query } = router.query;
  const [next, setNext] = useState(data.paging?.next);
  const [animeData, setAnimeData] = useState(data.data);
  const [filterButtonActive, setFilterButtonActive] = useState<0 | 1 | 2>(0);
  const gridRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const isVisible = useOnScreen(gridRef);
  const [filterText, setFilterText] = useState('');
  const titleObject : { [key: string]: string } = {
    all: 'All Time',
    bypopularity: 'Most Popular',
    airing: 'Currently Airing',
    favorite: 'Favorites',
    movie: 'Movies',
    upcoming: 'Upcoming',
  };
  const categoryString = typeof category === 'string' ? category : '';
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
        <div className={styles.titleContainer}>
          {
                category
                  && <h1>{titleObject[categoryString]}</h1>
                }
          {
                    query && (
                    <h1>
                      {`Results for "${query}"`}
                    </h1>
                    )
                }
        </div>
        <FilterInputs
          showFilter
          filterText={filterText}
          setFilterText={setFilterText}
          setFilterButton={setFilterButtonActive}
          filterButton={filterButtonActive}
        />
        <ScrollButton />

        <div className={styles.grid} style={{ display: filterButtonActive === 0 ? 'grid' : 'none' }}>
          { animeData && animeData.map(({ node }, i) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const {
              title, id, main_picture, mean, status, genres, rank,
              num_episodes, start_season, media_type, studios, num_list_users,
            } = node;

            return (
              <Fragment key={id}>
                {(title.toLowerCase().includes(filterText.toLowerCase()))
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
                          num_list_users={num_list_users}
                          i={i}
                        />
                      )}
              </Fragment>
            );
          })}
        </div>

        <div className={styles.infoGrid} style={{ display: filterButtonActive === 1 ? 'grid' : 'none' }}>
          { animeData && animeData.map(({ node }, i) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const {
              title, id, main_picture, mean, status, genres, rank,
              num_episodes, start_season, media_type, studios, num_list_users, synopsis,
            } = node;

            return (
              <Fragment key={id}>
                {(title.toLowerCase().includes(filterText.toLowerCase()))
                        && (
                          <AnimeInfoCard
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
                            num_list_users={num_list_users}
                            i={i}
                            synopsis={synopsis}
                          />
                        )}

              </Fragment>
            );
          })}
        </div>
        <div className={styles.horizontalGrid} style={{ display: filterButtonActive === 2 ? 'grid' : 'none' }}>
          { animeData && animeData.map(({ node }, i) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const {
              title, id, main_picture, mean, status, genres, rank,
              num_episodes, start_season, media_type, studios, num_list_users,
            } = node;

            return (
              <Fragment key={id}>
                {(title.toLowerCase().includes(filterText.toLowerCase()))
                        && (
                          <HorizontalAnimeCard
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
                            num_list_users={num_list_users}
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

export default AnimeCardGrid;
