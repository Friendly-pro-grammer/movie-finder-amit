import { Movie, MovieDetails, TMDBResponse, Genre } from "@/types";
import { TMDB_BASE_URL, APP_PAGE_SIZE, TMDB_PAGE_SIZE } from "@/constants";

let cachedApiKey: string | null = null;

async function getApiKey(): Promise<string> {
  const envKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (envKey) return envKey;

  if (cachedApiKey) return cachedApiKey;

  try {
    const freekeysModule = await import("freekeys");
    const freekeysFn = freekeysModule.default;
    const keys = await freekeysFn();
    if (keys && keys.tmdb_key) {
      cachedApiKey = keys.tmdb_key;
      return keys.tmdb_key;
    }
  } catch (error) {
    console.error("Failed to retrieve TMDB API key dynamically via freekeys:", error);
  }

  throw new Error("TMDB API key not configured and dynamic fetch failed.");
}

// Helper to make API calls to TMDB
async function fetchFromTMDB<T>(url: string, apiKey: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: apiKey,
    ...params,
  });

  const res = await fetch(`${TMDB_BASE_URL}${url}?${queryParams.toString()}`, {
    next: { revalidate: 3600 }, // Cache response for 1 hour
  });

  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// -------------------------------------------------------------
// MOCK DATA LAYER (Fallback when TMDB_API_KEY is not set)
// -------------------------------------------------------------
const MOCK_GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    poster_path: null,
    backdrop_path: null,
    release_date: "2014-11-07",
    vote_average: 8.6,
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    genre_ids: [878, 18, 12],
  },
  {
    id: 2,
    title: "Inception",
    poster_path: null,
    backdrop_path: null,
    release_date: "2010-07-16",
    vote_average: 8.8,
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    genre_ids: [878, 28, 12],
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: null,
    backdrop_path: null,
    release_date: "2008-07-18",
    vote_average: 9.0,
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    genre_ids: [28, 80, 18],
  },
  {
    id: 4,
    title: "Spirited Away",
    poster_path: null,
    backdrop_path: null,
    release_date: "2001-07-20",
    vote_average: 8.5,
    overview: "A young girl, Chihiro, becomes trapped in a mysterious and strange world of spirits. When her parents undergo a mysterious transformation, she must summon the courage to live and work amongst spirits.",
    genre_ids: [16, 14, 10751],
  },
  {
    id: 5,
    title: "Pulp Fiction",
    poster_path: null,
    backdrop_path: null,
    release_date: "1994-10-14",
    vote_average: 8.9,
    overview: "A burger-loving hitman, his philosophical partner, a drug-addled gangster's moll, and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories.",
    genre_ids: [80, 53],
  },
  {
    id: 6,
    title: "The Matrix",
    poster_path: null,
    backdrop_path: null,
    release_date: "1999-03-31",
    vote_average: 8.7,
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    genre_ids: [878, 28],
  },
  {
    id: 7,
    title: "Spider-Man: Into the Spider-Verse",
    poster_path: null,
    backdrop_path: null,
    release_date: "2018-12-14",
    vote_average: 8.4,
    overview: "Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    genre_ids: [16, 28, 12, 878],
  },
  {
    id: 8,
    title: "Parasite",
    poster_path: null,
    backdrop_path: null,
    release_date: "2019-05-30",
    vote_average: 8.5,
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    genre_ids: [35, 53, 18],
  },
  {
    id: 9,
    title: "Whiplash",
    poster_path: null,
    backdrop_path: null,
    release_date: "2014-10-10",
    vote_average: 8.4,
    overview: "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.",
    genre_ids: [18, 10402],
  },
  {
    id: 10,
    title: "The Shawshank Redemption",
    poster_path: null,
    backdrop_path: null,
    release_date: "1994-09-23",
    vote_average: 9.3,
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
    genre_ids: [18, 80],
  },
  {
    id: 11,
    title: "Dune: Part Two",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-02-27",
    vote_average: 8.3,
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    genre_ids: [878, 12],
  },
  {
    id: 12,
    title: "Avatar: The Way of Water",
    poster_path: null,
    backdrop_path: null,
    release_date: "2022-12-14",
    vote_average: 7.6,
    overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    genre_ids: [878, 28, 12],
  },
  {
    id: 13,
    title: "Gladiator",
    poster_path: null,
    backdrop_path: null,
    release_date: "2000-05-01",
    vote_average: 8.2,
    overview: "In the year 180, the death of Emperor Marcus Aurelius throws the Roman Empire into chaos. Maximus is one of the Roman army's most capable and trusted generals and a key advisor to the Emperor. As Marcus' devious son Commodus ascends to the throne, Maximus is set to be executed.",
    genre_ids: [28, 12, 18],
  },
  {
    id: 14,
    title: "Forrest Gump",
    poster_path: null,
    backdrop_path: null,
    release_date: "1994-07-06",
    vote_average: 8.8,
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. Yet, despite all the things he's attained, his one true love eludes him.",
    genre_ids: [35, 18, 10749],
  },
  {
    id: 15,
    title: "Your Name.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2016-08-26",
    vote_average: 8.5,
    overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki's body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
    genre_ids: [16, 14, 18, 10749],
  },
  {
    id: 16,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    poster_path: null,
    backdrop_path: null,
    release_date: "2001-12-18",
    vote_average: 8.4,
    overview: "Young hobbit Frodo Baggins, after inheriting a mysterious ring, must leave his home and travel to the fires of Mount Doom to destroy it, joined by a fellowship of elves, dwarves, men, and a wizard.",
    genre_ids: [12, 14, 28],
  },
  {
    id: 17,
    title: "Goodfellas",
    poster_path: null,
    backdrop_path: null,
    release_date: "1990-09-12",
    vote_average: 8.5,
    overview: "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighborhood gangsters at an early age and climbs the ranks of a Mafia syndicate.",
    genre_ids: [18, 80],
  },
  {
    id: 18,
    title: "Alien",
    poster_path: null,
    backdrop_path: null,
    release_date: "1979-05-25",
    vote_average: 8.1,
    overview: "During its return voyage, the commercial spaceship Nostromo receives a distress signal from an unexplored planet. The crew finds a deadly lifeform that breeds inside human hosts.",
    genre_ids: [27, 878],
  },
  {
    id: 19,
    title: "The Silence of the Lambs",
    poster_path: null,
    backdrop_path: null,
    release_date: "1991-01-30",
    vote_average: 8.3,
    overview: "FBI trainee Clarice Starling seeks the help of incarcerated psychopath Dr. Hannibal Lecter to catch another serial killer who skins his victims.",
    genre_ids: [80, 53, 27],
  },
  {
    id: 20,
    title: "Inglourious Basterds",
    poster_path: null,
    backdrop_path: null,
    release_date: "2009-08-19",
    vote_average: 8.2,
    overview: "In Nazi-occupied France during World War II, a group of Jewish-American soldiers known as \"The Basterds\" are chosen specifically to spread fear throughout the Third Reich by scalping and brutally killing Nazis.",
    genre_ids: [28, 18, 10752],
  },
  {
    id: 21,
    title: "Knives Out",
    poster_path: null,
    backdrop_path: null,
    release_date: "2019-11-27",
    vote_average: 7.9,
    overview: "When renowned crime novelist Harlan Thrombey is found dead at his estate just after his 85th birthday, the inquisitive and debonair Detective Benoit Blanc is mysteriously enlisted to investigate.",
    genre_ids: [35, 9648, 80],
  },
  {
    id: 22,
    title: "Arrival",
    poster_path: null,
    backdrop_path: null,
    release_date: "2016-11-10",
    vote_average: 7.6,
    overview: "Taking place after mysterious spacecraft touch down across the globe, an elite team is put together to investigate, including linguistics professor Louise Banks, who is recruited by the military to determine whether they come in peace or are a threat.",
    genre_ids: [878, 18, 9648],
  },
  {
    id: 23,
    title: "Django Unchained",
    poster_path: null,
    backdrop_path: null,
    release_date: "2012-12-25",
    vote_average: 8.2,
    overview: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    genre_ids: [18, 37],
  },
  {
    id: 24,
    title: "The Truman Show",
    poster_path: null,
    backdrop_path: null,
    release_date: "1998-06-04",
    vote_average: 8.1,
    overview: "Truman Burbank is the unwitting star of The Truman Show, a 24-hour-a-day reality television broadcast that chronicles every aspect of his life since birth. He discovers the truth and tries to escape.",
    genre_ids: [35, 18],
  },
];

