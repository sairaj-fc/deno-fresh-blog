/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { loadPost, Post } from "../../utils/posts.ts";
import { render, CSS } from "https://deno.land/x/gfm@0.1.22/mod.ts";
import { State } from "../../utils/state.ts";

interface Data extends State {
  post: Post;
}

export const handler: Handlers<Data, State> = {
  GET: async (_req, ctx) => {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return ctx.render({
      ...ctx.state,
      post,
    });
  },
};

export default function BlogPostPage(props: PageProps<Data>) {
  const { post, locales } = props.data;
  const html = render(post.content);
  const dateFmt = new Intl.DateTimeFormat(locales, {
    dateStyle: "full",
  });

  return (
    <div class={tw`px-4 mx-auto max-w-screen-md mt-6`}>
      <p class={tw`text-gray-600`}>{dateFmt.format(post.publishAt)}</p>
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
