import { mapTMDBToContentItem } from "../utils/tmdbMapper";

describe("tmdbMapper - mapTMDBToContentItem", () => {
  it("correctly maps a Streaming Availability API show object to ContentItem", () => {
    const rawShow = {
      showType: "movie",
      id: "82",
      title: "The Godfather",
      overview: "Godfather description...",
      releaseYear: 1972,
      genres: [
        { id: "crime", name: "Crime" },
        { id: "drama", name: "Drama" },
      ],
      rating: 87,
      runtime: 175,
      imageSet: {
        verticalPoster: {
          w480: "https://example.com/poster-w480.jpg",
        },
        horizontalBackdrop: {
          w1080: "https://example.com/backdrop-w1080.jpg",
        },
      },
      originalLanguage: "en",
    };

    const mapped = mapTMDBToContentItem(rawShow);

    expect(mapped).toEqual({
      id: "movie-82",
      title: "The Godfather",
      posterUrl: "https://example.com/poster-w480.jpg",
      bannerUrl: "https://example.com/backdrop-w1080.jpg",
      description: "Godfather description...",
      genres: ["Crime", "Drama"],
      tags: ["Crime", "Drama"],
      rating: 8.7,
      releaseYear: 1972,
      durationMins: 175,
      type: "Movie",
      language: "EN",
      isNew: false,
      isFeatured: true,
      playLink: undefined,
    });
  });

  it("handles empty / missing properties with proper fallbacks", () => {
    const rawShow = {
      id: "999",
    };

    const mapped = mapTMDBToContentItem(rawShow, "Series");

    expect(mapped.id).toBe("tv-999");
    expect(mapped.title).toBe("Untitled");
    expect(mapped.posterUrl).toBe("");
    expect(mapped.bannerUrl).toBeUndefined();
    expect(mapped.description).toBe("No description available.");
    expect(mapped.genres).toEqual([]);
    expect(mapped.tags).toEqual(["Featured"]);
    expect(mapped.rating).toBe(0.0);
    expect(mapped.releaseYear).toBe(2024);
    expect(mapped.durationMins).toBe(45); // Fallback for series is 45 mins
    expect(mapped.type).toBe("Series");
    expect(mapped.language).toBe("EN");
    expect(mapped.isNew).toBe(true);
    expect(mapped.isFeatured).toBe(false);
    expect(mapped.playLink).toBeUndefined();
  });
});
