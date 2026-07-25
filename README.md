# TroSuaAI

**Tên thương hiệu:** Trợ Sửa AI  
**Tagline:** Hiểu lỗi nhanh, xử lý an toàn.

Trợ Sửa AI là website hỗ trợ người dùng kiểm tra ban đầu sự cố đồ gia dụng thông qua mô tả triệu chứng và hình ảnh. Hệ thống kết hợp AI với kho hướng dẫn đã được quản trị để đưa ra nguyên nhân có thể xảy ra, mức độ nguy hiểm, các bước kiểm tra an toàn và khuyến nghị bước tiếp theo.

## Trạng thái dự án

**Giai đoạn hiện tại:** Lập kế hoạch và thiết kế  
**Mục tiêu:** Hoàn thành MVP trong 5 tuần  
**Tên repository:** `KADA-N25DECE117-PROJECT`

## Thành viên

| Họ và tên | Email | Student ID | Vai trò |
|---|---|---|---|
| Nguyễn Tiến Thành | ntienthanh195@gmail.com | N25DECE117 | Full-stack Developer |

## Vấn đề cần giải quyết

Khi đồ gia dụng gặp sự cố, người dùng thường không biết:

- Sự cố có thể xuất phát từ đâu.
- Có nguy hiểm khi tiếp tục sử dụng hay không.
- Có thể thực hiện bước kiểm tra cơ bản nào.
- Khi nào cần dừng thao tác và liên hệ kỹ thuật viên.

Trợ Sửa AI giúp sắp xếp những thông tin này thành kết quả rõ ràng, nhưng không thay thế kỹ thuật viên chuyên môn.

## Phạm vi MVP

### Người dùng

- Đăng ký, đăng nhập và đăng xuất.
- Chọn loại thiết bị.
- Nhập hãng, model và mô tả triệu chứng.
- Tải lên từ 1 đến 3 ảnh.
- Nhận kết quả AI theo cấu trúc:
  - Tóm tắt sự cố.
  - Nguyên nhân có thể xảy ra.
  - Mức độ nguy hiểm.
  - Các bước kiểm tra an toàn.
  - Dấu hiệu phải dừng.
  - Có thể tự kiểm tra hay nên liên hệ kỹ thuật viên.
- Xem lại lịch sử.
- Phản hồi “Đã xử lý được”, “Chưa xử lý được” hoặc “Chưa thử”.

### Admin

- Xem thống kê tổng quan.
- Quản lý danh mục thiết bị.
- Quản lý kho hướng dẫn sửa chữa.
- Theo dõi lượt chẩn đoán và phản hồi.

### Không thuộc MVP

- Phân tích video đầy đủ.
- Nhận dạng âm thanh.
- Tự huấn luyện hoặc fine-tune mô hình.
- Đặt lịch kỹ thuật viên.
- Thanh toán.
- Chat trực tiếp.
- Cộng đồng hỏi đáp.

## Tài liệu dự án

- [Sitemap](./Docs/sitemap.md)
- [Phạm vi dự án](./Docs/project-scope.md)
- [Kế hoạch 5 tuần](./Docs/milestones.md)
- [Nhật ký quyết định kỹ thuật](./Docs/decisions.md)
- [Brand Guidelines](./Brand/brand.md)

## Cấu trúc repository

```text
KADA-N25DECE117-PROJECT/
├── Learn/                  # Nhật ký và minh chứng học tập
│   ├── AI-Basic/
│   ├── UI-UX/
│   ├── Backend/
│   └── Data/
├── Brand/                  # Brandkit và tài sản thương hiệu
│   ├── brand.md
│   └── assets/
├── Docs/                   # Sitemap, phạm vi và kế hoạch
├── WebApp/                 # Mã nguồn sản phẩm
│   ├── frontend/
│   ├── backend/
│   └── database/
├── AGENTS.md               # Hướng dẫn cho coding agent
├── CLAUDE.md               # Bối cảnh dùng với Claude Code
├── .gitignore
└── README.md
```

## Lộ trình

| Tuần | Mục tiêu chính | Đầu ra |
|---|---|---|
| 1 | Chốt MVP, sitemap, brand và UI/UX | Tài liệu, wireframe, database draft |
| 2 | Xác thực và dữ liệu nền | Đăng ký, đăng nhập, danh mục thiết bị |
| 3 | Luồng chẩn đoán AI | Form, upload ảnh, AI response, lưu kết quả |
| 4 | Lịch sử và admin | History, feedback, quản lý hướng dẫn |
| 5 | Kiểm thử và triển khai | Website online, README, tài khoản demo |

Chi tiết tại [Docs/milestones.md](./Docs/milestones.md).

## Công nghệ

Stack chính thức sẽ được chốt trước khi bắt đầu lập trình.

| Khu vực | Công nghệ | Trạng thái |
|---|---|---|
| Frontend | Next.js được đề xuất theo nội dung workshop | Chưa khởi tạo |
| Backend | Chưa chốt | Chưa khởi tạo |
| Database | Chưa chốt | Chưa khởi tạo |
| AI | Mô hình có sẵn qua API, không train từ đầu | Đã chốt hướng |
| Deploy | Chưa chốt | Chưa triển khai |

## Hướng dẫn chạy dự án

Phần này sẽ được cập nhật sau khi frontend và backend được khởi tạo.

```bash
# Ví dụ, chưa phải lệnh chạy chính thức
cd WebApp
```

Không commit file `.env` hoặc API key lên GitHub.

## Quy ước commit

Sử dụng commit nhỏ, có ý nghĩa và thực hiện đều đặn mỗi tuần.

```text
docs: add project sitemap
docs: add brand guidelines
feat(auth): implement user login
feat(diagnosis): add diagnosis form
fix(ai): validate structured AI response
test(auth): add login validation tests
```

## An toàn và giới hạn AI

- Kết quả chỉ mang tính hỗ trợ kiểm tra ban đầu.
- Không khẳng định chẩn đoán khi chưa có căn cứ.
- Với rủi ro cao, hệ thống phải yêu cầu dừng thao tác.
- Backend phải kiểm tra dữ liệu AI trước khi hiển thị.
- Không dùng ảnh người dùng để huấn luyện khi chưa có sự đồng ý.
- Không đưa API key hoặc thông tin nhạy cảm vào repository.

## Demo và triển khai

Các thông tin sau sẽ được bổ sung trong tuần 5:

- URL website.
- Video demo.
- Ảnh chụp màn hình.
- Tài khoản người dùng demo.
- Tài khoản admin demo.
- Hướng dẫn cài đặt đầy đủ.

## Giấy phép

Dự án phục vụ mục đích học tập. Giấy phép sử dụng mã nguồn và dữ liệu sẽ được chốt trước khi phát hành công khai.
