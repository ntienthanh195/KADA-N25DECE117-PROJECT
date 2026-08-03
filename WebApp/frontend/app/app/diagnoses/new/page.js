"use client";

// Wizard chẩn đoán 3 bước:
// 1) Chọn thiết bị + tải ảnh  2) Mô tả triệu chứng  3) AI Processing (radar)
// Xong bước 3 tự chuyển sang trang kết quả chi tiết.

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getSession, getCategories, analyze } from "@/lib/store";
import { IconFan, IconPot, IconKettle, IconCamera, IconCheck } from "@/components/icons";

const MAX_IMAGES = 3;
const MAX_IMAGE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MIN_SYMPTOM = 20;
const MAX_SYMPTOM = 1500;

const CAT_ICON = { "cat-fan": IconFan, "cat-ricecooker": IconPot, "cat-kettle": IconKettle };

const SYMPTOM_TAGS = {
  "cat-fan": ["không quay, có tiếng ù", "quay yếu hơn bình thường", "có mùi khét khi chạy", "kêu lạch cạch lớn"],
  "cat-ricecooker": ["nhảy nút sớm, cơm sống", "không vào điện, đèn không sáng", "cơm bị khê đáy", "vỏ nồi tê tê khi chạm"],
  default: ["không hoạt động", "có mùi khét", "kêu to bất thường", "chập chờn lúc được lúc không"],
};

const PROC_STEPS = [
  "Tiếp nhận mô tả triệu chứng",
  "Phân tích ảnh thiết bị",
  "Kiểm tra tụ điện & nguồn cấp",
  "Kiểm tra bộ phận cơ khí & nhiệt",
  "Đối chiếu kho hướng dẫn đã duyệt",
  "Đánh giá mức độ an toàn",
  "Tổng hợp các bước kiểm tra",
];

