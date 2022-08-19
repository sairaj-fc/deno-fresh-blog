import { loadPost } from "./posts.ts";
import {} from "$std/testing/asserts.ts";

Deno.test("load post", async () => {
  const post = await loadPost("hello");
});
