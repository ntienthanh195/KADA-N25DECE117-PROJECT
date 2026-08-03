// SVG sơ đồ thiết bị kiểu blueprint X-ray — dùng chung cho hero scanner
// và khung sơ đồ hỏng hóc ở trang kết quả chẩn đoán.

/* ---------- SVG thiết bị (phong cách blueprint X-ray) ---------- */

const sv = { viewBox: "0 0 400 300", fill: "none", "aria-hidden": true };
const line = { stroke: "rgba(103,232,249,0.85)", strokeWidth: 2.2, strokeLinecap: "round" };
const soft = { stroke: "rgba(103,232,249,0.38)", strokeWidth: 1.6 };
const glass = { fill: "rgba(103,232,249,0.06)" };

export function FanSvg() {
  return (
    <svg {...sv} className="scan-svg">
      {/* đế và thân */}
      <ellipse cx="200" cy="272" rx="78" ry="14" {...glass} {...soft} />
      <path d="M193 258V150M207 258V150" {...line} />
      <rect x="186" y="252" width="28" height="10" rx="4" {...glass} {...soft} />
      {/* hộp động cơ */}
      <rect x="176" y="128" width="48" height="34" rx="9" {...glass} {...line} />
      {/* lồng quạt */}
      <circle cx="200" cy="98" r="72" {...glass} {...line} />
      <circle cx="200" cy="98" r="56" {...soft} />
      <circle cx="200" cy="98" r="38" {...soft} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <path
            key={i}
            d={`M${200 + 14 * Math.cos(a)} ${98 + 14 * Math.sin(a)} L${200 + 70 * Math.cos(a)} ${98 + 70 * Math.sin(a)}`}
            {...soft}
          />
        );
      })}
      {/* cánh quạt */}
      <path d="M200 98c8-26 2-42-12-46-10-3-18 4-16 14 3 16 16 26 28 32Z" {...glass} {...line} />
      <path d="M200 98c26 8 42 2 46-12 3-10-4-18-14-16-16 3-26 16-32 28Z" {...glass} {...line} />
      <path d="M200 98c-8 26-2 42 12 46 10 3 18-4 16-14-3-16-16-26-28-32Z" {...glass} {...line} />
      <path d="M200 98c-26-8-42-2-46 12-3 10 4 18 14 16 16-3 26-16 32-28Z" {...glass} {...line} />
      <circle cx="200" cy="98" r="11" {...glass} {...line} />
      {/* tụ điện trong hộp động cơ */}
      <rect x="186" y="136" width="12" height="18" rx="3" fill="rgba(245,193,75,0.22)" stroke="rgba(245,193,75,0.9)" strokeWidth="1.8" />
    </svg>
  );
}

export function RiceCookerSvg() {
  return (
    <svg {...sv} className="scan-svg">
      <ellipse cx="200" cy="268" rx="96" ry="13" {...glass} {...soft} />
      {/* thân nồi */}
      <path d="M116 128c0-14 38-24 84-24s84 10 84 24v104c0 16-38 28-84 28s-84-12-84-28V128Z" {...glass} {...line} />
      {/* nắp */}
      <path d="M112 122c0-22 40-36 88-36s88 14 88 36c0 12-40 20-88 20s-88-8-88-20Z" {...glass} {...line} />
      <rect x="182" y="70" width="36" height="14" rx="7" {...glass} {...line} />
      {/* lòng nồi (x-ray) */}
      <path d="M138 138v82c0 10 27 18 62 18s62-8 62-18v-82" {...soft} strokeDasharray="6 6" />
      {/* mâm nhiệt */}
      <ellipse cx="200" cy="238" rx="52" ry="9" fill="rgba(245,193,75,0.18)" stroke="rgba(245,193,75,0.9)" strokeWidth="1.8" />
      {/* bảng điều khiển */}
      <rect x="168" y="168" width="64" height="30" rx="7" {...glass} {...soft} />
      <circle cx="200" cy="183" r="7" {...soft} />
      {/* dây nguồn */}
      <path d="M284 216c26 4 38 16 34 34" {...line} />
      <rect x="310" y="246" width="18" height="12" rx="3" {...glass} {...line} />
    </svg>
  );
}

