import Link from "next/link";
import { PublicHeader } from "@/components/chrome";

export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <div className="auth-wrap">
        <div className="empty">
          <h1 style={{ fontSize: "2rem" }}>404</h1>
          <h3>Không tìm thấy trang</h3>
          <p>Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển.</p>
          <Link className="btn btn--primary" href="/">Về trang chủ</Link>
        </div>
      </div>
    </>
  );
}
