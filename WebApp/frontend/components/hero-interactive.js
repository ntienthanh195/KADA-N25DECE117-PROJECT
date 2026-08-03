"use client";

// Hero tương tác của landing page:
// - Input nhập triệu chứng nhanh + quick-tag chips
// - AI Visual Scanner: khung camera quét thiết bị (SVG kiểu blueprint X-ray),
//   hotspot nhấp nháy chỉ bộ phận nghi lỗi kèm % rủi ro (mô phỏng minh họa).
// Bấm quick-tag → scanner đổi thiết bị + dữ liệu ngay lập tức.

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSession } from "@/lib/store";
import { IconSend, IconSpark, IconShield, IconStar, IconCamera } from "./icons";
import { FanSvg, RiceCookerSvg, StoveSvg, WasherSvg } from "./device-schematics";

const DRAFT_KEY = "tsa_draft_symptom";

/* ---------- Kịch bản quét theo từng quick-tag ---------- */

const SCENARIOS = [
  {
    id: "fan",
    chip: "🌀 Quạt không quay",
    device: "Quạt điện đứng",
    symptom: "Không quay, có tiếng ù nhẹ khi bật",
    risk: "medium",
    riskLabel: "Cần thận trọng",
    Svg: FanSvg,
    bbox: { x: 41, y: 40, w: 18, h: 22 },
    hotspots: [
      { x: 48, y: 49, label: "Tụ điện", pct: 85, tone: "hot" },
      { x: 50, y: 33, label: "Trục quay", pct: 62, tone: "warm" },
      { x: 63, y: 24, label: "Cuộn dây", pct: 34, tone: "cool" },
    ],
  },
  {
    id: "rice",
    chip: "🍚 Nồi cơm không nóng",
    device: "Nồi cơm điện",
    symptom: "Đèn sáng nhưng mâm nhiệt không nóng",
    risk: "medium",
    riskLabel: "Cần thận trọng",
    Svg: RiceCookerSvg,
    bbox: { x: 34, y: 72, w: 32, h: 14 },
    hotspots: [
      { x: 50, y: 79, label: "Mâm nhiệt", pct: 78, tone: "hot" },
      { x: 50, y: 61, label: "Rơ-le nhiệt", pct: 55, tone: "warm" },
      { x: 82, y: 82, label: "Dây nguồn", pct: 31, tone: "cool" },
    ],
  },
  {
    id: "stove",
    chip: "⚡ Bếp từ báo lỗi E0",
    device: "Bếp từ đơn",
    symptom: "Màn hình báo E0, không nhận nồi",
    risk: "medium",
    riskLabel: "Cần thận trọng",
    Svg: StoveSvg,
    bbox: { x: 32, y: 38, w: 24, h: 20 },
    hotspots: [
      { x: 43, y: 47, label: "Cảm biến nồi", pct: 81, tone: "hot" },
      { x: 34, y: 62, label: "Bo hiển thị", pct: 44, tone: "warm" },
      { x: 71, y: 71, label: "Quạt tản nhiệt", pct: 28, tone: "cool" },
    ],
  },
  {
    id: "washer",
    chip: "🧺 Máy giặt vắt kêu to",
    device: "Máy giặt cửa trước",
    symptom: "Rung mạnh, kêu to khi vào chế độ vắt",
    risk: "medium",
    riskLabel: "Cần thận trọng",
    Svg: WasherSvg,
    bbox: { x: 34, y: 42, w: 32, h: 40 },
    hotspots: [
      { x: 50, y: 57, label: "Bạc đạn lồng", pct: 83, tone: "hot" },
      { x: 36, y: 82, label: "Giảm chấn", pct: 51, tone: "warm" },
      { x: 66, y: 22, label: "Đối trọng", pct: 39, tone: "cool" },
    ],
  },
];

/* ---------- Component ---------- */

function go(router, text) {
  if (typeof window !== "undefined" && text.trim()) {
    window.localStorage.setItem(DRAFT_KEY, text.trim());
  }
  const session = getSession();
  router.push(session ? "/app/diagnoses/new" : "/register");
}

