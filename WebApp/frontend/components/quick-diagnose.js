"use client";

// Input chẩn đoán nhanh trong hero + các prompt mẫu bấm thử.
// Triệu chứng được lưu tạm vào localStorage, sau đó điều hướng:
// đã đăng nhập → form chẩn đoán (tự điền sẵn), chưa → đăng ký.

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSession } from "@/lib/store";
import { IconSend, IconSpark } from "./icons";

const DRAFT_KEY = "tsa_draft_symptom";

function go(router, text) {
  if (typeof window !== "undefined" && text.trim()) {
    window.localStorage.setItem(DRAFT_KEY, text.trim());
  }
  const session = getSession();
  router.push(session ? "/app/diagnoses/new" : "/register");
}

export function QuickDiagnose() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit() {
    go(router, q);
  }

  return (
    <div className="quick-box">
      <IconSpark className="quick-spark" width={19} height={19} />
      <input
        className="quick-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Nhập thử triệu chứng: quạt kêu to, nồi cơm nhảy nút sớm…"
        aria-label="Nhập triệu chứng thiết bị"
      />
      <button className="btn btn--primary quick-btn" onClick={submit}>
        <IconSend width={17} height={17} /> Chẩn đoán ngay
      </button>
    </div>
  );
}

export function PromptChips({ prompts }) {
  const router = useRouter();
  return (
    <div className="prompt-chips">
      {prompts.map((p) => (
        <button key={p} className="prompt-chip" onClick={() => go(router, p)}>
          <IconSpark width={15} height={15} />
          {p}
        </button>
      ))}
    </div>
  );
}
