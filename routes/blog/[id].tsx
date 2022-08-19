/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import type { Post } from "../../utils/posts.ts";

const post: Post = {
  id: "hello",
  title: "Hello World",
  publishAt: new Date(),
  snippet: "This is the snippet",
  content: "This is my first post.",
};

export default function BlogPostPage() {
  return (
    <div class={tw`px-4 mx-auto max-w-screen-md mt-6`}>
      <p class={tw`text-gray-600`}>{post.publishAt.toLocaleDateString()}</p>
      <h1 class={tw`text-5xl mt-2 font-bold`}>{post.title}</h1>
      <div class={tw`mt-12`}>
        {post.content}
      </div>
    </div>
  );
}
