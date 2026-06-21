export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const POSTER_SIZES = {
  sm: `${TMDB_IMAGE_BASE_URL}/w185`,
  md: `${TMDB_IMAGE_BASE_URL}/w342`,
  lg: `${TMDB_IMAGE_BASE_URL}/w500`,
  original: `${TMDB_IMAGE_BASE_URL}/original`,
};

export const BACKDROP_SIZES = {
  sm: `${TMDB_IMAGE_BASE_URL}/w300`,
  md: `${TMDB_IMAGE_BASE_URL}/w780`,
  lg: `${TMDB_IMAGE_BASE_URL}/w1280`,
  original: `${TMDB_IMAGE_BASE_URL}/original`,
};

export const APP_PAGE_SIZE = 12;
export const TMDB_PAGE_SIZE = 20;
