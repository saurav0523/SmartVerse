const API_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY;
const API_HOST = process.env.EXPO_PUBLIC_RAPIDAPI_HOST;
const BASE_URL = process.env.EXPO_PUBLIC_RAPIDAPI_URL;

export const tmdbRequest = async <T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> => {
  const queryParams = new URLSearchParams(
    Object.entries(params).map(([key, val]) => [key, String(val)])
  );

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": API_HOST || "",
        "x-rapidapi-key": API_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error requesting endpoint ${endpoint}:`, error);
    throw error;
  }
};

export const initGenres = async () => {};
export const ensureGenresInitialized = async () => {};
