"use client";

import dynamic from "next/dynamic";

const SiteHeader = dynamic(() => import("@/components/SiteHeader"), {
  ssr: false
});

export default function SiteHeaderShell(props) {
  return <SiteHeader {...props} />;
}
