export interface Anime {
  id: string, title: string, main_picture: { large: string, medium: string }
  mean: number, status: string, genres: { id: number, name: string }[], rank: number,
  num_episodes: number, start_season: { year: number, season: string }, media_type: string,
  studios: { id: number, name: string }[],
}

export interface AnimeRes {
  node: { id: string, title: string, main_picture: { large: string, medium: string }
    mean: number, status: string, genres: { id: number, name: string }[], rank: number,
    num_episodes: number, start_season: { year: number, season: string }, media_type: string,
    studios: { id: number, name: string }[], }
}
