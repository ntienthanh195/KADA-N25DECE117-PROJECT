"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PublicHeader } from "@/components/chrome";
import { login } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit() {
    setError("");
    if (!email.trim() || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const res = login(email, password);
      if (!res.ok) {
        setError(res.error);
        setSubmitting(false);
        return;
      }
      router.push(res.session.role === "admin" ? "/admin" : "/app/dashboard");
    }, 400);
  }

  return (
    <>
      <PublicHeader />
      <div className="auth-bg theme-dark lp" style={{ minHeight: "100vh" }}>
      <div className="auth-wrap">
        <div className="card">
          <h1 style={{ fontSize: "1.5rem" }}>Đăng nhập</h1>
          <p style={{ color: "var(--ink-soft)" }}>
            Vào lại tài khoản để tiếp tục chẩn đoán và xem lịch sử.
          </p>

          {error && <div className="alert alert--error">{error}</div>}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <button
            className="btn btn--primary"
            style={{ width: "100%" }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <span className="spinner" aria-label="Đang đăng nhập" /> : "Đăng nhập"}
          </button>

          <p style={{ marginTop: 14, fontSize: "0.92rem" }}>
            Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
          </p>

          <div className="alert alert--warn" style={{ fontSize: "0.85rem" }}>
            Tài khoản demo — Người dùng: <strong>user@trosuaai.vn / user123</strong>
            <br />
            Admin: <strong>admin@trosuaai.vn / admin123</strong>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
