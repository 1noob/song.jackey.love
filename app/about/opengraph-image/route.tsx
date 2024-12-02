export const revalidate = 60;

import { ImageResponse } from "next/og";
import { getPosts } from "@/app/get-posts";
import { readFileSync } from "fs";
import { join } from "path";
import commaNumber from "comma-number";

// Image
const songPhoto = toArrayBuffer(
  readFileSync(join(process.cwd(), "public/images/avatar.png"))
);

// Fonts
const fontsDir = join(process.cwd(), "fonts");

const mono300 = readFileSync(
  join(fontsDir, "jetbrains-mono-latin-300-normal.woff")
);

const mono500 = readFileSync(
  join(fontsDir, "jetbrains-mono-latin-500-normal.woff")
);

const mono400 = readFileSync(
  join(fontsDir, "jetbrains-mono-latin-400-normal.woff")
);

export async function GET() {
  const posts = await getPosts();
  const viewsSum = posts.reduce((sum, post) => sum + post.views, 0);

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Mono 300")}
      >
        <main tw="flex grow pt-4 w-full justify-center items-center">
          <div tw="flex flex-row">
            <div tw="flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                tw="rounded-full h-74"
                alt="SONG"
                // @ts-ignore
                src={songPhoto}
              />
            </div>

            <div tw="flex flex-col px-10 grow text-[28px] h-70 justify-center">
              <div tw="text-[64px] mb-7" style={font("Mono 500")}>
                SONG
              </div>
              <div tw="flex mb-5" style={font("Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Computer Science &bull; GDUFE
              </div>
              <div tw="flex mb-5" style={font("Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Electronic Information &bull; FDU
              </div>
              <div tw="flex" style={font("Mono 400")}>
                <span tw="text-gray-400 mr-3">&mdash;</span> Guangdong, China
              </div>
            </div>
          </div>
        </main>

        <footer
          tw="flex w-full justify-center text-2xl text-gray-500"
          style={font("Mono 400")}
        >
          {posts.length} posts / {commaNumber(viewsSum)} views
        </footer>
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

function toArrayBuffer(buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}
