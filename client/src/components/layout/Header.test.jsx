import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";


jest.mock("../../contexts/AuthContext.jsx", () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    logout: jest.fn()
  })
}));

test("Header renders site logo", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(screen.getByText("Freelance News Board")).toBeInTheDocument();
});
