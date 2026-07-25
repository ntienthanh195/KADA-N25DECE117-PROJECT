# Nhật ký quyết định kỹ thuật

Ghi lại các quyết định quan trọng để có thể giải thích khi đánh giá hoặc phỏng vấn.

| ID | Ngày | Quyết định | Lý do | Phương án đã cân nhắc |
|---|---|---|---|---|
| ADR-001 | 2026-07-25 | Dùng AI có sẵn kết hợp kho hướng dẫn | Phù hợp thời gian 5 tuần, dễ cập nhật dữ liệu | Train từ đầu, fine-tuning |
| ADR-002 | 2026-07-25 | Chỉ hỗ trợ ảnh trong MVP | Video và âm thanh là bài toán phức tạp riêng | Upload video, phân tích audio |
| ADR-003 | 2026-07-25 | Kiểm tra kết quả AI và áp dụng quy tắc an toàn tại backend | Không hiển thị trực tiếp dữ liệu AI chưa được xác thực; ưu tiên dừng thao tác khi rủi ro cao | Chỉ kiểm tra tại frontend, hiển thị nguyên văn phản hồi AI |

## Mẫu quyết định chi tiết

```text
ID:
Ngày:
Bối cảnh:
Quyết định:
Lý do:
Hệ quả:
Phương án khác:
```
