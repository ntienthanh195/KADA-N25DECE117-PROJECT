"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PublicHeader } from "@/components/chrome";
import { register } from "@/lib/store";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Họ tên không được để trống.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Email không đúng định dạng.";
    if (form.password.length < 6) e.password = "Mật khẩu cần tối thiểu 6 ký tự.";
    if (form.confirm !== form.password) e.confirm = "Xác nhận mật khẩu chưa trùng khớp.";
    if (!form.agree) e.agree = "Bạn cần đồng ý điều khoản sử dụng.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    // Giả lập độ trễ mạng để thấy trạng thái "Đang gửi".
    setTimeout(() => {
      const res = register(form);
      if (!res.ok) {
        setServerError(res.error);
        setSubmitting(false);
        return;
      }
      router.push("/app/dashboard");
    }, 500);
  }

  return (
    <>
      <PublicHeader />
      <div className="auth-bg theme-dark lp" style={{ minHeight: "100vh" }}>
      <div className="auth-wrap">
        <div className="card">
          <h1 style={{ fontSize: "1.5rem" }}>Tạo tài khoản</h1>
          <p style={{ color: "var(--ink-soft)" }}>
            Đăng ký để bắt đầu kiểm tra sự cố thiết bị và lưu lại lịch sử.
          </p>

          {serverError && <div className="alert alert--error">{serverError}</div>}

          <div className={"field" + (errors.name ? " field--error" : "")}>
            <label htmlFor="name">Họ và tên</label>
            <input
              id="name"
              className="input"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className={"field" + (errors.email ? " field--error" : "")}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              autoComplete="email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className={"field" + (errors.password ? " field--error" : "")}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="input"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              autoComplete="new-password"
            />
            <p className="hint">Tối thiểu 6 ký tự.</p>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className={"field" + (errors.confirm ? " field--error" : "")}>
            <label htmlFor="confirm">Xác nhận mật khẩu</label>
            <input
              id="confirm"
              type="password"
              className="input"
              value={form.confirm}
              onChange={(e) => set("confirm", e.target.value)}
              autoComplete="new-password"
            />
            {errors.confirm && <p className="error-text">{errors.confirm}</p>}
          </div>

          <div className={"field" + (errors.agree ? " field--error" : "")}>
            <label style={{ fontWeight: 400, display: "flex", gap: 8 }}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => set("agree", e.target.checked)}
              />
              <span>Tôi đồng ý với điều khoản sử dụng của Trợ Sửa AI.</span>
            </label>
            {errors.agree && <p className="error-text">{errors.agree}</p>}
          </div>

          <button
            className="btn btn--primary"
            style={{ width: "100%" }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <span className="spinner" aria-label="Đang gửi" /> : "Đăng ký"}
          </button>

          <p style={{ marginTop: 14, fontSize: "0.92rem" }}>
            Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}
