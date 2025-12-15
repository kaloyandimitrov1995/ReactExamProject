import { render, screen } from "@testing-library/react";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../contexts/AuthContext.jsx", () => ({
  useAuth: () => ({ isAuthenticated: true })
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>PRIVATE-CONTENT</div>,
}));

test("PrivateRoute shows children when authenticated", () => {
  render(
    <BrowserRouter>
      <PrivateRoute />
    </BrowserRouter>
  );

  expect(screen.getByText("PRIVATE-CONTENT")).toBeInTheDocument();
});
