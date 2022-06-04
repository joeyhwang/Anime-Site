import { AnimeRes } from 'components/Interfaces';
import AnimeCardGrid from 'components/AnimeCardGrid';

interface CategoryProps {
  data: { data: AnimeRes[], paging: { next: string, previous?: string } }
}

const Category = ({ data }: CategoryProps) => {

  return (
    <>
      <AnimeCardGrid data={data} />
    </>
  );
};

export async function getServerSideProps(context: { query: { category: string; }; }) {
  const { category } = context.query;
  let data = {};

  if (process.env.NEXT_PUBLIC_CLIENT_ID) {
    const res = await fetch(
      `https://api.myanimelist.net/v2/anime/ranking?ranking_type=${category}&limit=100&fields=id,title,main_picture,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,media_type,status,genres,num_episodes,start_season,average_episode_duration,studios`,
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

export default Category;
