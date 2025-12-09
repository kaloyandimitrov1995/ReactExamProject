import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

jest.mock("./ProfileContext.jsx", () => ({
  useProfile: () => ({
    setUserId: jest.fn(),
    refreshProfile: jest.fn(),
    clearProfile: jest.fn()
  })
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        _id: "123",
        email: "test@test.com",
        username: "tester",
        accessToken: "abc"
      })
  })
);

test("AuthContext login stores user", async () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  const { result } = renderHook(() => useAuth(), { wrapper });

  await act(async () => {
    await result.current.login("test@test.com", "123456");
  });

  expect(result.current.user.email).toBe("test@test.com");
});
