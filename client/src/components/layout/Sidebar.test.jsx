import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../contexts/AuthContext.jsx", () => ({
  useAuth: () => ({ user: { _id: "123" } })
}));

jest.mock("../../contexts/ProfileContext.jsx", () => ({
  useProfile: () => ({
    profile: {
      firstName: "John",
      lastName: "Doe",
      job: "Developer",
      age: 25,
      nationality: "Bulgaria",
      avatarUrl: ""
    }
  })
}));

test("Sidebar renders user info", () => {
  render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );

  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Doe")).toBeInTheDocument();
  expect(screen.getByText("Developer")).toBeInTheDocument();
});
