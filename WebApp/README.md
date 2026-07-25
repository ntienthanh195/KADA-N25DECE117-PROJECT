# WebApp

Thư mục chứa mã nguồn chạy thật của Trợ Sửa AI.

## Cấu trúc dự kiến

- `frontend/`: giao diện người dùng và admin.
- `backend/`: REST API, authentication, AI integration và business rules.
- `database/`: ERD, migration, seed và ghi chú dữ liệu.

## Trạng thái

Mã nguồn chưa được khởi tạo. Chỉ bắt đầu sau khi:

- MVP đã chốt.
- Sitemap đã chốt.
- Brandkit đã chốt.
- Stack đã được ghi vào `Docs/decisions.md`.

## Quy tắc

- Không lưu API key trong source code.
- Cung cấp `.env.example` khi bắt đầu phát triển.
- Cập nhật hướng dẫn chạy trong README này.
- Tất cả API admin phải kiểm tra quyền.
- Tất cả kết quả AI phải được validate.

