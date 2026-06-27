import { create } from "zustand";
import { UserProfile, ContentItem } from "../models/content.types";

type UserStore = {
  user: UserProfile;
  watchlist: ContentItem[];
  downloads: ContentItem[];
  addToWatchlist: (item: ContentItem) => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  addToDownloads: (item: ContentItem) => void;
  removeFromDownloads: (id: string) => void;
  isDownloaded: (id: string) => boolean;
};

const defaultUser: UserProfile = {
  id: "u1",
  name: "Saurav Gupta",
  email: "gsaurav641@gmail.com",
  avatarUrl: "https://picsum.photos/seed/saurav-gupta/200/200",
  plan: "Premium",
  watchlistCount: 0,
};

const useUserStore = create<UserStore>((set, get) => ({
  user: defaultUser,
  watchlist: [],
  downloads: [],
  addToWatchlist: (item) => {
    if (get().watchlist.some((i) => i.id === item.id)) return;
    set({ watchlist: [...get().watchlist, item] });
  },
  removeFromWatchlist: (id) => {
    set({ watchlist: get().watchlist.filter((item) => item.id !== id) });
  },
  isInWatchlist: (id) => get().watchlist.some((item) => item.id === id),
  addToDownloads: (item) => {
    if (get().downloads.some((i) => i.id === item.id)) return;
    set({ downloads: [...get().downloads, item] });
  },
  removeFromDownloads: (id) => {
    set({ downloads: get().downloads.filter((item) => item.id !== id) });
  },
  isDownloaded: (id) => get().downloads.some((item) => item.id === id),
}));

export default useUserStore;