// Helper to paginate a list of movies into exactly APP_PAGE_SIZE (12) items per page
function paginateList(list: Movie[], page: number) {
  const totalResults = list.length;
  const totalPages = Math.ceil(totalResults / APP_PAGE_SIZE);

  const startIndex = (page - 1) * APP_PAGE_SIZE;
  const endIndex = page * APP_PAGE_SIZE;
  const slicedResults = list.slice(startIndex, endIndex);

  return {
    results: slicedResults,
    totalPages: Math.max(1, totalPages),
    totalResults,
  };
}

// -------------------------------------------------------------
// PUBLIC EXPORTS
// -------------------------------------------------------------

/**
 * Fetch popular / discovery movies
 */
export async function getPopularMovies(page: number = 1): Promise<{
  results: Movie[];
  totalPages: number;
  totalResults: number;
}> {
  let apiKey: string;
  try {
    apiKey = await getApiKey();
  } catch {
    console.warn("TMDB API key not set. Using local mock database fallback.");
    return paginateList(MOCK_MOVIES, page);
  }

  try {
    const startIndex = (page - 1) * APP_PAGE_SIZE;
    const endIndex = page * APP_PAGE_SIZE;

    const tmdbStartPage = Math.floor(startIndex / TMDB_PAGE_SIZE) + 1;
    const tmdbEndPage = Math.floor((endIndex - 1) / TMDB_PAGE_SIZE) + 1;

    // Fetch the required page(s) from TMDB
    const promises: Promise<TMDBResponse<Movie>>[] = [];
    promises.push(fetchFromTMDB<TMDBResponse<Movie>>("/movie/popular", apiKey, { page: tmdbStartPage.toString() }));

    if (tmdbEndPage !== tmdbStartPage) {
      promises.push(fetchFromTMDB<TMDBResponse<Movie>>("/movie/popular", apiKey, { page: tmdbEndPage.toString() }));
    }

    const responses = await Promise.all(promises);
    
    // Merge the results of the fetched pages
    let mergedResults: Movie[] = responses[0].results || [];
    if (responses[1]) {
      mergedResults = mergedResults.concat(responses[1].results || []);
    }

    // Slice out the exact 12-item chunk
    const localStart = startIndex - (tmdbStartPage - 1) * TMDB_PAGE_SIZE;
    const localEnd = endIndex - (tmdbStartPage - 1) * TMDB_PAGE_SIZE;
    const results = mergedResults.slice(localStart, localEnd);

    // Calculate total pages/results based on 12-item app page size
    const apiTotalResults = responses[0].total_results || 0;
    const totalResults = Math.min(apiTotalResults, 10000); // TMDB limits to first 10,000 results
    const totalPages = Math.ceil(totalResults / APP_PAGE_SIZE);

    return {
      results,
      totalPages,
      totalResults,
    };
  } catch (error) {
    console.error("Failed to fetch popular movies from TMDB:", error);
    throw error;
  }
}

