import { ImageStyle, StyleProp } from "react-native";

export type ContentItem = {
  id: string;
  title: string;
  posterUrl: string;
  bannerUrl?: string;
  description: string;
  genres: string[];
  tags: string[];
  rating: number; 
  releaseYear: number;
  durationMins: number;
  type: "Movie" | "Series" | "Documentary";
  language: string;
  isNew?: boolean;
  isFeatured?: boolean;
  playLink?: string;
};

export type ContentRow = {
  id: string;
  title: string;
  items: ContentItem[];
};

export type CategoryChip = {
  id: string;
  label: string;
};

export type CardProps = {
  item: ContentItem;
  onPress: (item: ContentItem) => void;
  cardWidth?: number;
  style?: StyleProp<ImageStyle>;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  plan: "Free" | "Premium" | "Premium+";
  watchlistCount: number;
};
