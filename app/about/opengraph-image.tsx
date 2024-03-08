export const runtime = "edge";
export const revalidate = 60;

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";
import commaNumber from "comma-number";

export default async function AboutOG() {
  const avatar = fetch(
    new URL(`../../public/images/avatar.jpg`, import.meta.url)
  ).then(res => res.arrayBuffer());

  const jetbrains500 = fetch(
    new URL(
      `../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff`,
      import.meta.url
    )
  ).then(res => res.arrayBuffer());

  const jetbrains400 = fetch(
    new URL(
      `../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff`,
      import.meta.url
    )
  ).then(res => res.arrayBuffer());

  const posts = await getPosts();
  const viewsSum = posts.reduce((sum, post) => sum + post.views, 0);

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
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
              <div tw="flex mb-5" style={font("Jetbrains 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span>  Major in Computer Science
              </div>
              <div tw="flex mb-5" style={font("Jetbrains 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> ACMer / Fullstack Engineer
              </div>
              <div tw="flex" style={font("Jetbrains 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Lives in Guangdong, China
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
          name: "Jetbrains 500",
          data: await jetbrains500,
        },
        {
          name: "Jetbrains 400",
          data: await jetbrains400,
        },
      ],
    }
  );
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
