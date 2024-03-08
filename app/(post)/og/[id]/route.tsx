export const runtime = "edge";

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";

// fonts
const jetbrains300 = fetch(
  new URL(
    `../../../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-300-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const jetbrains500 = fetch(
  new URL(
    `../../../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const jetbrains600 = fetch(
  new URL(
    `../../../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const robotoMono400 = fetch(
  new URL(
    `../../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

export async function GET(_req: Request, { params: { id } }) {
  const posts = await getPosts();
  const post = posts.find(p => p.id === id);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Jetbrains 300")}
      >
        <header tw="flex text-[36px] w-full">
          <div tw="font-bold" style={font("Jetbrains 600")}>
            SONG
          </div>
          <div tw="grow" />
          <div tw="text-[28px]">blog.jackey.love</div>
        </header>

        <main tw="flex grow pb-3 flex-col items-center justify-center">
          <div tw="flex">
            <div
              tw="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center"
              style={font("Jetbrains 500")}
            >
              {post.title}
            </div>
          </div>

          <div
            tw="mt-5 flex text-3xl text-gray-500"
            style={font("Roboto Mono 400")}
          >
            {post.date} – {post.viewsFormatted} views
          </div>
        </main>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Jetbrains 300",
          data: await jetbrains300,
        },
        {
          name: "Jetbrains 500",
          data: await jetbrains500,
        },
        {
          name: "Jetbrains 600",
          data: await jetbrains600,
        },
        {
          name: "Roboto Mono 400",
          data: await robotoMono400,
        },
      ],
    }
  );
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
