/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { loadPost, Post } from "../../utils/posts.ts";
import { render, CSS } from "https://deno.land/x/gfm@0.1.22/mod.ts";

export const handler: Handlers<Post> = {
  GET: async (_req, ctx) => {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return ctx.render(post);
  },
};

export default function BlogPostPage(props: PageProps<Post>) {
  const post = props.data;
  const html = render(post.content);

  return (
    <div class={tw`px-4 mx-auto max-w-screen-md mt-6`}>
      <p class={tw`text-gray-600`}>{post.publishAt.toLocaleDateString()}</p>
      <h1 class={tw`text-5xl mt-2 font-bold`}>{post.title}</h1>
      <style
        dangerouslySetInnerHTML={{
          __html: CSS,
        }}
      />
      <div
        class={tw`mt-12` + " markdown-body"}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}
