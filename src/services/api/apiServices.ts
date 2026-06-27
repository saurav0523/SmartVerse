import { tmdbRequest } from "./apiClient";
import { mapTMDBToContentItem } from "../../utils/tmdbMapper";
import { ContentItem } from "../../models/content.types";

const genreNameToId = (name: string): string => {
  const normalized = name.toLowerCase().trim();
  if (normalized === "sci-fi" || normalized === "science fiction") {
    return "science-fiction";
  }
  return normalized.replace(/[^a-z0-9]+/g, "-");
};

export const getHomeFeed = async () => {
  try {
    const [trending, popularMovies, popularTV, topRated] = await Promise.all([
      tmdbRequest<{ shows: any[] }>("/shows/search/filters", {
        country: "in",
        order_by: "popularity_1week",
        order_direction: "desc",
      }),
      tmdbRequest<{ shows: any[] }>("/shows/search/filters", {
        country: "in",
        show_type: "movie",
        order_by: "popularity_1week",
        order_direction: "desc",
      }),
      tmdbRequest<{ shows: any[] }>("/shows/search/filters", {
        country: "in",
        show_type: "series",
        order_by: "popularity_1week",
        order_direction: "desc",
      }),
      tmdbRequest<{ shows: any[] }>("/shows/search/filters", {
        country: "in",
        show_type: "movie",
        order_by: "rating",
        order_direction: "desc",
      }),
    ]);

    const trendingShows = trending.shows || [];
    const popularMovieShows = popularMovies.shows || [];
    const popularTVShows = popularTV.shows || [];
    const topRatedShows = topRated.shows || [];

    const banners = trendingShows
      .slice(0, 5)
      .map((item) => mapTMDBToContentItem(item));

    const rows = [
      {
        id: "trending-today",
        title: "Trending Today",
        items: trendingShows.slice(5, 15).map((item) => mapTMDBToContentItem(item)),
      },
      {
        id: "popular-movies",
        title: "Popular Movies",
        items: popularMovieShows.slice(0, 10).map((item) => mapTMDBToContentItem(item, "Movie")),
      },
      {
        id: "popular-tv",
        title: "Trending Series",
        items: popularTVShows.slice(0, 10).map((item) => mapTMDBToContentItem(item, "Series")),
      },
      {
        id: "top-rated",
        title: "Top Rated Movies",
        items: topRatedShows.slice(0, 10).map((item) => mapTMDBToContentItem(item, "Movie")),
      },
    ];

    return { banners, rows };
  } catch (error) {
    console.error("getHomeFeed error:", error);
    throw error;
  }
};

export const getContentById = async (id: string) => {
  try {
    const showId = id.includes("-") ? id.substring(id.indexOf("-") + 1) : id;
    const data = await tmdbRequest<any>(`/shows/${showId}`, { country: "in" });
    return mapTMDBToContentItem(data);
  } catch (error) {
    console.error(`getContentById error for ID ${id}:`, error);
    throw error;
  }
};

export const getRecommended = async (item: ContentItem) => {
  try {
    const genreIds = item.genres.map(genreNameToId).filter(Boolean);
    const typeParam = item.type.toLowerCase() === "series" ? "series" : "movie";
    const params: Record<string, string | number | boolean> = {
      country: "in",
      show_type: typeParam,
      order_by: "popularity_1week",
      order_direction: "desc",
    };

    if (genreIds.length > 0) {
      params.genres = genreIds[0];
    }

    const response = await tmdbRequest<{ shows: any[] }>("/shows/search/filters", params);
    const shows = response.shows || [];

    return shows
      .map((s: any) => mapTMDBToContentItem(s, item.type === "Series" ? "Series" : "Movie"))
      .filter((mappedItem) => mappedItem.id !== item.id)
      .slice(0, 10);
  } catch (error) {
    console.error(`getRecommended error for item ${item.id}:`, error);
    return [];
  }
};

export const getCategories = async () => {
  return [
    { id: "c1", label: "All" },
    { id: "action", label: "Action" },
    { id: "adventure", label: "Adventure" },
    { id: "animation", label: "Animation" },
    { id: "comedy", label: "Comedy" },
    { id: "drama", label: "Drama" },
    { id: "fantasy", label: "Fantasy" },
    { id: "science-fiction", label: "Science Fiction" },
    { id: "thriller", label: "Thriller" },
  ];
};

export const searchCatalogue = async (query: string) => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const response = await tmdbRequest<any[]>("/shows/search/title", {
      title: trimmed,
      country: "in",
    });
    const results = Array.isArray(response) ? response : [];
    return results.map((i) => mapTMDBToContentItem(i));
  } catch (error) {
    console.error("searchCatalogue error:", error);
    return [];
  }
};

let nextScrollCursor: string | undefined = undefined;

export const getMoreForYou = async (page: number, _pageSize = 6) => {
  try {
    const params: Record<string, string | number | boolean> = {
      country: "in",
      order_by: "popularity_1week",
      order_direction: "desc",
    };

    if (page === 0) {
      nextScrollCursor = undefined;
    } else if (nextScrollCursor) {
      params.cursor = nextScrollCursor;
    } else {
      return [];
    }

    const response = await tmdbRequest<{ shows: any[]; hasMore: boolean; nextCursor?: string }>(
      "/shows/search/filters",
      params
    );

    if (response.nextCursor) {
      nextScrollCursor = response.nextCursor;
    } else {
      nextScrollCursor = undefined;
    }

    const shows = response.shows || [];
    return shows.map((i) => mapTMDBToContentItem(i));
  } catch (error) {
    console.error("getMoreForYou error:", error);
    return [];
  }
};
