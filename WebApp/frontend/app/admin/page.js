"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiskBadge, FeedbackBadge } from "@/components/chrome";
import { getCategories, getGuides, getDiagnoses } from "@/lib/store";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const categories = getCategories();
    const guides = getGuides();
    const diagnoses = getDiagnoses();
    setData({ categories, guides, diagnoses });
  }, []);

  if (!data) return null;

  const { categories, guides, diagnoses } = data;
  const byRisk = { low: 0, medium: 0, high: 0 };
  diagnoses.forEach((d) => { byRisk[d.result.risk] = (byRisk[d.result.risk] || 0) + 1; });
  const solved = diagnoses.filter((d) => d.feedback === "solved").length;
  const unsolved = diagnoses.filter((d) => d.feedback === "unsolved").length;
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Tổng quan quản trị</h1>

      <div className="stat-grid">
        <div className="stat">
          <div className="num">{categories.length}</div>
          <div className="lbl">Danh mục thiết bị</div>
        </div>
        <div className="stat">
          <div className="num">{guides.length}</div>
          <div className="lbl">Hướng dẫn sửa chữa</div>
        </div>
        <div className="stat">
          <div className="num">{diagnoses.length}</div>
          <div className="lbl">Lượt chẩn đoán</div>
        </div>
        <div className="stat" style={{ borderLeftColor: "var(--ok)" }}>
          <div className="num" style={{ color: "var(--ok)" }}>{solved}</div>
          <div className="lbl">Phản hồi: đã xử lý</div>
        </div>
        <div className="stat" style={{ borderLeftColor: "var(--danger)" }}>
          <div className="num" style={{ color: "var(--danger)" }}>{unsolved}</div>
          <div className="lbl">Phản hồi: chưa xử lý</div>
        </div>
      </div>

      <div className="card chart-card" style={{ marginBottom: 16 }}>
        <h3>Truy cập &amp; lượt chẩn đoán 7 ngày qua</h3>
        <div className="legend">
          <span><i style={{ background: "#06b6d4" }} /> Lượt truy cập</span>
          <span><i style={{ background: "#8b5cf6" }} /> Lượt chẩn đoán</span>
        </div>
        <div className="chart" aria-label="Biểu đồ mô phỏng 7 ngày">
          {[
            ["T2", 42, 12], ["T3", 55, 18], ["T4", 38, 9], ["T5", 68, 24],
            ["T6", 74, 27], ["T7", 90, 35], ["CN", 61, 20],
          ].map(([d, v, c], i) => (
            <div key={d} className="day">
              <div className="bars">
                <span className="bar b1" style={{ height: (v / 90) * 100 + "%", animationDelay: `${i * 0.07}s` }} title={`${v} lượt truy cập`} />
                <span className="bar b2" style={{ height: (c / 90) * 100 + "%", animationDelay: `${i * 0.07 + 0.04}s` }} title={`${c} lượt chẩn đoán`} />
              </div>
              <span className="lbl">{d}</span>
            </div>
          ))}
        </div>
        <p className="hint" style={{ color: "var(--ink-soft)", fontSize: "0.8rem", marginTop: 10, marginBottom: 0 }}>
          Số liệu mô phỏng — sẽ thay bằng dữ liệu thật khi có backend.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3>Lượt chẩn đoán theo mức nguy hiểm</h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <span><RiskBadge risk="low" /> {byRisk.low}</span>
          <span><RiskBadge risk="medium" /> {byRisk.medium}</span>
          <span><RiskBadge risk="high" /> {byRisk.high}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <Link className="btn btn--primary btn--small" href="/admin/device-categories">
          Thêm danh mục thiết bị
        </Link>
        <Link className="btn btn--primary btn--small" href="/admin/repair-guides">
          Thêm vào kho tri thức AI
        </Link>
        <Link className="btn btn--ghost btn--small" href="/admin/diagnoses">
          Xem lượt chẩn đoán gần nhất
        </Link>
      </div>

      <h2>Chẩn đoán gần đây</h2>
      {diagnoses.length === 0 ? (
        <div className="empty"><p>Chưa có lượt chẩn đoán nào.</p></div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Thiết bị</th>
                <th>Mức nguy hiểm</th>
                <th>Phản hồi</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {diagnoses.slice(0, 5).map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{catMap[d.categoryId] || d.categoryId}</td>
                  <td><RiskBadge risk={d.result.risk} /></td>
                  <td><FeedbackBadge feedback={d.feedback} /></td>
                  <td>{new Date(d.createdAt).toLocaleString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
