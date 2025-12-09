import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

test("Contact page renders email", () => {
  render(<Contact />);
  expect(screen.getByText(/luckykaloyan@gmail.com/i)).toBeInTheDocument();
});