/**
 * Search movies based on query string
 */
export async function searchMovies(
  query: string,
  page: number = 1
): Promise<{
  results: Movie[];
  totalPages: number;
  totalResults: number;
}> {
  if (!query.trim()) {
    return getPopularMovies(page);
  }

  let apiKey: string;
  try {
    apiKey = await getApiKey();
  } catch {
    console.warn("TMDB API key not set. Using local mock database fallback.");
    const filtered = MOCK_MOVIES.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.overview.toLowerCase().includes(query.toLowerCase())
    );
    return paginateList(filtered, page);
  }

  try {
    const startIndex = (page - 1) * APP_PAGE_SIZE;
    const endIndex = page * APP_PAGE_SIZE;

    const tmdbStartPage = Math.floor(startIndex / TMDB_PAGE_SIZE) + 1;
    const tmdbEndPage = Math.floor((endIndex - 1) / TMDB_PAGE_SIZE) + 1;

    const promises: Promise<TMDBResponse<Movie>>[] = [];
    promises.push(
      fetchFromTMDB<TMDBResponse<Movie>>("/search/movie", apiKey, {
        query,
        page: tmdbStartPage.toString(),
      })
    );

    if (tmdbEndPage !== tmdbStartPage) {
      promises.push(
        fetchFromTMDB<TMDBResponse<Movie>>("/search/movie", apiKey, {
          query,
          page: tmdbEndPage.toString(),
        })
      );
    }

    const responses = await Promise.all(promises);

    let mergedResults: Movie[] = responses[0].results || [];
    if (responses[1]) {
      mergedResults = mergedResults.concat(responses[1].results || []);
    }

    const localStart = startIndex - (tmdbStartPage - 1) * TMDB_PAGE_SIZE;
    const localEnd = endIndex - (tmdbStartPage - 1) * TMDB_PAGE_SIZE;
    const results = mergedResults.slice(localStart, localEnd);

    const apiTotalResults = responses[0].total_results || 0;
    const totalPages = Math.ceil(apiTotalResults / APP_PAGE_SIZE);

    return {
      results,
      totalPages,
      totalResults: apiTotalResults,
    };
  } catch (error) {
    console.error(`Failed to search movies for query: ${query}`, error);
    throw error;
  }
}

/**
 * Fetch detailed movie information including genres
 */
export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const numericId = parseInt(id, 10);

  let apiKey: string;
  try {
    apiKey = await getApiKey();
  } catch {
    console.warn("TMDB API key not set. Using local mock database fallback.");
    const mockMovie = MOCK_MOVIES.find((m) => m.id === numericId);
    if (!mockMovie) {
      throw new Error(`Movie not found in mock data: ${id}`);
    }

    const movieGenres = mockMovie.genre_ids.map((gid) => {
      const g = MOCK_GENRES.find((x) => x.id === gid);
      return g || { id: gid, name: "Other" };
    });

    return {
      id: mockMovie.id,
      title: mockMovie.title,
      poster_path: mockMovie.poster_path,
      backdrop_path: mockMovie.backdrop_path,
      release_date: mockMovie.release_date,
      vote_average: mockMovie.vote_average,
      overview: mockMovie.overview,
      genres: movieGenres,
      runtime: 148,
      tagline: "A beautiful cinematic experience.",
      homepage: "https://www.themoviedb.org",
      status: "Released",
    };
  }

  try {
    return await fetchFromTMDB<MovieDetails>(`/movie/${id}`, apiKey);
  } catch (error) {
    console.error(`Failed to fetch movie details for ID: ${id}`, error);
    throw error;
  }
}
