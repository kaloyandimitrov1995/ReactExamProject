import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TopicDetails from "./TopicDetails";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../utils/topicService.js", () => ({
  getById: () => Promise.resolve({
    _id: "1",
    title: "Test Topic",
    content: "Lorem ipsum",
    _ownerId: "u1",
    authorName: "Tester"
  }),
}));

jest.mock("../../utils/commentService.js", () => ({
  getByTopic: () => Promise.resolve([]),
  create: () => Promise.resolve({ text: "New comment" })
}));

jest.mock("../../utils/likeService.js", () => ({
  getLikesByTopic: () => Promise.resolve([]),
  userLiked: () => Promise.resolve(null),
  like: () => Promise.resolve({ _id: "like123", topicId: "1" }),
  unlike: () => Promise.resolve({})
}));

jest.mock("../../contexts/LikeContext.jsx", () => ({
  useLikes: () => ({ notifyLikesChanged: jest.fn() })
}));

jest.mock("../../contexts/TopicUpdateContext.jsx", () => ({
  useTopicUpdate: () => ({ notifyTopicsChanged: jest.fn() })
}));

jest.mock("../../contexts/AuthContext.jsx", () => ({
  useAuth: () => ({ user: { _id: "u1", username: "tester" } })
}));

test("TopicDetails loads and displays topic title", async () => {
  render(
    <BrowserRouter>
      <TopicDetails />
    </BrowserRouter>
  );

  await waitFor(() =>
    expect(screen.getByText("Test Topic")).toBeInTheDocument()
  );
});

test("TopicDetails allows like button click", async () => {
  render(
    <BrowserRouter>
      <TopicDetails />
    </BrowserRouter>
  );

  await waitFor(() =>
    expect(screen.getByText("Test Topic")).toBeInTheDocument()
  );

  const likeBtn = screen.getByText(/Like/i);
  fireEvent.click(likeBtn);

  expect(likeBtn).toBeInTheDocument();
});
