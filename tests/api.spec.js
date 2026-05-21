import { test, expect } from "@playwright/test";
import { apiDataPost, apiDataPatch } from "../data/testData.js";

test.describe("API project", () => {
  test("Get post", async ({ request }) => {
    const responce = await request.get(
      "/posts/1",
    );
    expect(responce.status()).toBe(200);
    const body = await responce.json();
    console.log(body);
  });
  test("post post", async ({ request }) => {
    const responce = await request.post(
      "/posts",
      {
        data: apiDataPost
      },
    );

    expect(responce.status()).toBe(201);
    const body = await responce.json();
    console.log(body);
  });
  test("patch post", async ({ request }) => {
   
    const responce = await request.patch(
      "/posts/1",
      {
        data: apiDataPatch
      },
    );
    const body = await responce.json();
    expect(responce.status()).toBe(200);
    expect(body.title).toBe("hello aqa");

    console.log(body);
  });
});
