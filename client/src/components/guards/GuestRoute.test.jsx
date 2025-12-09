import { render, screen } from "@testing-library/react";
import GuestRoute from "./GuestRoute";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../contexts/AuthContext.jsx", () => ({
  useAuth: () => ({ isAuthenticated: false })
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>GUEST-ONLY</div>,
}));

test("GuestRoute allows guest when not authenticated", () => {
  render(
    <BrowserRouter>
      <GuestRoute />
    </BrowserRouter>
  );

  expect(screen.getByText("GUEST-ONLY")).toBeInTheDocument();
});
