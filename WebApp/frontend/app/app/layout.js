"use client";

import { Shell, USER_LINKS } from "@/components/chrome";

export default function UserAreaLayout({ children }) {
  return (
    <Shell role="user" links={USER_LINKS}>
      {children}
    </Shell>
  );
}
