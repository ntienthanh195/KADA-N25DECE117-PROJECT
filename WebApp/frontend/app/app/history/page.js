"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { RiskBadge, FeedbackBadge } from "@/components/chrome";
import { getSession, getDiagnoses, getCategories } from "@/lib/store";

const PAGE_SIZE = 10;

export default function HistoryPage() {
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catFilter, setCatFilter] = useState("");
  const [fbFilter, setFbFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const session = getSession();
    if (!session) return;
    setItems(getDiagnoses({ userId: session.userId }));
    setCategories(getCategories());
  }, []);

  const catMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = search.trim().toLowerCase();
    return items.filter(
      (d) =>
        (!catFilter || d.categoryId === catFilter) &&
        (!fbFilter || d.feedback === fbFilter) &&
        (!q ||
          d.symptoms.toLowerCase().includes(q) ||
          (d.brand || "").toLowerCase().includes(q) ||
          (d.model || "").toLowerCase().includes(q))
    );
  }, [items, catFilter, fbFilter, search]);

  if (items === null) return null;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Lịch sử chẩn đoán</h1>

      {items.length === 0 ? (
        <div className="empty">
          <h3>Chưa có lịch sử</h3>
          <p>Các lượt chẩn đoán của bạn sẽ được lưu lại tại đây để xem lại bất cứ lúc nào.</p>
          <Link className="btn btn--primary" href="/app/diagnoses/new">Chẩn đoán mới</Link>
        </div>
      ) : (
        <>
          <div className="filters">
            <input
              className="input"
              style={{ flex: 1, minWidth: 200 }}
              placeholder="Tìm nhanh theo triệu chứng, hãng, model…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              aria-label="Tìm kiếm lịch sử"
            />
            <select
              className="input"
              value={catFilter}
              onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
              aria-label="Lọc theo loại thiết bị"
            >
              <option value="">Tất cả thiết bị</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              className="input"
              value={fbFilter}
              onChange={(e) => { setFbFilter(e.target.value); setPage(1); }}
              aria-label="Lọc theo trạng thái xử lý"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="solved">Đã xử lý được</option>
              <option value="unsolved">Chưa xử lý được</option>
              <option value="untried">Chưa thử</option>
              <option value="none">Chưa phản hồi</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <p>Không có kết quả nào khớp với bộ lọc hiện tại.</p>
            </div>
          ) : (
            <>
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
                    {pageItems.map((d) => (
                      <tr key={d.id}>
                        <td>
                          <strong>{catMap[d.categoryId] || d.categoryId}</strong>
                          {d.brand && (
                            <div style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>
                              {d.brand} {d.model}
                            </div>
                          )}
                        </td>
                        <td style={{ maxWidth: 320 }}>
                          {d.symptoms.slice(0, 80)}{d.symptoms.length > 80 ? "…" : ""}
                        </td>
                        <td>{new Date(d.createdAt).toLocaleDateString("vi-VN")}</td>
                        <td><RiskBadge risk={d.result.risk} /></td>
                        <td><FeedbackBadge feedback={d.feedback} /></td>
                        <td><Link href={`/app/diagnoses/${d.id}`}>Xem chi tiết</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div style={{ display: "flex", gap: 8, marginTop: 14, alignItems: "center" }}>
                  <button className="btn btn--ghost btn--small" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    ← Trước
                  </button>
                  <span style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>
                    Trang {page}/{totalPages}
                  </span>
                  <button className="btn btn--ghost btn--small" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                    Sau →
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
