import React from 'react';
import { useRouter } from 'next/router';

const Anime = ({ data }: any) => {
  console.log(data);
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      anime
      {' '}
      {id}
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
