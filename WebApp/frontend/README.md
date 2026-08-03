# Trợ Sửa AI — Frontend (Next.js)

Frontend hoàn chỉnh cho MVP theo `Docs/sitemap.md` của repo `KADA-N25DECE117-PROJECT`.
Giai đoạn này chạy hoàn toàn bằng **mock data trên trình duyệt (localStorage)** —
chưa cần backend. Khi backend sẵn sàng, chỉ cần thay các hàm trong `lib/store.js`
bằng lời gọi API.

## Yêu cầu

- Node.js 18.17 trở lên (khuyến nghị Node 20+)

## Chạy dự án

```bash
cd WebApp/frontend
npm install
npm run dev
```

Mở http://localhost:3000

## Tài khoản demo

| Vai trò    | Email               | Mật khẩu |
| ---------- | ------------------- | -------- |
| Người dùng | user@trosuaai.vn    | user123  |
| Admin      | admin@trosuaai.vn   | admin123 |

Có thể đăng ký tài khoản mới ngay trên trang `/register`.

## Các trang đã có (đúng sitemap)

| Đường dẫn                  | Nội dung                                            |
| -------------------------- | --------------------------------------------------- |
| `/`                        | Trang chủ: hero, cách hoạt động, thiết bị, an toàn  |
| `/register`, `/login`      | Đăng ký / đăng nhập, điều hướng theo vai trò        |
| `/app/dashboard`           | Tổng quan người dùng, 5 lượt gần nhất, thống kê     |
| `/app/diagnoses/new`       | Form chẩn đoán 5 bước, validate, upload 1–3 ảnh     |
| `/app/diagnoses/:id`       | Kết quả có cấu trúc 9 khối, phản hồi người dùng     |
| `/app/history`             | Lịch sử: lọc, phân trang, trạng thái rỗng           |
| `/app/profile`             | Đổi họ tên, đổi mật khẩu                            |
| `/admin`                   | Tổng quan quản trị + hành động nhanh                |
| `/admin/device-categories` | CRUD danh mục, quy tắc không xóa khi đang dùng      |
| `/admin/repair-guides`     | Kho hướng dẫn: duyệt/nháp, nguồn bắt buộc khi duyệt |
| `/admin/diagnoses`         | Theo dõi chẩn đoán: lọc theo thiết bị/rủi ro/phản hồi |
| `/forbidden`, 404, 500     | Trang trạng thái hệ thống                           |

## Áp dụng brand

Giao diện tuân theo `Brand/brand.md` v1.0: Primary Trust Blue `#1D4ED8`,
Safety Teal chỉ làm màu hỗ trợ; heading dùng Be Vietnam Pro, body dùng Inter;
nhãn trạng thái rủi ro "Nguy cơ thấp / Cần thận trọng / Nguy hiểm — dừng thao
tác"; các mẫu nội dung (hero, loading, cảnh báo, phản hồi) lấy từ mục 11 của
brandkit. Toàn bộ token màu nằm ở đầu `app/globals.css`.

## Quy tắc an toàn đã cài trong giao diện

- Mức nguy hiểm **Cao**: ẩn hướng dẫn tự sửa chi tiết, chỉ hiện bước ngắt điện.
- Cảnh báo "Dấu hiệu phải dừng" luôn đứng **trước** các bước xử lý.
- Nếu triệu chứng chứa từ khóa nguy hiểm (khét, khói, rò điện…), mock AI tự
  nâng mức rủi ro lên Cao.
- Admin không duyệt được hướng dẫn thiếu nguồn tài liệu; hướng dẫn mức Cao
  không được chứa bước tự sửa chi tiết.
- Mock AI chỉ dùng hướng dẫn **đã duyệt**.

## Kiến trúc mock → API thật

Toàn bộ đọc/ghi dữ liệu nằm trong `lib/store.js` (localStorage) và dữ liệu mẫu
nằm trong `lib/mock-data.js`. Khi có backend:

1. Giữ nguyên chữ ký các hàm (`login`, `getDiagnoses`, `analyze`, …).
2. Thay phần thân bằng `fetch()` đến API.
3. Các trang không cần sửa hoặc sửa rất ít.

## Vị trí đề xuất trong repo

Đặt toàn bộ thư mục này vào `WebApp/frontend/` của repo
`KADA-N25DECE117-PROJECT`.

Gợi ý commit (theo quy ước của dự án):

```
feat(frontend): khởi tạo giao diện Next.js theo sitemap
feat(frontend): trang chủ, đăng ký, đăng nhập với mock auth
feat(diagnosis): form chẩn đoán và trang kết quả có cấu trúc
feat(frontend): lịch sử, hồ sơ và khu vực quản trị với mock data
```
