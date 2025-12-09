import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("Footer displays current year", () => {
  const year = new Date().getFullYear().toString();
  render(<Footer />);

  expect(screen.getByText(year, { exact: false })).toBeInTheDocument();
});
