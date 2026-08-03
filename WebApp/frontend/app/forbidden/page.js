import Link from "next/link";
import { PublicHeader } from "@/components/chrome";

export default function ForbiddenPage() {
  return (
    <>
      <PublicHeader />
      <div className="auth-wrap">
        <div className="empty">
          <h1 style={{ fontSize: "2rem" }}>403</h1>
          <h3>Bạn không có quyền mở trang này</h3>
          <p>Khu vực bạn vừa truy cập yêu cầu vai trò khác với tài khoản hiện tại.</p>
          <Link className="btn btn--primary" href="/">Về trang chủ</Link>
        </div>
      </div>
    </>
  );
}
