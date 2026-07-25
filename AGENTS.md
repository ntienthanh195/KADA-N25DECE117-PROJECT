# AGENTS.md

## Mục tiêu

Hỗ trợ xây dựng MVP Trợ Sửa AI trong 5 tuần theo tài liệu trong `Docs/` và quy tắc thương hiệu trong `Brand/brand.md`.

## Nguồn sự thật

Trước khi thay đổi mã nguồn, cần đọc:

1. `README.md`
2. `Docs/project-scope.md`
3. `Docs/sitemap.md`
4. `Brand/brand.md`
5. `Docs/decisions.md`

Khi tài liệu mâu thuẫn, ưu tiên phạm vi MVP trong `Docs/project-scope.md` và ghi lại quyết định mới trong `Docs/decisions.md`.

## Nguyên tắc làm việc

- Không tự thêm tính năng ngoài MVP.
- Không tự chọn công nghệ mới chỉ để làm dự án phức tạp hơn.
- Thực hiện thay đổi nhỏ, dễ kiểm tra.
- Cập nhật README khi cách cài đặt hoặc cách chạy thay đổi.
- Thêm validation cho dữ liệu từ người dùng và AI.
- Không commit secret, API key, dữ liệu cá nhân hoặc file `.env`.
- Không hiển thị trực tiếp dữ liệu thô do AI trả về.
- Không khuyến khích người dùng thực hiện thao tác điện nguy hiểm.
- Với rủi ro cao, ưu tiên cảnh báo dừng và liên hệ kỹ thuật viên.

## Chất lượng

- Giao diện responsive.
- Có loading, empty state và error state.
- Backend kiểm tra quyền truy cập.
- Người dùng chỉ xem được dữ liệu của mình.
- Admin route phải được bảo vệ.
- Các chức năng quan trọng cần có kiểm thử phù hợp.

## Định dạng kết quả AI tối thiểu

```json
{
  "summary": "string",
  "possible_causes": [],
  "risk_level": "low | medium | high",
  "safe_checks": [],
  "stop_conditions": [],
  "can_self_check": false,
  "need_technician": true,
  "source_ids": []
}
```

