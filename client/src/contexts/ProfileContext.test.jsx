import { render, screen } from "@testing-library/react";
import { ProfileProvider } from "./ProfileContext";

test("ProfileProvider renders children", () => {
  render(
    <ProfileProvider>
      <div data-testid="child">Hello</div>
    </ProfileProvider>
  );

  expect(screen.getByTestId("child")).toBeInTheDocument();
});
