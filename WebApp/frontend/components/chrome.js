"use client";

// Các khối giao diện dùng chung: header công khai, khung sidebar cho
// khu vực người dùng và admin, huy hiệu rủi ro/phản hồi, footer.

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, logout, seedIfEmpty } from "@/lib/store";
import { RISK_LABEL, FEEDBACK_LABEL } from "@/lib/mock-data";
import {
  IconGrid, IconPlus, IconHistory, IconUser, IconFan, IconBook,
  IconClipboard, IconHome,
} from "./icons";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Trợ Sửa AI — Trang chủ">
      <img className="logo-mark" src="/logo-mark.svg" alt="" aria-hidden="true" />
      <span>Trợ Sửa AI</span>
    </Link>
  );
}

export function PublicHeader({ variant }) {
  const [session, setSession] = useState(null);
  useEffect(() => {
    seedIfEmpty();
    setSession(getSession());
  }, []);
  return (
    <header className={"site-header" + (variant === "dark" ? " site-header--dark" : "")}>
      <div className="container">
        <Logo />
        <nav className="nav-links" aria-label="Điều hướng chính">
          <a href="/#cach-hoat-dong">Cách hoạt động</a>
          <a href="/#an-toan">An toàn</a>
          {session ? (
            <Link
              className="btn btn--primary btn--small"
              href={session.role === "admin" ? "/admin" : "/app/dashboard"}
            >
              Vào trang của tôi
            </Link>
          ) : (
            <>
              <Link href="/login">Đăng nhập</Link>
              <Link className="btn btn--primary btn--small" href="/register">
                Bắt đầu
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div style={{ maxWidth: 380 }}>
            <Logo />
            <p>
              Trợ lý kiểm tra ban đầu cho thiết bị trong nhà. Kết quả chỉ mang
              tính hỗ trợ, không thay thế kỹ thuật viên chuyên môn.
            </p>
          </div>
          <div>
            <strong>Sản phẩm</strong>
            <p>
              Cách hoạt động
              <br />
              Nguyên tắc an toàn
              <br />
              Thiết bị hỗ trợ
            </p>
          </div>
          <div>
            <strong>Chính sách</strong>
            <p>
              Điều khoản sử dụng cơ bản
              <br />
              Chính sách quyền riêng tư cơ bản
            </p>
          </div>
          <div>
            <strong>Nhóm phát triển</strong>
            <p>
              Nguyễn Tiến Thành — N25DECE117
              <br />
              Full-stack Developer
            </p>
          </div>
        </div>
        <div className="foot-note">
          © 2026 Trợ Sửa AI — Dự án học tập KADA. Hiểu lỗi nhanh, xử lý an toàn.
        </div>
      </div>
    </footer>
  );
}

/* Khung có sidebar, dùng chung cho /app/* và /admin/*.
   Tự kiểm tra đăng nhập và vai trò; chuyển hướng nếu không đủ quyền. */
export function Shell({ role, links, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState(undefined); // undefined = đang kiểm tra

  useEffect(() => {
    seedIfEmpty();
    const s = getSession();
    if (!s) {
      router.replace("/login");
      return;
    }
    if (role === "admin" && s.role !== "admin") {
      router.replace("/forbidden");
      return;
    }
    setSession(s);
  }, [router, role]);

  if (session === undefined) {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <span className="spinner spinner--dark" aria-label="Đang tải" />
      </div>
    );
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="shell theme-dark">
      <aside className="shell-side">
        <Logo />
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={"side-link" + (pathname === l.href ? " active" : "")}
            >
              {Icon && <Icon />}
              {l.label}
            </Link>
          );
        })}
        <div className="side-footer">Hiểu lỗi nhanh, xử lý an toàn.</div>
      </aside>
      <main className="shell-main">
        <div className="shell-topbar">
          <span className="who">
            <span className="avatar">{(session.name || "?").trim().charAt(0).toUpperCase()}</span>
            <span>
              {role === "admin" ? "Quản trị viên" : "Xin chào"},{" "}
              <strong>{session.name}</strong>
            </span>
          </span>
          <button className="btn btn--ghost btn--small" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}

export const USER_LINKS = [
  { href: "/app/dashboard", label: "Tổng quan", icon: IconGrid },
  { href: "/app/diagnoses/new", label: "Chẩn đoán mới", icon: IconPlus },
  { href: "/app/history", label: "Lịch sử", icon: IconHistory },
  { href: "/app/profile", label: "Hồ sơ cá nhân", icon: IconUser },
];

export const ADMIN_LINKS = [
  { href: "/admin", label: "Tổng quan", icon: IconGrid },
  { href: "/admin/device-categories", label: "Danh mục thiết bị", icon: IconFan },
  { href: "/admin/repair-guides", label: "Kho hướng dẫn", icon: IconBook },
  { href: "/admin/diagnoses", label: "Theo dõi chẩn đoán", icon: IconClipboard },
  { href: "/", label: "Quay lại website", icon: IconHome },
];

export function RiskBadge({ risk }) {
  return <span className={"badge badge--" + risk}>{RISK_LABEL[risk] || risk}</span>;
}

export function FeedbackBadge({ feedback }) {
  const cls =
    feedback === "solved" ? "badge--low" : feedback === "unsolved" ? "badge--high" : "badge--neutral";
  return <span className={"badge " + cls}>{FEEDBACK_LABEL[feedback] || feedback}</span>;
}
