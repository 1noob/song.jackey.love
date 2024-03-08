export const runtime = "edge";
export const revalidate = 60;

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";

export default async function MainOG() {
  // fonts
  const jetbrains300 = fetch(
    new URL(
      `../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-300-normal.woff`,
      import.meta.url
    )
  ).then(res => res.arrayBuffer());

  const jetbrains600 = fetch(
    new URL(
      `../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff`,
      import.meta.url
    )
  ).then(res => res.arrayBuffer());

  const jetbrains400 = fetch(
    new URL(
      `../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff`,
      import.meta.url
    )
  ).then(res => res.arrayBuffer());

  const posts = await getPosts();

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

        <main tw="flex mt-10 flex-col w-full" style={font("Jetbrains 400")}>
          <div tw="flex w-full text-[26px] text-gray-400 mb-3">
            <div tw="w-24">date</div>
            <div tw="grow">title</div>
            <div>views</div>
          </div>

          {posts.map((post, i) => (
            <div
              key={post.id}
              tw="flex py-6 text-[26px] border-gray-300 border-t w-full"
            >
              <div tw="flex text-gray-400 w-24">
                {posts[i - 1] === undefined ||
                getYear(post.date) !== getYear(posts[i - 1].date)
                  ? getYear(post.date)
                  : ""}
              </div>
              <div tw="flex grow">{post.title}</div>
              <div tw="flex text-gray-400 pl-7">{post?.viewsFormatted}</div>
            </div>
          ))}
        </main>
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
          name: "Jetbrains 600",
          data: await jetbrains600,
        },
        {
          name: "Jetbrains 400",
          data: await jetbrains400,
        },
      ],
    }
  );
}

// lil helper to convert posts.json `date` to full year
function getYear(date: string) {
  return new Date(date).getFullYear();
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
