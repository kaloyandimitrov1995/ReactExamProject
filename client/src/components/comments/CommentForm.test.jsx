import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from "./CommentForm";

test("CommentForm submits text", () => {
  const handler = jest.fn();

  render(<CommentForm onSubmit={handler} />);

  const input = screen.getByPlaceholderText(/write a comment/i);
  fireEvent.change(input, { target: { value: "Hello world" } });

  const form = screen.getByRole("button").closest("form");
  fireEvent.submit(form);

  expect(handler).toHaveBeenCalled();
});

