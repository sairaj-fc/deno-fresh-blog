/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { listPosts, Post } from "../utils/posts.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<Post[]> = {
  async GET(req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;

  return (
    <div class={tw`px-4 mx-auto max-w-screen-md mt-6`}>
      <h1 class={tw`text-5xl mt-12 font-bold`}>Sairaj's Blog</h1>
      <ul class={tw`mt-8`}>
        {posts.map((post) => (
          <PostEntry key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

function PostEntry({ post }: { post: Post }) {
  const dateFmt = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "short",
  });
  return (
    <li class={tw`border-t`}>
      <a href={`/blog/${post.id}`} class={tw`py-4 flex gap-4 group`}>
        <div>{dateFmt.format(post.publishAt)}</div>
        <div>
          <h2 class={tw`font-bold text-xl group-hover:underline`}>
            {post.title}
          </h2>
          <p class={tw`text-gray-600`}>{post.snippet}</p>
        </div>
      </a>
    </li>
  );
}