export default function HeroInteractive() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(SCENARIOS[0]);
  const [listening, setListening] = useState(false);
  const [photo, setPhoto] = useState(null); // ảnh thật người dùng tải lên

  // Giả lập voice-to-text: gõ dần triệu chứng của thiết bị đang chọn.
  function toggleMic() {
    if (listening) return;
    setListening(true);
    const text = active.symptom;
    let i = 0;
    setQ("");
    const timer = setInterval(() => {
      i += 2;
      setQ(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setListening(false);
      }
    }, 45);
  }

  function onPhoto(files) {
    const f = files && files[0];
    if (!f || !f.type.startsWith("image/")) return;
    const url = URL.createObjectURL(f);
    setPhoto((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });
  }

  function pick(sc) {
    setActive(sc);
    setPhoto(null);
    setQ(sc.chip.replace(/^\S+\s/, "") + " — " + sc.symptom.toLowerCase());
  }

  const Svg = active.Svg;

  return (
    <div className="lp-hero-grid">
      {/* ===== Cột trái ===== */}
      <div className="title-wrap">
        <span className="title-glow" aria-hidden="true" />
        <span className="eyebrow fade-up">
          <IconShield width={16} height={16} /> Hiểu lỗi nhanh, xử lý an toàn
        </span>
        <h1 className="fade-up fade-up-1">
          Hiểu sự cố đồ gia dụng{" "}
          <span className="grad">trước khi quyết định sửa.</span>
        </h1>
        <p className="lead fade-up fade-up-2">
          Mô tả triệu chứng, tải hình ảnh và nhận hướng dẫn kiểm tra ban đầu
          theo mức độ an toàn — dựa trên kho hướng dẫn đã kiểm duyệt.
        </p>

        <div className="fade-up fade-up-2">
          <div className="quick-box">
            <IconSpark className="quick-spark" width={19} height={19} />
            <input
              className="quick-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go(router, q)}
              placeholder="Nhập thử triệu chứng: quạt kêu to, nồi cơm nhảy nút sớm…"
              aria-label="Nhập triệu chứng thiết bị"
            />
            <button
              type="button"
              className={"mic-btn" + (listening ? " rec" : "")}
              onClick={toggleMic}
              title="Đọc triệu chứng bằng giọng nói (mô phỏng)"
              aria-label="Nhập bằng giọng nói"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" />
              </svg>
            </button>
            <button className="btn btn--primary quick-btn" onClick={() => go(router, q)}>
              <IconSend width={17} height={17} /> Chẩn đoán ngay
            </button>
          </div>

          <div className="quick-tags" role="group" aria-label="Triệu chứng phổ biến">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                className={"quick-tag" + (active.id === sc.id ? " active" : "")}
                onClick={() => pick(sc)}
              >
                {sc.chip}
              </button>
            ))}
          </div>
        </div>

        <div className="proof-row fade-up fade-up-3">
          <span className="avatar-stack" aria-hidden="true">
            <span className="av" style={{ background: "#4F46E5" }}>T</span>
            <span className="av" style={{ background: "#0891B2" }}>H</span>
            <span className="av" style={{ background: "#B45309" }}>L</span>
            <span className="av" style={{ background: "#7C3AED" }}>M</span>
            <span className="av" style={{ background: "#334155" }}>+</span>
          </span>
          <span className="proof-text">
            <span className="stars" aria-hidden="true">
              <IconStar width={15} height={15} />
              <IconStar width={15} height={15} />
              <IconStar width={15} height={15} />
              <IconStar width={15} height={15} />
              <IconStar width={15} height={15} />
            </span>
            4.9/5 từ 5,000+ kỹ thuật viên &amp; người dùng thử nghiệm
          </span>
        </div>

        <p className="note fade-up fade-up-4">
          Trợ Sửa AI cung cấp thông tin hỗ trợ ban đầu và không thay thế kỹ
          thuật viên chuyên môn.
        </p>
      </div>

      {/* ===== Cột phải: AI Visual Scanner ===== */}
      <div className="scanner-wrap fade-up fade-up-2">
        <span className="scanner-glow" aria-hidden="true" />
        <div className="scanner" key={active.id} aria-hidden="true">
          <div className="scan-top">
            <span className="rec">
              <span className="pulse" /> AI VISUAL SCAN
            </span>
            <span className="scan-mode">CAM 01 · {active.device}</span>
          </div>

          <div className="scan-view">
            <span className="corner c-tl" /><span className="corner c-tr" />
            <span className="corner c-bl" /><span className="corner c-br" />
            <span className="scanline" />

            {photo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={photo} alt="" className="scan-photo" />
            ) : (
              <Svg />
            )}

            <span
              className="bbox"
              style={{
                left: active.bbox.x + "%",
                top: active.bbox.y + "%",
                width: active.bbox.w + "%",
                height: active.bbox.h + "%",
              }}
            />

            {active.hotspots.map((h, i) => (
              <div
                key={h.label}
                className={"hotspot hs-" + h.tone}
                style={{ left: h.x + "%", top: h.y + "%", animationDelay: `${0.5 + i * 0.35}s` }}
              >
                <span className="hs-dot" />
                <span className="hs-tag">
                  {h.label}: <b>{h.pct}%</b> rủi ro
                </span>
              </div>
            ))}

            <span className="sim-note">{photo ? "Ảnh của bạn · AI khoanh vùng mô phỏng" : "Mô phỏng minh họa"}</span>

            <label
              className="scan-upload"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); onPhoto(e.dataTransfer.files); }}
            >
              <IconCamera width={16} height={16} />
              {photo ? "Đổi ảnh khác" : "Tải ảnh thiết bị thật"}
              <input type="file" accept="image/*" onChange={(e) => onPhoto(e.target.files)} />
            </label>
            {photo && (
              <button className="scan-photo-clear" onClick={() => setPhoto(null)} aria-label="Xóa ảnh">×</button>
            )}
          </div>

          <div className="scan-status">
            <span className="st-sym">
              <span className="st-dot" /> {active.symptom}
            </span>
            <span className={"badge badge--" + active.risk}>{active.riskLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
