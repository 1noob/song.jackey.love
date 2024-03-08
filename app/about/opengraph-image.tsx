export const runtime = "edge";
export const revalidate = 60;

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";
import commaNumber from "comma-number";

export default async function AboutOG() {
  const avatar = fetch(
    new URL(`../../public/images/avatar.jpeg`, import.meta.url)
  ).then(res => res.arrayBuffer());

  // fonts
  const jetbrains300 = fetch(
    new URL(
      `../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-300-normal.woff`,
      import.meta.url
    )
  ).then(res => res.arrayBuffer());

  const jetbrains500 = fetch(
    new URL(
      `../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff`,
      import.meta.url
    )
  ).then(res => res.arrayBuffer());

  const robotoMono400 = fetch(
    new URL(
      `../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff`,
      import.meta.url
    )
  ).then(res => res.arrayBuffer());

  const posts = await getPosts();
  const viewsSum = posts.reduce((sum, post) => sum + post.views, 0);

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Jetbrains 300")}
      >
        <main tw="flex grow pt-4 w-full justify-center items-center">
          <div tw="flex flex-row">
            <div tw="flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                tw="rounded-full h-74"
                alt="SONG"
                // @ts-ignore
                src={await avatar}
              />
            </div>

            <div tw="flex flex-col px-10 grow text-[28px] h-70 justify-center">
              <div tw="text-[64px] mb-7" style={font("Jetbrains 500")}>
                SONG
              </div>
              <div tw="flex mb-5" style={font("Roboto Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> CEO and Founder of
                Vercel
              </div>
              <div tw="flex mb-5" style={font("Roboto Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Creator of Next.js,
                Socket.IO, Mongoose
              </div>
              <div tw="flex" style={font("Roboto Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Lives in San
                Francisco, CA
              </div>
            </div>
          </div>
        </main>

        <footer
          tw="flex w-full justify-center text-2xl text-gray-500"
          style={font("Roboto Mono 400")}
        >
          {posts.length} posts / {commaNumber(viewsSum)} views
        </footer>
      </div>
    ),
    {
      width: 1200,
      height: 600,
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