export default function NewDiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryId: "",
    brand: "",
    model: "",
    startedWhen: "",
    tried: "",
    symptoms: "",
    confirmed: false,
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | processing | not_found | error
  const [procDone, setProcDone] = useState(0);
  const [listening, setListening] = useState(false);
  const [drag, setDrag] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    setCategories(getCategories({ activeOnly: true }));
    try {
      const draft = window.localStorage.getItem("tsa_draft_symptom");
      if (draft) {
        setForm((f) => ({ ...f, symptoms: draft }));
        window.localStorage.removeItem("tsa_draft_symptom");
      }
    } catch {}
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  /* ---------- Ảnh ---------- */
  function handleImages(fileList) {
    const files = Array.from(fileList || []);
    const next = [...images];
    for (const f of files) {
      if (next.length >= MAX_IMAGES) break;
      if (!ALLOWED_TYPES.includes(f.type)) {
        setErrors((e) => ({ ...e, images: "Chỉ chấp nhận ảnh JPG, PNG hoặc WebP." }));
        continue;
      }
      if (f.size > MAX_IMAGE_MB * 1024 * 1024) {
        setErrors((e) => ({ ...e, images: `Mỗi ảnh tối đa ${MAX_IMAGE_MB}MB.` }));
        continue;
      }
      next.push(f);
      setErrors((e) => ({ ...e, images: undefined }));
    }
    setImages(next);
  }

  /* ---------- Mic giả lập ---------- */
  function toggleMic() {
    if (listening) return;
    setListening(true);
    const sample =
      (SYMPTOM_TAGS[form.categoryId] || SYMPTOM_TAGS.default)[0] +
      ", bắt đầu từ hôm qua, đã thử cắm sang ổ điện khác";
    let i = 0;
    const timer = setInterval(() => {
      i += 2;
      setForm((f) => ({ ...f, symptoms: sample.slice(0, i) }));
      if (i >= sample.length) {
        clearInterval(timer);
        setListening(false);
      }
    }, 45);
  }

  /* ---------- Điều hướng bước ---------- */
  function validateStep1() {
    const e = {};
    if (!form.categoryId) e.categoryId = "Vui lòng chọn loại thiết bị.";
    setErrors(e);
    return !e.categoryId;
  }

  function validateStep2() {
    const e = {};
    if (form.symptoms.trim().length < MIN_SYMPTOM)
      e.symptoms = `Mô tả triệu chứng cần tối thiểu ${MIN_SYMPTOM} ký tự để AI có đủ dữ liệu.`;
    if (form.symptoms.length > MAX_SYMPTOM) e.symptoms = `Mô tả quá dài, tối đa ${MAX_SYMPTOM} ký tự.`;
    if (!form.confirmed) e.confirmed = "Bạn cần xác nhận đã đọc cảnh báo an toàn.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* ---------- Bước 3: AI Processing ---------- */
  function startProcessing() {
    if (!validateStep2()) return;
    setStep(3);
    setStatus("processing");
    setProcDone(0);

    // Hiện lần lượt các dòng log
    PROC_STEPS.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setProcDone(i + 1), 620 * (i + 1)));
    });

    // Kết thúc: gọi mock AI rồi chuyển trang
    timersRef.current.push(
      setTimeout(() => {
        try {
          const session = getSession();
          const res = analyze({ userId: session.userId, ...form, images });
          if (!res.ok) {
            setStatus(res.error === "not_found" ? "not_found" : "error");
            setStep(2);
            return;
          }
          router.push(`/app/diagnoses/${res.id}`);
        } catch {
          setStatus("error");
          setStep(2);
        }
      }, 620 * PROC_STEPS.length + 700)
    );
  }

  const tags = SYMPTOM_TAGS[form.categoryId] || SYMPTOM_TAGS.default;

  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Thiết bị của bạn đang gặp vấn đề gì?</h1>

      {/* Thanh tiến trình wizard */}
      <div className="wizard-bar" aria-label={`Bước ${step} trên 3`}>
        {[
          [1, "Thiết bị & ảnh"],
          [2, "Mô tả sự cố"],
          [3, "AI phân tích"],
        ].map(([n, label], i) => (
          <span key={n} style={{ display: "contents" }}>
            {i > 0 && <span className={"wz-line" + (step > i ? " done" : "")} />}
            <span className={"wz-step" + (step === n ? " now" : step > n ? " done" : "")}>
              <b>{step > n ? "✓" : n}</b>
              <span>{label}</span>
            </span>
          </span>
        ))}
      </div>

      {status === "not_found" && (
        <div className="alert alert--warn">
          Hệ thống chưa có đủ thông tin để đưa ra hướng dẫn phù hợp. Hãy bổ sung
          mô tả hoặc hình ảnh rõ hơn (âm thanh, mùi, đèn báo, thời điểm xảy ra).
        </div>
      )}
      {status === "error" && step !== 3 && (
        <div className="alert alert--error">
          Hệ thống chưa thể đưa ra kết quả cho yêu cầu này. Bạn có thể thử lại sau ít phút.
        </div>
      )}

      {/* ===== BƯỚC 1 ===== */}
      {step === 1 && (
        <>
          <div className="card">
            <h3>Chọn loại thiết bị *</h3>
            <div className="device-pick">
              {categories.map((c) => {
                const Icon = CAT_ICON[c.id] || IconFan;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={"dp" + (form.categoryId === c.id ? " active" : "")}
                    onClick={() => set("categoryId", c.id)}
                  >
                    <Icon />
                    {c.name}
                  </button>
                );
              })}
            </div>
            {errors.categoryId && <p className="error-text" style={{ marginTop: 10 }}>{errors.categoryId}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="brand">Hãng sản xuất</label>
                <input id="brand" className="input" value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Senko, Sharp, Sunhouse…" />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="model">Model thiết bị</label>
                <input id="model" className="input" value={form.model} onChange={(e) => set("model", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Tải ảnh / video triệu chứng</h3>
            <label
              className={"dropzone" + (drag ? " drag" : "")}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); handleImages(e.dataTransfer.files); }}
            >
              <IconCamera width={28} height={28} />
              <div><strong style={{ color: "var(--ink)" }}>Kéo thả ảnh vào đây</strong> hoặc bấm để chọn</div>
              <div style={{ fontSize: "0.84rem" }}>
                Tối đa {MAX_IMAGES} ảnh JPG/PNG/WebP, mỗi ảnh ≤ {MAX_IMAGE_MB}MB · Video: ngoài phạm vi MVP
              </div>
              <input type="file" accept={ALLOWED_TYPES.join(",")} multiple onChange={(e) => handleImages(e.target.files)} disabled={images.length >= MAX_IMAGES} />
            </label>
            {errors.images && <p className="error-text">{errors.images}</p>}
            {images.length > 0 && (
              <ul style={{ margin: "12px 0 0", paddingLeft: 20, fontSize: "0.9rem" }}>
                {images.map((f, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {f.name} ({Math.round(f.size / 1024)} KB){" "}
                    <button className="btn btn--ghost btn--small" onClick={() => setImages(images.filter((_, j) => j !== i))}>Gỡ</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ marginTop: 18 }}>
            <button className="btn btn--primary" onClick={() => validateStep1() && setStep(2)}>
              Tiếp tục → Mô tả sự cố
            </button>
          </div>
        </>
      )}

      {/* ===== BƯỚC 2 ===== */}
      {step === 2 && (
        <>
          <div className="card">
            <h3>Mô tả sự cố *</h3>
            <div className="sym-tags">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="quick-tag"
                  onClick={() => set("symptoms", (form.symptoms ? form.symptoms.trim() + ". " : "") + "Thiết bị " + t)}
                >
                  + {t}
                </button>
              ))}
            </div>
            <div className={"field" + (errors.symptoms ? " field--error" : "")} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <textarea
                  id="symptoms"
                  className="input"
                  value={form.symptoms}
                  onChange={(e) => set("symptoms", e.target.value)}
                  placeholder="Ví dụ: Bật số 1 quạt không quay, nghe tiếng ù nhẹ, thân quạt hơi ấm…"
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
              </div>
              <p className="hint">{form.symptoms.length}/{MAX_SYMPTOM} ký tự · tối thiểu {MIN_SYMPTOM}.</p>
              {errors.symptoms && <p className="error-text">{errors.symptoms}</p>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="started">Bắt đầu xảy ra từ khi nào?</label>
                <input id="started" className="input" value={form.startedWhen} onChange={(e) => set("startedWhen", e.target.value)} placeholder="Từ sáng nay, 3 ngày trước…" />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="tried">Bạn đã thử những gì?</label>
                <input id="tried" className="input" value={form.tried} onChange={(e) => set("tried", e.target.value)} placeholder="Cắm ổ khác, vệ sinh…" />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="hazard" />
            <div style={{ padding: 20 }}>
              <h3>Cảnh báo an toàn</h3>
              <ul className="safety-list" style={{ color: "var(--ink-soft)" }}>
                <li>Rút phích cắm khỏi ổ điện trước khi chạm vào thiết bị.</li>
                <li>Không tự tháo thiết bị khi còn nghi ngờ rò điện.</li>
                <li>Dừng ngay khi có mùi khét, tia lửa hoặc thiết bị quá nóng.</li>
              </ul>
              <div className={"field" + (errors.confirmed ? " field--error" : "")} style={{ marginBottom: 0 }}>
                <label style={{ fontWeight: 400, display: "flex", gap: 8 }}>
                  <input type="checkbox" checked={form.confirmed} onChange={(e) => set("confirmed", e.target.checked)} />
                  <span>Tôi đã đọc và hiểu các cảnh báo an toàn ở trên. *</span>
                </label>
                {errors.confirmed && <p className="error-text">{errors.confirmed}</p>}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn--ghost" onClick={() => setStep(1)}>← Quay lại</button>
            <button className="btn btn--primary" onClick={startProcessing}>Phân tích sự cố</button>
          </div>
        </>
      )}

      {/* ===== BƯỚC 3: AI PROCESSING ===== */}
      {step === 3 && (
        <div className="card">
          <div className="processing">
            <div className="radar" aria-hidden="true">
              <span className="sweep" />
              <span className="blip" style={{ top: "28%", left: "62%" }} />
              <span className="blip" style={{ top: "58%", left: "30%", animationDelay: "0.7s" }} />
              <span className="blip" style={{ top: "70%", left: "66%", animationDelay: "1.3s" }} />
            </div>
            <div className="proc-logs" role="status" aria-label="AI đang phân tích">
              {PROC_STEPS.map((label, i) => (
                <div key={label} className="proc-line" style={{ animationDelay: `${0.62 * i}s` }}>
                  <span>→ {label}…</span>
                  {procDone > i ? <span className="ok">✓</span> : procDone === i ? <span className="run" /> : null}
                </div>
              ))}
            </div>
            <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", marginTop: 18 }}>
              Đang đối chiếu triệu chứng với kho hướng dẫn…
            </p>
          </div>
        </div>
      )}
    </>
  );
}