export function StoveSvg() {
  return (
    <svg {...sv} className="scan-svg">
      {/* mặt bếp phối cảnh */}
      <path d="M70 170 150 96h180l-80 74H70Z" {...glass} {...line} />
      <path d="M70 170h180v34H70z" {...glass} {...line} />
      <path d="M250 170l80-74v34l-80 74v-34Z" {...glass} {...soft} />
      {/* vùng nấu */}
      <ellipse cx="172" cy="140" rx="46" ry="24" {...soft} />
      <ellipse cx="172" cy="140" rx="30" ry="15" {...line} />
      <ellipse cx="172" cy="140" rx="12" ry="6" {...soft} />
      {/* cảm biến giữa vùng nấu */}
      <circle cx="172" cy="140" r="4.5" fill="rgba(245,193,75,0.25)" stroke="rgba(245,193,75,0.95)" strokeWidth="1.8" />
      {/* màn hình báo lỗi */}
      <rect x="112" y="180" width="52" height="16" rx="4" fill="rgba(242,107,94,0.14)" stroke="rgba(242,107,94,0.9)" strokeWidth="1.8" />
      <text x="138" y="192.5" textAnchor="middle" fontSize="12" fontFamily="ui-monospace, monospace" fill="#F26B5E" fontWeight="700">E0</text>
      {/* nút cảm ứng */}
      <circle cx="188" cy="188" r="5" {...soft} />
      <circle cx="206" cy="188" r="5" {...soft} />
      <circle cx="224" cy="188" r="5" {...soft} />
      {/* khe tản nhiệt + quạt */}
      <path d="M258 186h44M258 193h44" {...soft} />
      <circle cx="286" cy="212" r="14" {...soft} />
      <path d="M286 202v20M276 212h20" {...soft} />
    </svg>
  );
}

export function WasherSvg() {
  return (
    <svg {...sv} className="scan-svg">
      {/* vỏ máy */}
      <rect x="108" y="46" width="184" height="216" rx="16" {...glass} {...line} />
      <path d="M108 84h184" {...soft} />
      {/* ngăn nước giặt + bảng điều khiển */}
      <rect x="122" y="58" width="44" height="16" rx="4" {...glass} {...soft} />
      <circle cx="262" cy="66" r="9" {...glass} {...line} />
      <rect x="188" y="60" width="48" height="12" rx="3" {...glass} {...soft} />
      {/* cửa và lồng giặt */}
      <circle cx="200" cy="172" r="62" {...glass} {...line} />
      <circle cx="200" cy="172" r="48" {...soft} />
      <circle cx="200" cy="172" r="34" {...glass} {...soft} />
      {/* gân lồng giặt */}
      <path d="M200 142v60M174 158l52 28M226 158l-52 28" {...soft} />
      {/* bạc đạn tâm lồng */}
      <circle cx="200" cy="172" r="8" fill="rgba(245,193,75,0.22)" stroke="rgba(245,193,75,0.95)" strokeWidth="1.8" />
      {/* giảm chấn + chân đế */}
      <path d="M146 236l-14 22M254 236l14 22" {...soft} />
      <rect x="124" y="258" width="14" height="8" rx="3" {...glass} {...soft} />
      <rect x="262" y="258" width="14" height="8" rx="3" {...glass} {...soft} />
    </svg>
  );
}


// Ánh xạ danh mục → sơ đồ (danh mục lạ dùng sơ đồ quạt làm mặc định).
export const SCHEMATIC_BY_CATEGORY = {
  "cat-fan": FanSvg,
  "cat-ricecooker": RiceCookerSvg,
  "cat-kettle": RiceCookerSvg,
};
export function schematicFor(categoryId) {
  return SCHEMATIC_BY_CATEGORY[categoryId] || FanSvg;
}
