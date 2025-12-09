import { render, screen } from "@testing-library/react";
import TopicCard from "./TopicCard";
import { BrowserRouter } from "react-router-dom";

test("TopicCard displays title and category", () => {
  const topic = {
    _id: "1",
    title: "My Test Topic",
    content: "This is some test content",
    category: "news",
    _ownerId: "123",
    createdAt: new Date().toISOString(),
    authorName: "John"
  };

  render(
    <BrowserRouter>
      <TopicCard topic={topic} />
    </BrowserRouter>
  );

  expect(screen.getByText("My Test Topic")).toBeInTheDocument();
  expect(screen.getByText("NEWS")).toBeInTheDocument();
  expect(screen.getByText("Open Topic")).toBeInTheDocument();
});
