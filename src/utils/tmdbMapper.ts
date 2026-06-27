import { ContentItem } from "../models/content.types";

let genreMap: Record<number, string> = {};

export const setGenreMap = (map: Record<number, string>) => {
  genreMap = map;
};

export const mapTMDBToContentItem = (
  item: any,
  fallbackType?: "Movie" | "Series"
): ContentItem => {
  const isMovie = item.showType === "movie" || fallbackType === "Movie";
  const resolvedType = isMovie ? "Movie" : "Series";
  const idPrefix = isMovie ? "movie" : "tv";

  const posterUrl =
    item.imageSet?.verticalPoster?.w480 ||
    item.imageSet?.verticalPoster?.w360 ||
    item.imageSet?.verticalPoster?.w240 ||
    item.imageSet?.verticalPoster?.w600 ||
    "";

  const bannerUrl =
    item.imageSet?.horizontalBackdrop?.w1080 ||
    item.imageSet?.horizontalBackdrop?.w720 ||
    item.imageSet?.horizontalBackdrop?.w480 ||
    item.imageSet?.horizontalBackdrop?.w1440 ||
    undefined;

  const releaseYear = item.releaseYear || item.firstAirYear || 2024;
  const language = item.originalLanguage ? item.originalLanguage.toUpperCase() : "EN";

  const durationMins = item.runtime || (resolvedType === "Series" ? 45 : 120);

  const genres: string[] = Array.isArray(item.genres) ? item.genres.map((g: any) => g.name) : [];
  const tags = genres.length > 0 ? genres : ["Featured"];

  const normalizedRating = typeof item.rating === "number" ? Number((item.rating / 10).toFixed(1)) : 0.0;

  let playLink: string | undefined = undefined;
  if (item.streamingOptions) {
    const options = item.streamingOptions.in || Object.values(item.streamingOptions)[0];
    if (Array.isArray(options) && options.length > 0) {
      playLink = options[0].link;
    }
  }

  return {
    id: `${idPrefix}-${item.id}`,
    title: item.title || "Untitled",
    posterUrl,
    bannerUrl,
    description: item.overview || "No description available.",
    genres,
    tags,
    rating: normalizedRating,
    releaseYear,
    durationMins,
    type: resolvedType,
    language,
    isNew: releaseYear >= 2024,
    isFeatured: normalizedRating >= 8.0,
    playLink,
  };
};
