import React from "react";
import { render } from "@testing-library/react-native";
import ContentCard from "../components/card/ContentCard";
import { ContentItem } from "../models/content.types";

const mockItem: ContentItem = {
  id: "movie-123",
  title: "Test Movie",
  posterUrl: "https://picsum.photos/200/300",
  description: "Test Description",
  genres: ["Action"],
  tags: ["Action"],
  rating: 8.5,
  releaseYear: 2024,
  durationMins: 120,
  type: "Movie",
  language: "EN",
};

describe("ContentCard", () => {
  it("renders the title of the passed item", () => {
    const { getByText } = render(<ContentCard item={mockItem} onPress={() => {}} />);
    expect(getByText(mockItem.title)).toBeTruthy();
  });
});
