import "./globals.css";
import { Be_Vietnam_Pro, Inter } from "next/font/google";

// Theo Brand/brand.md: Be Vietnam Pro cho heading, Inter cho body.
const heading = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata = {
  title: "Trợ Sửa AI — Hiểu lỗi nhanh, xử lý an toàn",
  description:
    "Mô tả triệu chứng, tải hình ảnh và nhận hướng dẫn kiểm tra ban đầu theo mức độ an toàn. Trợ Sửa AI cung cấp thông tin hỗ trợ ban đầu và không thay thế kỹ thuật viên chuyên môn.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
