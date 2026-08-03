"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiskBadge, FeedbackBadge } from "@/components/chrome";
import { getSession, getDiagnoses, getCategories } from "@/lib/store";

export default function DashboardPage() {
  const [items, setItems] = useState(null);
  const [catMap, setCatMap] = useState({});

  useEffect(() => {
    const session = getSession();
    if (!session) return;
    setItems(getDiagnoses({ userId: session.userId }));
    setCatMap(Object.fromEntries(getCategories().map((c) => [c.id, c.name])));
  }, []);

  if (items === null) return null;

  const solved = items.filter((d) => d.feedback === "solved").length;
  const unsolved = items.filter((d) => d.feedback === "unsolved").length;
  const deviceCount = new Set(items.map((d) => d.categoryId)).size;

  return (
    <>
      <div className="shell-topbar">
        <h1 style={{ fontSize: "1.5rem" }}>Tổng quan</h1>
        <Link className="btn btn--primary" href="/app/diagnoses/new">
          Chẩn đoán mới
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="empty">
          <h3>Bạn chưa có lượt chẩn đoán nào</h3>
          <p>
            Mô tả sự cố thiết bị và tải ảnh để nhận kết quả kiểm tra ban đầu cùng
            hướng dẫn an toàn.
          </p>
          <Link className="btn btn--primary" href="/app/diagnoses/new">
            Tạo lần chẩn đoán đầu tiên
          </Link>
        </div>
      ) : (
        <>
          <div className="stat-grid">
            <div className="stat">
              <div className="num">{items.length}</div>
              <div className="lbl">Tổng lượt chẩn đoán</div>
            </div>
            <div className="stat" style={{ borderLeftColor: "#8b5cf6" }}>
              <div className="num" style={{ color: "#a78bfa" }}>{deviceCount}</div>
              <div className="lbl">Loại thiết bị đã kiểm tra</div>
            </div>
            <div className="stat" style={{ borderLeftColor: "var(--ok)" }}>
              <div className="num" style={{ color: "var(--ok)" }}>{solved}</div>
              <div className="lbl">Đã xử lý được</div>
            </div>
            <div className="stat" style={{ borderLeftColor: "var(--danger)" }}>
              <div className="num" style={{ color: "var(--danger)" }}>{unsolved}</div>
              <div className="lbl">Chưa xử lý được</div>
            </div>
          </div>

          <h2>Chẩn đoán gần đây</h2>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Thiết bị</th>
                  <th>Triệu chứng</th>
                  <th>Ngày</th>
                  <th>Mức nguy hiểm</th>
                  <th>Phản hồi</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.slice(0, 5).map((d) => (
                  <tr key={d.id}>
                    <td>
                      <strong>{catMap[d.categoryId] || d.categoryId}</strong>
                      {d.brand && (
                        <div style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>
                          {d.brand} {d.model}
                        </div>
                      )}
                    </td>
                    <td style={{ maxWidth: 320 }}>{d.symptoms.slice(0, 80)}{d.symptoms.length > 80 ? "…" : ""}</td>
                    <td>{new Date(d.createdAt).toLocaleDateString("vi-VN")}</td>
                    <td><RiskBadge risk={d.result.risk} /></td>
                    <td><FeedbackBadge feedback={d.feedback} /></td>
                    <td>
                      <Link href={`/app/diagnoses/${d.id}`}>Xem chi tiết</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
