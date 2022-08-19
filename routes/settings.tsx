/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "../utils/state.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers<State, State> = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
  async POST(req) {
    const form = await req.formData();
    const locale = form.get("locale");

    const headers = new Headers({
      Location: "/settings",
    });

    if (typeof locale === "string") {
      setCookie(headers, {
        name: "locale",
        value: locale,
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return new Response("", {
      status: 303,
      headers,
    });
  },
};

export default function SettingsPage(props: PageProps<State>) {
  const { locales } = props.data;

  return (
    <div class={tw`px-4 mx-auto max-w-screen-md mt-6`}>
      <h1 class={tw`text-5xl mt-12 font-bold`}>Settings Page</h1>
      <p class={tw`mt-4`}>
        Your current locale is <b>{locales[0]}</b>{" "}
      </p>
      <form method="post" class={tw`space-x-2 mt-4 flex items-end`}>
        <div class={tw`flex flex-col`}>
          <label htmlFor="locale">Locale</label>
          <input
            type="text"
            name="locale"
            id="locale"
            class={tw`border px-2 py-1.5 rounded-md`}
          />
        </div>
        <button
          type="submit"
          class={tw`px-2 py-2 bg-blue(500 hover:700 disabled:200) text-white rounded-md font-medium text-md`}
        >
          Save
        </button>
      </form>
    </div>
  );
}
