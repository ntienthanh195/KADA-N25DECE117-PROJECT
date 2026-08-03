"use client";

import { useEffect, useState } from "react";
import { getCategories, getGuides, saveCategory, deleteCategory } from "@/lib/store";

const EMPTY = { id: null, name: "", description: "", active: true };

export default function DeviceCategoriesPage() {
  const [list, setList] = useState(null);
  const [guideCounts, setGuideCounts] = useState({});
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // null = đóng form
  const [msg, setMsg] = useState(null);

  function reload() {
    const cats = getCategories();
    const guides = getGuides();
    const counts = {};
    guides.forEach((g) => { counts[g.categoryId] = (counts[g.categoryId] || 0) + 1; });
    setList(cats);
    setGuideCounts(counts);
  }

  useEffect(reload, []);

  if (list === null) return null;

  const filtered = list.filter((c) =>
    c.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  function handleSave() {
    if (!editing.name.trim()) {
      setMsg({ type: "error", text: "Tên danh mục không được để trống." });
      return;
    }
    saveCategory(editing);
    setMsg({ type: "ok", text: editing.id ? "Đã cập nhật danh mục." : "Đã thêm danh mục." });
    setEditing(null);
    reload();
  }

  function handleToggle(cat) {
    saveCategory({ ...cat, active: !cat.active });
    reload();
  }

  function handleDelete(cat) {
    const res = deleteCategory(cat.id);
    setMsg(res.ok ? { type: "ok", text: "Đã xóa danh mục." } : { type: "error", text: res.error });
    reload();
  }

  return (
    <>
      <div className="shell-topbar">
        <h1 style={{ fontSize: "1.5rem" }}>Danh mục thiết bị</h1>
        <button className="btn btn--primary btn--small" onClick={() => setEditing({ ...EMPTY })}>
          Thêm danh mục
        </button>
      </div>

      {msg && (
        <div className={"alert alert--" + (msg.type === "ok" ? "ok" : "error")}>{msg.text}</div>
      )}

      {editing && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3>{editing.id ? "Sửa danh mục" : "Thêm danh mục"}</h3>
          <div className="field">
            <label>Tên danh mục *</label>
            <input className="input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          </div>
          <div className="field">
            <label>Mô tả</label>
            <textarea className="input" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <div className="field">
            <label style={{ fontWeight: 400, display: "flex", gap: 8 }}>
              <input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} />
              <span>Đang hoạt động (hiển thị cho người dùng chọn)</span>
            </label>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn--primary btn--small" onClick={handleSave}>Lưu danh mục</button>
            <button className="btn btn--ghost btn--small" onClick={() => setEditing(null)}>Hủy</button>
          </div>
        </div>
      )}

      <div className="filters">
        <input
          className="input"
          placeholder="Tìm theo tên danh mục…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Tìm kiếm danh mục"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><p>Không tìm thấy danh mục nào.</p></div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Hướng dẫn</th>
                <th>Cập nhật</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td style={{ maxWidth: 300 }}>{c.description}</td>
                  <td>
                    <span className={"badge " + (c.active ? "badge--approved" : "badge--neutral")}>
                      {c.active ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </td>
                  <td>{guideCounts[c.id] || 0}</td>
                  <td>{c.updatedAt}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button className="btn btn--ghost btn--small" onClick={() => setEditing({ ...c })}>Sửa</button>
                      <button className="btn btn--ghost btn--small" onClick={() => handleToggle(c)}>
                        {c.active ? "Ẩn" : "Kích hoạt"}
                      </button>
                      <button className="btn btn--ghost btn--small" onClick={() => handleDelete(c)}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="hint" style={{ color: "var(--ink-soft)", fontSize: "0.85rem", marginTop: 10 }}>
        Danh mục đang được hướng dẫn hoặc lượt chẩn đoán sử dụng sẽ không xóa
        được — hãy chuyển sang trạng thái Không hoạt động.
      </p>
    </>
  );
}
