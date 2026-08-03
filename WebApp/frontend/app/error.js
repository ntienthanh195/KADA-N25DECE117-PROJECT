"use client";

import Link from "next/link";

export default function GlobalError({ reset }) {
  return (
    <div className="auth-wrap">
      <div className="empty">
        <h1 style={{ fontSize: "2rem" }}>500</h1>
        <h3>Hệ thống đang gặp lỗi</h3>
        <p>Đã có lỗi xảy ra khi xử lý yêu cầu. Bạn có thể thử lại.</p>
        <p style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="btn btn--primary" onClick={() => reset()}>Thử lại</button>
          <Link className="btn btn--ghost" href="/">Về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}
