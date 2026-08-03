// Lớp dữ liệu phía client cho MVP frontend.
// Toàn bộ đọc/ghi đều qua localStorage; khi có backend thật chỉ cần
// thay các hàm ở đây bằng lời gọi API, các trang không phải sửa nhiều.

import { SEED_USERS, SEED_CATEGORIES, SEED_GUIDES, SEED_DIAGNOSES } from "./mock-data";

const KEYS = {
  users: "tsa_users",
  session: "tsa_session",
  categories: "tsa_categories",
  guides: "tsa_guides",
  diagnoses: "tsa_diagnoses",
};

function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function seedIfEmpty() {
  if (typeof window === "undefined") return;
  if (!window.localStorage.getItem(KEYS.users)) write(KEYS.users, SEED_USERS);
  if (!window.localStorage.getItem(KEYS.categories)) write(KEYS.categories, SEED_CATEGORIES);
  if (!window.localStorage.getItem(KEYS.guides)) write(KEYS.guides, SEED_GUIDES);
  if (!window.localStorage.getItem(KEYS.diagnoses)) write(KEYS.diagnoses, SEED_DIAGNOSES);
}

/* ---------- Xác thực ---------- */

export function getSession() {
  return read(KEYS.session, null);
}

export function login(email, password) {
  seedIfEmpty();
  const users = read(KEYS.users, []);
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || user.password !== password) {
    return { ok: false, error: "Sai email hoặc mật khẩu." };
  }
  const session = { userId: user.id, name: user.name, email: user.email, role: user.role };
  write(KEYS.session, session);
  return { ok: true, session };
}

export function register({ name, email, password }) {
  seedIfEmpty();
  const users = read(KEYS.users, []);
  if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
    return { ok: false, error: "Email này đã được sử dụng." };
  }
  const user = {
    id: "u-" + Date.now().toString(36),
    name: name.trim(),
    email: email.trim(),
    password,
    role: "user",
  };
  users.push(user);
  write(KEYS.users, users);
  const session = { userId: user.id, name: user.name, email: user.email, role: user.role };
  write(KEYS.session, session);
  return { ok: true, session };
}

export function logout() {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEYS.session);
}

export function updateProfile({ name }) {
  const session = getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập." };
  const users = read(KEYS.users, []);
  const user = users.find((u) => u.id === session.userId);
  if (!user) return { ok: false, error: "Không tìm thấy tài khoản." };
  user.name = name.trim();
  write(KEYS.users, users);
  write(KEYS.session, { ...session, name: user.name });
  return { ok: true };
}

export function changePassword({ current, next }) {
  const session = getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập." };
  const users = read(KEYS.users, []);
  const user = users.find((u) => u.id === session.userId);
  if (!user) return { ok: false, error: "Không tìm thấy tài khoản." };
  if (user.password !== current) return { ok: false, error: "Mật khẩu hiện tại không đúng." };
  user.password = next;
  write(KEYS.users, users);
  return { ok: true };
}

/* ---------- Danh mục thiết bị ---------- */

export function getCategories({ activeOnly = false } = {}) {
  seedIfEmpty();
  const list = read(KEYS.categories, []);
  return activeOnly ? list.filter((c) => c.active) : list;
}

export function saveCategory(cat) {
  const list = read(KEYS.categories, []);
  const idx = list.findIndex((c) => c.id === cat.id);
  const item = { ...cat, updatedAt: new Date().toISOString().slice(0, 10) };
  if (idx >= 0) list[idx] = { ...list[idx], ...item };
  else list.push({ guideCount: 0, active: true, ...item, id: "cat-" + Date.now().toString(36) });
  write(KEYS.categories, list);
  return { ok: true };
}

export function deleteCategory(id) {
  const guides = read(KEYS.guides, []);
  const diagnoses = read(KEYS.diagnoses, []);
  if (guides.some((g) => g.categoryId === id) || diagnoses.some((d) => d.categoryId === id)) {
    return { ok: false, error: "Danh mục đang được hướng dẫn hoặc lượt chẩn đoán sử dụng. Hãy chuyển sang trạng thái Không hoạt động thay vì xóa." };
  }
  write(KEYS.categories, read(KEYS.categories, []).filter((c) => c.id !== id));
  return { ok: true };
}

/* ---------- Kho hướng dẫn ---------- */

export function getGuides() {
  seedIfEmpty();
  return read(KEYS.guides, []);
}

