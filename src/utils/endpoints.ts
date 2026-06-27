
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const ENDPOINTS = {
  HOME_FEED: "/feed/home",
  CONTENT_DETAIL: (id: string) => `/content/${id}`,
  RECOMMENDED: (id: string) => `/content/${id}/recommended`,
  SEARCH: "/search",
  CATEGORIES: "/categories",
  USER_PROFILE: "/user/me",
};

export default ENDPOINTS;
