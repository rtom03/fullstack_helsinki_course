import { test, expect, beforeEach, describe } from "@playwright/test";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:8000/api/test/reset");
    await request.post("http://localhost:8000/api/register", {
      data: {
        name: "Jane Doe",
        username: "jane",
        password: "12345678",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Username")).toBeVisible();
    await expect(page.getByText("Password")).toBeVisible();
  });
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      // ...
      //   await page.getByLabel("Username").fill("jd");
      //   await page.getByLabel("Password").fill("12345678");
      const input = await page.getByRole("textbox").all();
      await input[0].fill("jane");
      await input[1].fill("12345678");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Jane Doe logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      const input = await page.getByRole("textbox").all();
      await input[0].fill("jane");
      await input[1].fill("123456");
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText("Request failed with status code 400")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      // ...
      const input = await page.getByRole("textbox").all();
      await input[0].fill("jane");
      await input[1].fill("12345678");
      await page.getByRole("button", { name: "login" }).click();
    });
    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create Blog" }).click();
      // ...
      await page.getByLabel("title").fill("Meta");
      await page.getByLabel("author").fill("Facebook");
      await page.getByLabel("url").fill("Facebook");
      await page.getByRole("button", { name: "submit" }).click();
      // await input[2].fill("Facebook");
      await expect(page.getByText("Meta")).toBeVisible();
    });
  });

  describe("Can be liked && can be delete", () => {
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        beforeEach(async ({ page }) => {
          // ...
          const input = await page.getByRole("textbox").all();
          await input[0].fill("jane");
          await input[1].fill("12345678");
          await page.getByRole("button", { name: "login" }).click();

          await page.getByRole("button", { name: "Create Blog" }).click();
          // ...
          await page.getByLabel("title").fill("Meta");
          await page.getByLabel("author").fill("Facebook");
          await page.getByLabel("url").fill("Facebook");
          await page.getByRole("button", { name: "submit" }).click();
          // await input[2].fill("Facebook");
          await expect(page.getByText("Meta")).toBeVisible();
        });
        test("blog can be liked", async ({ page }) => {
          await page.getByRole("button", { name: "view" }).click();
          await page.getByRole("button", { name: "like" }).click();
          await expect(page.getByText("1")).toBeVisible();
        });
      }
      test("blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "remove" }).click();

        page.once("dialog", async (dialog) => {
          expect(dialog.type()).toBe("confirm");
          expect(dialog.message()).toBe(
            "are you sure you want to delete this item?"
          );
          await dialog.accept();
        });
        await page.getByRole("button", { name: "remove" }).click();
        await expect(page.getByText("Meta")).toBeHidden();
      });
    }
  });

  describe("Del is delegated to ownership", async () => {
    beforeEach(async ({ request }) => {
      await request.post("http://localhost:8000/api/register", {
        data: {
          name: "Jack Mill",
          username: "jack",
          password: "12345678",
        },
      });
    });
    test.only("Check remove invisible", async ({ page }) => {
      console.log(process.env.JWT_SECRET);

      const input = await page.getByRole("textbox").all();
      await input[0].fill("jack");
      await input[1].fill("12345678");
      const loginBtn = page.getByRole("button", { name: "login" });
      await loginBtn.click();
      await expect(page.getByText("blogs")).toBeVisible();

      // await page.pause();

      // await page.getByRole("button", { name: "view" }).click();
      // await expect(page.getByRole("button", { name: "remove" })).toBeHidden();
    });
  });
});
