// Bộ icon SVG nội bộ — nét đơn giản, dùng currentColor để ăn theo màu chữ.

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function IconFan(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8c0-3.2-1.4-5.3-3.5-5.3-1.7 0-2.6 1.3-2.6 2.6 0 2.3 3 2.7 6.1 2.7Z" />
      <path d="M14.2 12c3.2 0 5.3-1.4 5.3-3.5 0-1.7-1.3-2.6-2.6-2.6-2.3 0-2.7 3-2.7 6.1Z" />
      <path d="M12 14.2c0 3.2 1.4 5.3 3.5 5.3 1.7 0 2.6-1.3 2.6-2.6 0-2.3-3-2.7-6.1-2.7Z" />
      <path d="M9.8 12c-3.2 0-5.3 1.4-5.3 3.5 0 1.7 1.3 2.6 2.6 2.6 2.3 0 2.7-3 2.7-6.1Z" />
    </svg>
  );
}

export function IconPot(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10h16v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-4Z" />
      <path d="M4 12H2.5M21.5 12H20" />
      <path d="M8 10c0-2 .8-3 4-3s4 1 4 3" />
      <path d="M10 4.5c.5-.8 1.5-.8 2 0s1.5.8 2 0" />
    </svg>
  );
}

export function IconKettle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 9h9l-1 11H8L7 9Z" />
      <path d="M16 11l3-1.5V13l-2.6 1" />
      <path d="M9 9c0-2.5 1.3-4 3.5-4S16 6.5 16 9" />
    </svg>
  );
}

export function IconShield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 2.6v5.1c0 4.6-3 8.2-7 10.3-4-2.1-7-5.7-7-10.3V5.6L12 3Z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </svg>
  );
}

export function IconCamera(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

export function IconClipboard(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5h8v15H6V5h2Z" />
      <path d="M9 3.5h6V6H9V3.5Z" />
      <path d="M9 10h6M9 13h6M9 16h4" />
    </svg>
  );
}

export function IconGauge(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15l4-5" />
      <path d="M3.5 18.5h17" />
    </svg>
  );
}

export function IconSteps(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 18h5v-4h5v-4h6" />
      <path d="M17 7l3 3-3 3" />
    </svg>
  );
}

export function IconStop(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 3.5h7l5 5v7l-5 5h-7l-5-5v-7l5-5Z" />
      <path d="M9 12h6" />
    </svg>
  );
}

export function IconBook(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5C5.8 4.5 8 4.4 12 6c4-1.6 6.2-1.5 8-.5V18c-1.8-1-4-1.1-8 .5-4-1.6-6.2-1.5-8-.5V5.5Z" />
      <path d="M12 6v12.5" />
    </svg>
  );
}

export function IconHistory(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12a7.5 7.5 0 1 1 2.2 5.3" />
      <path d="M4.5 12H2.8M4.5 12l1.2 2.5" />
      <path d="M12 8v4.5l3 1.8" />
    </svg>
  );
}

export function IconUser(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1-3.5 3.7-5 7-5s6 1.5 7 5" />
    </svg>
  );
}

export function IconGrid(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z" />
    </svg>
  );
}

export function IconPlus(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </svg>
  );
}

export function IconWrench(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 6.5a4 4 0 0 0-5.4 5L4 16.6 7.4 20l5.1-5.1a4 4 0 0 0 5-5.4l-2.7 2.7-2.6-.7-.7-2.6 3-2.4Z" />
    </svg>
  );
}

export function IconHome(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function IconBolt(props) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2.5 5 13.5h5L11 21.5l8-11h-5l-1-8Z" />
    </svg>
  );
}

export function IconChat(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16v11H9l-5 4v-15Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

export function IconFridge(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M6 10h12" />
      <path d="M9 6v2M9 13v3" />
    </svg>
  );
}

export function IconWasher(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <circle cx="12" cy="13" r="4.2" />
      <path d="M8.5 13c1.2 1 2.3-1 3.5 0s2.3 1 3.5 0" />
      <path d="M7 6.5h.01M10 6.5h4" />
    </svg>
  );
}

export function IconStove(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <circle cx="9" cy="12" r="3" />
      <circle cx="9" cy="12" r="1" />
      <path d="M15 9.5h3M15 12h3M15 14.5h3" />
    </svg>
  );
}

export function IconStar(props) {
  return (
    <svg {...base} {...props} fill="currentColor" strokeWidth="0">
      <path d="M12 2.8l2.6 5.5 6 .8-4.4 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.4 9.1l6-.8L12 2.8Z" />
    </svg>
  );
}

export function IconSend(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 11.5 20.5 4l-4.5 16.5-4.2-6.3-8.3-2.7Z" />
      <path d="M11.8 14.2 20.5 4" />
    </svg>
  );
}

export function IconSpark(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.8 5.8l2.8 2.8M15.4 15.4l2.8 2.8M18.2 5.8l-2.8 2.8M8.6 15.4l-2.8 2.8" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5 10 18 19.5 6.5" />
    </svg>
  );
}

export function IconX(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
