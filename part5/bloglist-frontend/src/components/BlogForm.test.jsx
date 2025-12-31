import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("check blogForm receive the right event handler message", async () => {
  const newBlog = {
    author: "Garland",
    title: "Web Development",
    url: "http://localhost/",
    likes: 0,
  };
  const mock = vi.fn();
  const mock1 = vi.fn();
  render(
    <BlogForm
      title={newBlog.url}
      author={newBlog.author}
      url={newBlog.url}
      handleChange={mock}
      handleCreatePost={mock1}
    />
  );
  const user = userEvent.setup();
  const input = screen.getAllByRole("textbox");
  for (let i = 0; i < input.length; i++) {
    await user.type(input[i], "Coder");
  }
  const userX = userEvent.setup();
  const submitButton = screen.getByText("submit");
  await userX.click(submitButton);
  expect(mock1.mock.calls).toHaveLength(1);
});
