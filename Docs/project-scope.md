# Project Scope — Trợ Sửa AI

## Mục tiêu MVP

Hoàn thành một website full-stack có thể deploy, trong đó người dùng đăng nhập, gửi thông tin thiết bị và ảnh, nhận kết quả AI có cấu trúc, lưu lịch sử và gửi phản hồi. Admin quản lý được danh mục thiết bị và kho hướng dẫn.

## Thiết bị hỗ trợ ban đầu

1. Quạt điện.
2. Nồi cơm điện.
3. Một loại thiết bị bổ sung chỉ khi hai loại đầu đã hoàn chỉnh.

## Must have

- Authentication.
- Phân quyền người dùng/admin.
- Form chẩn đoán.
- Upload tối đa 3 ảnh.
- AI structured output.
- Kiểm tra quy tắc an toàn tại backend.
- Lưu database.
- Lịch sử và phản hồi.
- Quản lý danh mục.
- Quản lý hướng dẫn.
- Deploy và tài khoản demo.

## Should have

- Tìm kiếm và lọc lịch sử.
- Dashboard thống kê cơ bản.
- Hiển thị nguồn mà AI tham khảo.
- Responsive mobile.

## Could have

- Người dùng lưu thiết bị thường dùng.
- Biểu đồ admin.
- Email xác nhận đăng ký.

## Won't have trong MVP

- Phân tích video hoặc âm thanh.
- Fine-tuning.
- Đặt lịch thợ.
- Thanh toán.
- Chat trực tiếp.
- Cộng đồng.

## Definition of Done

- Luồng đăng ký → chẩn đoán → kết quả → phản hồi → lịch sử chạy hoàn chỉnh.
- Dữ liệu được lưu trong database thật.
- Admin route được bảo vệ.
- Kết quả AI được kiểm tra trước khi hiển thị.
- Có loading, empty state và error state.
- Website đã deploy.
- README có hướng dẫn chạy, ảnh demo và tài khoản demo.

