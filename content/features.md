# Features — Trợ Sửa AI

## Mục tiêu

Trợ Sửa AI giúp người dùng kiểm tra ban đầu sự cố đồ gia dụng bằng mô tả và hình ảnh. Sản phẩm giải thích rõ, phân loại rủi ro và hướng người dùng đến bước tiếp theo an toàn; không thay thế kỹ thuật viên.

## Tính năng cốt lõi

- Tài khoản và phân quyền: đăng ký, đăng nhập, lịch sử riêng tư; route quản trị yêu cầu vai trò admin.
- Form kiểm tra có hướng dẫn: thiết bị, hãng/model, triệu chứng, thao tác đã thử và xác nhận cảnh báo an toàn.
- Tải lên 1–3 ảnh; kiểm tra định dạng, dung lượng và số lượng trước khi gọi AI.
- Lịch sử và phản hồi: xem lại kết quả, lọc cơ bản và đánh dấu đã xử lý/chưa xử lý/chưa thử.
- Kết quả AI có cấu trúc: tóm tắt, nguyên nhân có thể xảy ra, mức rủi ro, bước kiểm tra an toàn, điều kiện phải dừng và khuyến nghị kỹ thuật viên.
- Bộ quy tắc dừng thao tác: cảnh báo nổi bật khi có mùi khét, tia lửa, dây điện hở hoặc thiết bị quá nóng.
- Nguồn hướng dẫn đã quản trị: chỉ tham chiếu nội dung đã duyệt và lưu `source_ids` để truy vết.

## Luồng trải nghiệm

1. Người dùng đăng ký/đăng nhập.
2. Chọn thiết bị, nhập triệu chứng và tải tối đa 3 ảnh.
3. Đọc cảnh báo, xác nhận và gửi yêu cầu.
4. Backend kiểm tra schema, áp dụng quy tắc an toàn, gọi AI và lưu kết quả.
5. Người dùng xem kết quả, nguồn tham khảo và gửi phản hồi.