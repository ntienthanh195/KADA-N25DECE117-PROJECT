"use client";

// Trang kết quả chẩn đoán chi tiết:
// sơ đồ khoanh vùng lỗi, checklist từng bước có tích chọn, dụng cụ & chi phí
// ước tính, xuất PDF (in trang) và chia sẻ tóm tắt cho thợ sửa.

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiskBadge } from "@/components/chrome";
import { getSession, getDiagnosis, getCategories, saveFeedback } from "@/lib/store";
import { FEEDBACK_LABEL } from "@/lib/mock-data";
import { schematicFor } from "@/components/device-schematics";
import {
  IconClipboard, IconChat, IconGauge, IconSteps, IconStop, IconBook,
  IconShield, IconUser, IconWrench, IconCheck,
} from "@/components/icons";

// Vùng khoanh lỗi + dụng cụ/chi phí ước tính theo danh mục (mock).
const ZONES = {
  "cat-fan": { x: 40, y: 42, w: 20, h: 22, label: "Khu vực động cơ / tụ điện" },
  "cat-ricecooker": { x: 32, y: 70, w: 36, h: 16, label: "Mâm nhiệt / rơ-le" },
  default: { x: 34, y: 40, w: 32, h: 30, label: "Khu vực nghi lỗi" },
};

const TOOLKITS = {
  "cat-fan": {
    tools: ["Tuốc nơ vít 4 cạnh", "Dầu tra trục chuyên dụng", "Khăn khô sạch", "Bút thử điện"],
    parts: [
      { name: "Tụ điện quạt 1.5–2.5µF", price: "15.000 – 35.000đ" },
      { name: "Dầu tra trục (chai nhỏ)", price: "20.000 – 40.000đ" },
    ],
    total: "35.000 – 75.000đ",
  },
  "cat-ricecooker": {
    tools: ["Tuốc nơ vít 4 cạnh", "Khăn khô sạch", "Bút thử điện"],
    parts: [
      { name: "Rơ-le nhiệt nồi cơm", price: "25.000 – 60.000đ" },
      { name: "Dây nguồn thay thế", price: "30.000 – 50.000đ" },
    ],
    total: "25.000 – 110.000đ",
  },
  default: {
    tools: ["Tuốc nơ vít", "Bút thử điện", "Khăn khô sạch"],
    parts: [{ name: "Linh kiện tùy chẩn đoán của kỹ thuật viên", price: "Liên hệ" }],
    total: "Tùy tình trạng",
  },
};

