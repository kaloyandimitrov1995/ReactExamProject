import { render, screen } from "@testing-library/react";
import FAQ from "./FAQ";

test("FAQ renders general questions", () => {
  render(<FAQ />);
  expect(screen.getByText("FAQ")).toBeInTheDocument();
  expect(screen.getByText("What is this site about?")).toBeInTheDocument();
});
