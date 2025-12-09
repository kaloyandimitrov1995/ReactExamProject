import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";

jest.mock("../../utils/topicService.js", () => ({
  getAll: () => Promise.resolve([])
}));

jest.mock("../../contexts/TopicUpdateContext.jsx", () => ({
  useTopicUpdate: () => ({ topicsChanged: 0 })
}));

test("Home page renders title", async () => {
  render(<Home />);

  await waitFor(() => {
    expect(screen.getByText("Latest Topics")).toBeInTheDocument();
  });
});