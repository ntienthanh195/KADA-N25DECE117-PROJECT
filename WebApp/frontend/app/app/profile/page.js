"use client";

import { useEffect, useState } from "react";
import { getSession, updateProfile, changePassword } from "@/lib/store";

export default function ProfilePage() {
  const [session, setSession] = useState(null);
  const [name, setName] = useState("");
  const [nameMsg, setNameMsg] = useState(null);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState(null);

  useEffect(() => {
    const s = getSession();
    setSession(s);
    if (s) setName(s.name);
  }, []);

  if (!session) return null;

  function handleName() {
    if (!name.trim()) {
      setNameMsg({ type: "error", text: "Họ tên không được để trống." });
      return;
    }
    const res = updateProfile({ name });
    setNameMsg(
      res.ok
        ? { type: "ok", text: "Đã cập nhật họ tên." }
        : { type: "error", text: res.error }
    );
  }

  function handlePassword() {
    if (pw.next.length < 6) {
      setPwMsg({ type: "error", text: "Mật khẩu mới cần tối thiểu 6 ký tự." });
      return;
    }
    if (pw.next !== pw.confirm) {
      setPwMsg({ type: "error", text: "Xác nhận mật khẩu chưa trùng khớp." });
      return;
    }
    const res = changePassword({ current: pw.current, next: pw.next });
    if (res.ok) {
      setPwMsg({ type: "ok", text: "Đã đổi mật khẩu." });
      setPw({ current: "", next: "", confirm: "" });
    } else {
      setPwMsg({ type: "error", text: res.error });
    }
  }

  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Hồ sơ cá nhân</h1>

      <div className="card" style={{ maxWidth: 520 }}>
        <h3>Thông tin tài khoản</h3>
        <div className="field">
          <label>Email</label>
          <input className="input" value={session.email} disabled />
          <p className="hint">Email dùng để đăng nhập, không thể thay đổi trong MVP.</p>
        </div>
        <div className="field">
          <label htmlFor="name">Họ và tên</label>
          <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        {nameMsg && (
          <div className={"alert alert--" + (nameMsg.type === "ok" ? "ok" : "error")}>{nameMsg.text}</div>
        )}
        <button className="btn btn--primary btn--small" onClick={handleName}>
          Lưu họ tên
        </button>
      </div>

      <div className="card" style={{ maxWidth: 520 }}>
        <h3>Đổi mật khẩu</h3>
        <div className="field">
          <label htmlFor="cur">Mật khẩu hiện tại</label>
          <input id="cur" type="password" className="input" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} autoComplete="current-password" />
        </div>
        <div className="field">
          <label htmlFor="next">Mật khẩu mới</label>
          <input id="next" type="password" className="input" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} autoComplete="new-password" />
        </div>
        <div className="field">
          <label htmlFor="cf">Xác nhận mật khẩu mới</label>
          <input id="cf" type="password" className="input" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} autoComplete="new-password" />
        </div>
        {pwMsg && (
          <div className={"alert alert--" + (pwMsg.type === "ok" ? "ok" : "error")}>{pwMsg.text}</div>
        )}
        <button className="btn btn--primary btn--small" onClick={handlePassword}>
          Đổi mật khẩu
        </button>
      </div>
    </>
  );
}
