declare module 'freekeys' {
  interface FreeKeysResult {
    tmdb_key: string;
    imdb_key: string;
  }
  function freekeys(): Promise<FreeKeysResult>;
  export default freekeys;
}