export function saveGuide(guide) {
  const list = read(KEYS.guides, []);
  const idx = list.findIndex((g) => g.id === guide.id);
  const item = { ...guide, updatedAt: new Date().toISOString().slice(0, 10) };
  if (item.status === "approved" && !item.source?.trim()) {
    return { ok: false, error: "Nguồn tài liệu không được để trống khi duyệt hướng dẫn." };
  }
  if (idx >= 0) list[idx] = { ...list[idx], ...item };
  else list.push({ ...item, id: "g-" + Date.now().toString(36) });
  write(KEYS.guides, list);
  return { ok: true };
}

/* ---------- Chẩn đoán ---------- */

export function getDiagnoses({ userId = null } = {}) {
  seedIfEmpty();
  const list = read(KEYS.diagnoses, []);
  const filtered = userId ? list.filter((d) => d.userId === userId) : list;
  return [...filtered].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getDiagnosis(id) {
  seedIfEmpty();
  return read(KEYS.diagnoses, []).find((d) => d.id === id) || null;
}

export function saveFeedback(id, feedback, note) {
  const list = read(KEYS.diagnoses, []);
  const item = list.find((d) => d.id === id);
  if (!item) return { ok: false, error: "Không tìm thấy lượt chẩn đoán." };
  item.feedback = feedback;
  item.feedbackNote = note || "";
  write(KEYS.diagnoses, list);
  return { ok: true };
}

/* ---------- "AI" giả lập (rule-based) ----------
   Mô phỏng backend: chọn hướng dẫn đã duyệt khớp nhất với triệu chứng,
   trả về kết quả có cấu trúc. Khi có backend thật, thay hàm này bằng
   fetch() đến API chẩn đoán. */

const HIGH_RISK_WORDS = ["khét", "khói", "cháy", "tia lửa", "rò điện", "tê tay", "giật", "nổ", "chảy nhựa", "hở điện"];

export function analyze({ userId, categoryId, brand, model, startedWhen, tried, symptoms, images }) {
  const guides = getGuides().filter((g) => g.status === "approved" && g.categoryId === categoryId);
  const text = symptoms.toLowerCase();

  // Chấm điểm hướng dẫn theo số từ khóa trùng với triệu chứng.
  let best = null;
  let bestScore = 0;
  for (const g of guides) {
    const words = (g.symptoms + " " + g.title).toLowerCase().split(/[\s,\.]+/).filter((w) => w.length >= 3);
    const score = words.reduce((s, w) => (text.includes(w) ? s + 1 : s), 0);
    if (score > bestScore) {
      best = g;
      bestScore = score;
    }
  }

  const mentionsDanger = HIGH_RISK_WORDS.some((w) => text.includes(w));

  if (!best && !mentionsDanger) {
    return { ok: false, error: "not_found" }; // Không tìm thấy tài liệu phù hợp
  }

  // Ưu tiên an toàn: nếu người dùng mô tả dấu hiệu nguy hiểm, nâng mức rủi ro lên Cao.
  const risk = mentionsDanger ? "high" : best.risk;
  const base = best || guides.find((g) => g.risk === "high") || guides[0];

  const result = {
    summary: mentionsDanger
      ? "Mô tả của bạn có dấu hiệu nguy hiểm về điện hoặc nhiệt. Hệ thống ưu tiên cảnh báo an toàn thay vì hướng dẫn tự sửa."
      : base.symptoms + " Kết quả dựa trên hướng dẫn gần nhất trong kho tài liệu đã duyệt.",
    causes: base ? base.causes : ["Chưa đủ dữ liệu để xác định nguyên nhân."],
    risk,
    steps:
      risk === "high"
        ? ["Ngắt nguồn điện ngay lập tức và rút phích cắm.", "Không bật lại thiết bị để thử.", "Để thiết bị ở nơi khô ráo, xa vật dễ cháy."]
        : base.steps,
    stopSigns: Array.from(new Set([...(base?.stopSigns || []), "Mùi khét", "Tia lửa", "Dây điện hở"])),
    recommendation:
      risk === "high"
        ? "Không nên tự sửa. Liên hệ kỹ thuật viên hoặc mang đến cửa hàng sửa chữa."
        : base.recommendation,
    sources: base?.source ? [base.source] : [],
  };

  const record = {
    id: "d-" + Date.now().toString(36),
    userId,
    categoryId,
    brand: brand.trim(),
    model: model.trim(),
    startedWhen: startedWhen.trim(),
    tried: tried.trim(),
    symptoms: symptoms.trim(),
    images: images.map((f) => ({ name: f.name, size: f.size })),
    createdAt: new Date().toISOString(),
    result,
    feedback: "none",
    feedbackNote: "",
  };

  const list = read(KEYS.diagnoses, []);
  list.push(record);
  write(KEYS.diagnoses, list);
  return { ok: true, id: record.id };
}
