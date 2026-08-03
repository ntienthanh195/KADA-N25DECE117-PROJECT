"use client";

import { useEffect, useState } from "react";
import { RiskBadge } from "@/components/chrome";
import { getGuides, getCategories, saveGuide } from "@/lib/store";

const EMPTY = {
  id: null,
  title: "",
  categoryId: "",
  symptoms: "",
  causes: [],
  risk: "low",
  steps: [],
  stopSigns: [],
  recommendation: "",
  source: "",
  status: "draft",
};

function linesToArray(text) {
  return text.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function RepairGuidesPage() {
  const [list, setList] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catFilter, setCatFilter] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [msg, setMsg] = useState(null);

  function reload() {
    setList(getGuides());
    setCategories(getCategories());
  }
  useEffect(reload, []);

  if (list === null) return null;

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));
  const filtered = list.filter(
    (g) =>
      (!catFilter || g.categoryId === catFilter) &&
      (!search || g.title.toLowerCase().includes(search.trim().toLowerCase()))
  );

  function openEdit(g) {
    setViewing(null);
    setEditing({
      ...g,
      causesText: g.causes.join("\n"),
      stepsText: g.steps.join("\n"),
      stopText: g.stopSigns.join("\n"),
    });
  }

  function handleSave() {
    const item = {
      ...editing,
      causes: linesToArray(editing.causesText || ""),
      steps: linesToArray(editing.stepsText || ""),
      stopSigns: linesToArray(editing.stopText || ""),
    };
    if (!item.title.trim() || !item.categoryId) {
      setMsg({ type: "error", text: "Cần nhập tiêu đề và chọn loại thiết bị." });
      return;
    }
    if (item.risk === "high" && item.steps.length > 2) {
      setMsg({
        type: "error",
        text: "Hướng dẫn mức nguy hiểm Cao không được chứa các bước tự sửa chi tiết — chỉ giữ tối đa 2 bước ngắt điện/dừng sử dụng.",
      });
      return;
    }
    const res = saveGuide(item);
    if (!res.ok) {
      setMsg({ type: "error", text: res.error });
      return;
    }
    setMsg({ type: "ok", text: item.id ? "Đã cập nhật hướng dẫn." : "Đã thêm hướng dẫn." });
    setEditing(null);
    reload();
  }

  function toggleStatus(g) {
    const next = g.status === "approved" ? "draft" : "approved";
    const res = saveGuide({ ...g, status: next });
    setMsg(res.ok ? { type: "ok", text: next === "approved" ? "Đã duyệt hướng dẫn." : "Đã chuyển về bản nháp." } : { type: "error", text: res.error });
    reload();
  }

  return (
    <>
      <div className="shell-topbar">
        <h1 style={{ fontSize: "1.5rem" }}>Cẩm nang sửa chữa &amp; Kho tri thức AI</h1>
        <button className="btn btn--primary btn--small" onClick={() => openEdit(EMPTY)}>
          Thêm hướng dẫn
        </button>
      </div>

      <p style={{ color: "var(--ink-soft)", maxWidth: "62ch" }}>
        AI chỉ được sử dụng các hướng dẫn ở trạng thái <strong>Đã duyệt</strong>.
        Nguồn tài liệu là bắt buộc khi duyệt.
      </p>

      {msg && (
        <div className={"alert alert--" + (msg.type === "ok" ? "ok" : "error")}>{msg.text}</div>
      )}

      {editing && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3>{editing.id ? "Sửa hướng dẫn" : "Thêm hướng dẫn"}</h3>
          <div className="field">
            <label>Tiêu đề *</label>
            <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field">
              <label>Loại thiết bị *</label>
              <select className="input" value={editing.categoryId} onChange={(e) => setEditing({ ...editing, categoryId: e.target.value })}>
                <option value="">— Chọn —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Mức độ nguy hiểm</label>
              <select className="input" value={editing.risk} onChange={(e) => setEditing({ ...editing, risk: e.target.value })}>
                <option value="low">Nguy cơ thấp</option>
                <option value="medium">Cần thận trọng</option>
                <option value="high">Nguy hiểm</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>Triệu chứng liên quan</label>
            <textarea className="input" value={editing.symptoms} onChange={(e) => setEditing({ ...editing, symptoms: e.target.value })} />
          </div>
          <div className="field">
            <label>Nguyên nhân thường gặp (mỗi dòng một nguyên nhân)</label>
            <textarea className="input" value={editing.causesText} onChange={(e) => setEditing({ ...editing, causesText: e.target.value })} />
          </div>
          <div className="field">
            <label>Các bước kiểm tra an toàn (mỗi dòng một bước)</label>
            <textarea className="input" value={editing.stepsText} onChange={(e) => setEditing({ ...editing, stepsText: e.target.value })} />
          </div>
          <div className="field">
            <label>Dấu hiệu phải dừng (mỗi dòng một dấu hiệu)</label>
            <textarea className="input" value={editing.stopText} onChange={(e) => setEditing({ ...editing, stopText: e.target.value })} />
          </div>
          <div className="field">
            <label>Khuyến nghị liên hệ kỹ thuật viên</label>
            <input className="input" value={editing.recommendation} onChange={(e) => setEditing({ ...editing, recommendation: e.target.value })} />
          </div>
          <div className="field">
            <label>Nguồn tài liệu (bắt buộc khi duyệt)</label>
            <input className="input" value={editing.source} onChange={(e) => setEditing({ ...editing, source: e.target.value })} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn--primary btn--small" onClick={handleSave}>Lưu hướng dẫn</button>
            <button className="btn btn--ghost btn--small" onClick={() => setEditing(null)}>Hủy</button>
          </div>
        </div>
      )}

      {viewing && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="shell-topbar" style={{ marginBottom: 8 }}>
            <h3>{viewing.title}</h3>
            <button className="btn btn--ghost btn--small" onClick={() => setViewing(null)}>Đóng</button>
          </div>
          <dl className="kv">
            <dt>Thiết bị</dt><dd>{catMap[viewing.categoryId]}</dd>
            <dt>Triệu chứng</dt><dd>{viewing.symptoms}</dd>
            <dt>Nguyên nhân</dt><dd>{viewing.causes.join("; ")}</dd>
            <dt>Mức nguy hiểm</dt><dd><RiskBadge risk={viewing.risk} /></dd>
            <dt>Các bước</dt><dd>{viewing.steps.join(" → ")}</dd>
            <dt>Dấu hiệu dừng</dt><dd>{viewing.stopSigns.join("; ") || "—"}</dd>
            <dt>Khuyến nghị</dt><dd>{viewing.recommendation}</dd>
            <dt>Nguồn</dt><dd>{viewing.source || "—"}</dd>
          </dl>
        </div>
      )}

      <div className="filters">
        <select className="input" value={catFilter} onChange={(e) => setCatFilter(e.target.value)} aria-label="Lọc theo thiết bị">
          <option value="">Tất cả thiết bị</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input className="input" placeholder="Tìm theo tiêu đề…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Tìm kiếm hướng dẫn" />
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><p>Không có hướng dẫn nào khớp với bộ lọc.</p></div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Thiết bị</th>
                <th>Mức nguy hiểm</th>
                <th>Trạng thái</th>
                <th>Cập nhật</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <tr key={g.id}>
                  <td><strong>{g.title}</strong></td>
                  <td>{catMap[g.categoryId] || g.categoryId}</td>
                  <td><RiskBadge risk={g.risk} /></td>
                  <td>
                    <span className={"badge " + (g.status === "approved" ? "badge--approved" : "badge--neutral")}>
                      {g.status === "approved" ? "Đã duyệt" : "Bản nháp"}
                    </span>
                  </td>
                  <td>{g.updatedAt}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button className="btn btn--ghost btn--small" onClick={() => setViewing(g)}>Xem</button>
                      <button className="btn btn--ghost btn--small" onClick={() => openEdit(g)}>Sửa</button>
                      <button className="btn btn--ghost btn--small" onClick={() => toggleStatus(g)}>
                        {g.status === "approved" ? "Chuyển về nháp" : "Duyệt"}
                      </button>
                    </div>
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
