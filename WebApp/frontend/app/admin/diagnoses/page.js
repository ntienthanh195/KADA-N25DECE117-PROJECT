"use client";

import { useEffect, useMemo, useState } from "react";
import { RiskBadge, FeedbackBadge } from "@/components/chrome";
import { getDiagnoses, getCategories } from "@/lib/store";

export default function AdminDiagnosesPage() {
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catFilter, setCatFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [fbFilter, setFbFilter] = useState("");
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    setItems(getDiagnoses());
    setCategories(getCategories());
  }, []);

  const catMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  if (items === null) return null;

  const filtered = items.filter(
    (d) =>
      (!catFilter || d.categoryId === catFilter) &&
      (!riskFilter || d.result.risk === riskFilter) &&
      (!fbFilter || d.feedback === fbFilter)
  );

  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Theo dõi lượt chẩn đoán</h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: "62ch" }}>
        Danh sách phục vụ kiểm tra chất lượng kết quả AI. Không hiển thị mật khẩu
        hay dữ liệu xác thực của người dùng.
      </p>

      <div className="filters">
        <select className="input" value={catFilter} onChange={(e) => setCatFilter(e.target.value)} aria-label="Lọc theo thiết bị">
          <option value="">Tất cả thiết bị</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select className="input" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} aria-label="Lọc theo mức nguy hiểm">
          <option value="">Mọi mức nguy hiểm</option>
          <option value="low">Nguy cơ thấp</option>
          <option value="medium">Cần thận trọng</option>
          <option value="high">Nguy hiểm</option>
        </select>
        <select className="input" value={fbFilter} onChange={(e) => setFbFilter(e.target.value)} aria-label="Lọc theo phản hồi">
          <option value="">Mọi phản hồi</option>
          <option value="solved">Đã xử lý được</option>
          <option value="unsolved">Chưa xử lý được</option>
          <option value="untried">Chưa thử</option>
          <option value="none">Chưa phản hồi</option>
        </select>
      </div>

      {viewing && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="shell-topbar" style={{ marginBottom: 8 }}>
            <h3>Chi tiết {viewing.id}</h3>
            <button className="btn btn--ghost btn--small" onClick={() => setViewing(null)}>Đóng</button>
          </div>
          <dl className="kv">
            <dt>Thiết bị</dt><dd>{catMap[viewing.categoryId]} {viewing.brand} {viewing.model}</dd>
            <dt>Triệu chứng</dt><dd>{viewing.symptoms}</dd>
            <dt>Tóm tắt AI</dt><dd>{viewing.result.summary}</dd>
            <dt>Mức nguy hiểm</dt><dd><RiskBadge risk={viewing.result.risk} /></dd>
            <dt>Khuyến nghị</dt><dd>{viewing.result.recommendation}</dd>
            <dt>Phản hồi</dt><dd><FeedbackBadge feedback={viewing.feedback} /> {viewing.feedbackNote}</dd>
            <dt>Thời gian</dt><dd>{new Date(viewing.createdAt).toLocaleString("vi-VN")}</dd>
          </dl>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty"><p>Không có lượt chẩn đoán nào khớp với bộ lọc.</p></div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Thiết bị</th>
                <th>Triệu chứng</th>
                <th>Mức nguy hiểm</th>
                <th>Phản hồi</th>
                <th>Thời gian</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{catMap[d.categoryId] || d.categoryId}</td>
                  <td style={{ maxWidth: 280 }}>{d.symptoms.slice(0, 70)}{d.symptoms.length > 70 ? "…" : ""}</td>
                  <td><RiskBadge risk={d.result.risk} /></td>
                  <td><FeedbackBadge feedback={d.feedback} /></td>
                  <td>{new Date(d.createdAt).toLocaleString("vi-VN")}</td>
                  <td>
                    <button className="btn btn--ghost btn--small" onClick={() => setViewing(d)}>Xem</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
