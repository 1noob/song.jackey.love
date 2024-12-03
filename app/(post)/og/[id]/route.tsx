export const revalidate = 60;

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";
import { readFileSync } from "fs";
import { join } from "path";

export async function generateStaticParams() {
  return (await getPosts()).map(post => ({ id: post.id }));
}

// fonts
const fontsDir = join(process.cwd(), "fonts");

const mono300 = readFileSync(
  join(fontsDir, "jetbrains-mono-latin-300-normal.woff")
);

const mono400 = readFileSync(
  join(fontsDir, "jetbrains-mono-latin-400-normal.woff")
);


const mono500 = readFileSync(
  join(fontsDir, "jetbrains-mono-latin-500-normal.woff")
);

const mono600 = readFileSync(
  join(fontsDir, "jetbrains-mono-latin-600-normal.woff")
);


export async function GET(_req: Request, props) {
  const params = await props.params;

  const { id } = params;

  const posts = await getPosts();
  const post = posts.find(p => p.id === id);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Mono 300")}
      >
        <header tw="flex text-[36px] w-full">
          <div tw="font-bold" style={font("Mono 600")}>
            SONG
          </div>
          <div tw="grow" />
          <div tw="text-[28px]">song.jackey.love</div>
        </header>

        <main tw="flex grow pb-3 flex-col items-center justify-center">
          <div tw="flex">
            <div
              tw="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center"
              style={font("Mono 500")}
            >
              {post.title}
            </div>
          </div>

          <div
            tw="mt-5 flex text-3xl text-gray-500"
            style={font("Mono 400")}
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
          name: "Mono 300",
          data: mono300,
        },
        {
          name: "Mono 500",
          data: mono500,
        },
        {
          name: "Mono 600",
          data: mono600,
        },
        {
          name: "Mono 400",
          data: mono400,
        },
      ],
    }
  );
}

// lil helper for more succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
