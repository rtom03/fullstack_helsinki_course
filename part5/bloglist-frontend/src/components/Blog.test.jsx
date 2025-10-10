import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders blog details", () => {
  const newBlog = {
    author: "Garland",
    title: "Web Development",
  };
  render(<Blog blog={newBlog} />);

  const element = screen.getAllByText("Garland", "Web Development");
  expect(element).toBeDefined();
});

test(" checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const newBlog = {
    author: "Garland",
    title: "Web Development",
    url: "http://localhost/",
    likes: 0,
  };
  const mock = vi.fn();
  const user = userEvent.setup();

  render(<Blog blog={newBlog} handleView={mock} />);
  const button = screen.getByText("hide");
  await user.click(button);
  const element = screen.getByText("http://localhost/");
  expect(mock.mock.calls).toHaveLength(1);
  expect(element).toBeVisible();
});