export default function DiagnosisDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(undefined);
  const [catMap, setCatMap] = useState({});
  const [feedback, setFeedback] = useState("none");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [denied, setDenied] = useState(false);
  const [done, setDone] = useState([]); // index các bước đã tích
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const session = getSession();
    const d = getDiagnosis(id);
    if (d && session && d.userId !== session.userId && session.role !== "admin") {
      setDenied(true);
      return;
    }
    setItem(d || null);
    if (d) {
      setFeedback(d.feedback);
      setNote(d.feedbackNote || "");
      try {
        const raw = window.localStorage.getItem("tsa_check_" + d.id);
        if (raw) setDone(JSON.parse(raw));
      } catch {}
    }
    setCatMap(Object.fromEntries(getCategories().map((c) => [c.id, c.name])));
  }, [id]);

  if (denied)
    return (
      <div className="empty">
        <h3>Bạn không có quyền xem kết quả này</h3>
        <p>Mỗi người dùng chỉ xem được các lượt chẩn đoán thuộc tài khoản của mình.</p>
        <Link className="btn btn--primary" href="/app/dashboard">Về tổng quan</Link>
      </div>
    );
  if (item === undefined) return null;
  if (item === null)
    return (
      <div className="empty">
        <h3>Không tìm thấy lượt chẩn đoán</h3>
        <Link className="btn btn--primary" href="/app/history">Về lịch sử</Link>
      </div>
    );

  const r = item.result;
  const isHigh = r.risk === "high";
  const Schematic = schematicFor(item.categoryId);
  const zone = ZONES[item.categoryId] || ZONES.default;
  const kit = TOOLKITS[item.categoryId] || TOOLKITS.default;

  function toggleStep(i) {
    if (isHigh) return; // mức Cao: không có checklist tự sửa
    const next = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    setDone(next);
    try {
      window.localStorage.setItem("tsa_check_" + item.id, JSON.stringify(next));
    } catch {}
  }

  function handleFeedback(value) {
    setFeedback(value);
    saveFeedback(item.id, value, note);
    setSaved(true);
  }

  function exportPdf() {
    window.print();
  }

  async function shareToTech() {
    const summary = [
      `[Trợ Sửa AI] Kết quả kiểm tra ban đầu #${item.id}`,
      `Thiết bị: ${catMap[item.categoryId] || item.categoryId} ${item.brand} ${item.model}`.trim(),
      `Triệu chứng: ${item.symptoms}`,
      `Mức nguy hiểm: ${r.risk === "high" ? "Cao" : r.risk === "medium" ? "Trung bình" : "Thấp"}`,
      `Nguyên nhân có thể: ${r.causes.join("; ")}`,
      `Khuyến nghị: ${r.recommendation}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {}
  }

  const progress = r.steps.length ? Math.round((done.length / r.steps.length) * 100) : 0;

  return (
    <>
      <p style={{ fontSize: "0.9rem" }} className="no-print">
        <Link href="/app/history">← Lịch sử</Link>
      </p>
      <div className="shell-topbar">
        <h1 style={{ fontSize: "1.5rem" }}>Kết quả kiểm tra ban đầu</h1>
        <RiskBadge risk={r.risk} />
      </div>

      {/* Cảnh báo theo mức an toàn */}
      {isHigh ? (
        <div className="alert alert--error">
          <strong>Nguy hiểm — dừng thao tác.</strong> Phát hiện dấu hiệu có thể
          gây nguy hiểm. Hãy dừng sử dụng thiết bị và liên hệ kỹ thuật viên.
          Không tiếp tục tháo hoặc cấp nguồn cho thiết bị.
        </div>
      ) : r.risk === "medium" ? (
        <div className="alert alert--warn">
          <strong>Cần thận trọng.</strong> Chỉ thực hiện các bước bên dưới sau
          khi đã ngắt hoàn toàn nguồn điện và hiểu rõ thao tác.
        </div>
      ) : (
        <div className="alert alert--ok">
          <strong>Nguy cơ thấp.</strong> Bạn có thể thực hiện các bước kiểm tra
          cơ bản bên dưới sau khi đã ngắt nguồn điện.
        </div>
      )}

      {/* Nút hành động */}
      <div className="action-row no-print">
        <button className="btn btn--ghost btn--small" onClick={exportPdf}>
          ⬇ Xuất file PDF
        </button>
        <button className="btn btn--ghost btn--small" onClick={shareToTech}>
          ↗ Chia sẻ cho thợ sửa
        </button>
        {shared && <span className="badge badge--approved">Đã sao chép tóm tắt</span>}
      </div>

      {/* Sơ đồ khoanh vùng + thông tin yêu cầu */}
      <div className="result-grid">
        <div className="card result-block" style={{ marginBottom: 0 }}>
          <h3><IconGauge /> Sơ đồ khoanh vùng nghi lỗi</h3>
          <div className="schematic" aria-hidden="true">
            <Schematic />
            <span
              className="zone"
              style={{ left: zone.x + "%", top: zone.y + "%", width: zone.w + "%", height: zone.h + "%" }}
            >
              <span className="zone-label">{zone.label}</span>
            </span>
          </div>
          <p className="hint" style={{ color: "var(--ink-soft)", fontSize: "0.82rem", marginTop: 8, marginBottom: 0 }}>
            Sơ đồ minh họa dựa trên nguyên nhân thường gặp — vị trí thực tế có thể khác theo model.
          </p>
        </div>

        <div className="card result-block" style={{ marginBottom: 0 }}>
          <h3><IconClipboard /> Thông tin yêu cầu</h3>
          <dl className="kv">
            <dt>Loại thiết bị</dt>
            <dd>{catMap[item.categoryId] || item.categoryId}</dd>
            {(item.brand || item.model) && (
              <>
                <dt>Hãng / Model</dt>
                <dd>{[item.brand, item.model].filter(Boolean).join(" ")}</dd>
              </>
            )}
            <dt>Triệu chứng</dt>
            <dd>{item.symptoms}</dd>
            {item.startedWhen && (<><dt>Bắt đầu từ</dt><dd>{item.startedWhen}</dd></>)}
            {item.tried && (<><dt>Đã thử</dt><dd>{item.tried}</dd></>)}
            <dt>Ảnh đính kèm</dt>
            <dd>{item.images.length > 0 ? item.images.map((im) => im.name).join(", ") : "Không có"}</dd>
            <dt>Thời gian</dt>
            <dd>{new Date(item.createdAt).toLocaleString("vi-VN")}</dd>
          </dl>
        </div>
      </div>

      <div className="card result-block">
        <h3><IconChat /> Tóm tắt sự cố</h3>
        <p style={{ marginBottom: 0 }}>{r.summary}</p>
      </div>

      <div className="card result-block">
        <h3><IconGauge /> Nguyên nhân có thể xảy ra</h3>
        <ul className="safety-list">
          {r.causes.map((c, i) => (<li key={i}>{c}</li>))}
        </ul>
        <p className="hint" style={{ color: "var(--ink-soft)", fontSize: "0.85rem", marginBottom: 0 }}>
          Danh sách xếp theo mức độ thường gặp, chưa phải kết luận chính xác.
        </p>
      </div>

      {/* Cảnh báo dừng — luôn đứng trước các bước xử lý */}
      <div className="card result-block" style={{ padding: 0, overflow: "hidden" }}>
        <div className={"hazard" + (isHigh ? " hazard--danger" : "")} />
        <div style={{ padding: 20 }}>
          <h3><IconStop /> Dấu hiệu phải dừng ngay</h3>
          <ul className="safety-list" style={{ marginBottom: 0 }}>
            {r.stopSigns.map((s, i) => (<li key={i}>{s}</li>))}
          </ul>
        </div>
      </div>

      {/* Checklist các bước */}
      <div className="card result-block">
        <h3><IconSteps /> Các bước kiểm tra an toàn</h3>
        {isHigh ? (
          <>
            <div className="alert alert--error">
              Mức <strong>Nguy hiểm</strong> — hệ thống không hiển thị hướng dẫn
              tự sửa chi tiết. Chỉ thực hiện các bước ngắt nguồn dưới đây.
            </div>
            <ol className="safety-list" style={{ marginBottom: 0 }}>
              {r.steps.map((s, i) => (<li key={i}>{s}</li>))}
            </ol>
          </>
        ) : (
          <>
            <div className="check-progress" aria-hidden="true"><i style={{ width: progress + "%" }} /></div>
            <p className="hint" style={{ color: "var(--ink-soft)", marginTop: -8 }}>
              Đã hoàn thành {done.length}/{r.steps.length} bước ({progress}%) — tích vào từng bước khi làm xong.
            </p>
            <div className="checklist">
              {r.steps.map((s, i) => (
                <div
                  key={i}
                  className={"check-item" + (done.includes(i) ? " done" : "")}
                  onClick={() => toggleStep(i)}
                  role="checkbox"
                  aria-checked={done.includes(i)}
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), toggleStep(i))}
                >
                  <span className="check-box"><IconCheck width={14} height={14} /></span>
                  <span className="ck-text"><strong>Bước {i + 1}.</strong> {s}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Dụng cụ & chi phí */}
      {!isHigh && (
        <div className="result-grid">
          <div className="card result-block" style={{ marginBottom: 0 }}>
            <h3><IconWrench /> Dụng cụ cần chuẩn bị</h3>
            <ul className="safety-list" style={{ marginBottom: 0 }}>
              {kit.tools.map((t) => (<li key={t}>{t}</li>))}
            </ul>
          </div>
          <div className="card result-block" style={{ marginBottom: 0 }}>
            <h3><IconBook /> Chi phí linh kiện ước tính</h3>
            <div className="tool-list">
              {kit.parts.map((p) => (
                <div key={p.name} className="tool-row">
                  <span>{p.name}</span>
                  <span className="price">{p.price}</span>
                </div>
              ))}
            </div>
            <div className="tool-total">
              <span>Tổng ước tính</span>
              <span className="price">{kit.total}</span>
            </div>
            <p className="hint" style={{ color: "var(--ink-soft)", fontSize: "0.82rem", marginBottom: 0 }}>
              Giá tham khảo thị trường, có thể thay đổi theo khu vực và model.
            </p>
          </div>
        </div>
      )}

      <div className="card result-block">
        <h3><IconShield /> Khuyến nghị</h3>
        <p style={{ marginBottom: 0 }}>{r.recommendation}</p>
      </div>

      <div className="card result-block">
        <h3><IconBook /> Nguồn tham khảo</h3>
        {r.sources.length > 0 ? (
          <ul className="safety-list" style={{ marginBottom: 0 }}>
            {r.sources.map((s, i) => (<li key={i}>{s}</li>))}
          </ul>
        ) : (
          <p style={{ color: "var(--ink-soft)", marginBottom: 0 }}>
            Kết quả này chưa gắn với tài liệu cụ thể trong kho hướng dẫn.
          </p>
        )}
      </div>

      {/* Phản hồi */}
      <div className="card result-block no-print">
        <h3><IconUser /> Hướng dẫn này có giúp bạn xử lý sự cố không?</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {["solved", "unsolved", "untried"].map((v) => (
            <button
              key={v}
              className={"btn btn--small " + (feedback === v ? "btn--primary" : "btn--ghost")}
              onClick={() => handleFeedback(v)}
            >
              {FEEDBACK_LABEL[v]}
            </button>
          ))}
        </div>
        <div className="field" style={{ marginBottom: 8 }}>
          <label htmlFor="note">Ghi chú (không bắt buộc)</label>
          <input
            id="note"
            className="input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={() => { saveFeedback(item.id, feedback, note); setSaved(true); }}
            placeholder="Ví dụ: Tra dầu xong quạt chạy lại bình thường."
          />
        </div>
        {saved && <div className="alert alert--ok">Đã lưu phản hồi. Cảm ơn bạn!</div>}
      </div>
    </>
  );
}
