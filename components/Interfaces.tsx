export interface Anime {
  id: string, title: string, main_picture: { large: string, medium: string }
  mean: number, status: string, genres: Genres[], rank: number,
  num_episodes: number, start_season: { year: number, season: string }, media_type: string,
  studios: { id: number, name: string }[], num_list_users: number, num_scoring_users: number,
  popularity: number, source: string, start_date: string, end_date: string,
  average_episode_duration: number, broadcast: Broadcast, rating: string,
  recommendations: Recommendation[], statistics: { num_list_users: number, status: Status },
  synopsis: string, related_anime: RelatedAnime[],
}

export interface AnimeCard {
  id: string, title: string, main_picture: { large: string, medium: string }
  mean: number, status: string, genres: Genres[], rank: number,
  num_episodes: number, start_season: { year: number, season: string }, media_type: string,
  studios: { id: number, name: string }[],
}

export interface AnimeRes {
  node: { id: string, title: string, main_picture: { large: string, medium: string }
    mean: number, status: string, genres: Genres[], rank: number,
    num_episodes: number, start_season: { year: number, season: string }, media_type: string,
    studios: { id: number, name: string }[], num_recommendations: number,
    relation_type: string, relation_type_formatted: string }
}
interface Broadcast {
  day_of_the_week: string,
  start_time: string,
}

interface Genres {
  id: number, name: string
}

interface Recommendation {
  node: Anime,
  num_recommendations: number,
}

interface RelatedAnime {
  relation_type_formatted: string,
  node: Anime,
}

interface Status {
  completed: string,
  dropped: string,
  on_hold: string,
  plan_to_watch: string,
  watching: string,
}
