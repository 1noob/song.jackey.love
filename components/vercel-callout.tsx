"use client";

import React from "react";
import {Link} from "@nextui-org/react";

import {trackEvent} from "@/utils/va";
import { VercelBlueIcon } from "@/components/icons";

export const VercelCallout: React.FC<unknown> = () => {
  return (
    <Link
      isExternal
      className="flex justify-center items-center gap-2 text-foreground"
      href="https://www.vercel.com?utm_source=nextui&utm_marketing=oss"
      onClick={() => {
        trackEvent("VercelCallout", {
          name: "vercel callout",
          action: "click",
          category: "footer",
        });
      }}
    >
      <p className="font-bold">Deployed on</p>
      <VercelBlueIcon />
      <p className="font-bold">Vercel</p>
    </Link>
  );
};
