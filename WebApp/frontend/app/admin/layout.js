"use client";

import { Shell, ADMIN_LINKS } from "@/components/chrome";

export default function AdminAreaLayout({ children }) {
  return (
    <Shell role="admin" links={ADMIN_LINKS}>
      {children}
    </Shell>
  );
}
