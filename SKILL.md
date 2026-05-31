# 🧠 SKILL — Quy Tắc Làm Việc Với Dự Án NewWeb

> **File này dành cho AI (Antigravity).** Đọc và tuân thủ toàn bộ nội dung trước khi thực hiện bất kỳ thay đổi nào trong dự án.

---

## 🎯 Mục Đích

File này định nghĩa các quy tắc bắt buộc khi làm việc với dự án **T-beat Studio Website (NewWeb)**.

---

## 📌 QUY TẮC BẮT BUỘC

### Quy tắc 1 — Luôn cập nhật ARCHITECTURE.md sau khi thay đổi

Mỗi khi thực hiện **bất kỳ thay đổi nào** trong dự án, **PHẢI** cập nhật file `ARCHITECTURE.md` để phản ánh đúng trạng thái hiện tại của hệ thống.

**Các loại thay đổi cần cập nhật:**

| Loại thay đổi | Phần cần cập nhật trong ARCHITECTURE.md |
|---|---|
| Thêm trang mới (page/route) | Mục 2 (Front-end → Bảng Routes), Mục 6 (Cấu trúc thư mục) |
| Thêm API endpoint mới | Mục 7 (API Endpoints), Mục 3 (Back-end → Router) |
| Thêm bảng / cột DB | Mục 4 (Cơ sở dữ liệu) |
| Thêm thư viện / package | Mục 2 hoặc Mục 3 (Bảng công nghệ sử dụng) |
| Thêm file / thư mục mới | Mục 6 (Cấu trúc thư mục) |
| Thay đổi luồng auth | Mục 5 (Auth Flow) |
| Thêm biến môi trường | Mục 8 (Biến môi trường) |
| Thay đổi script npm | Mục 9 (Hướng dẫn chạy) |
| Thay đổi sơ đồ hệ thống | Mục 1 (Tổng quan) |

### Quy tắc 2 — Ghi rõ lý do thay đổi

Khi cập nhật `ARCHITECTURE.md`, **phải thêm ngày cập nhật** vào phần **Changelog** ở cuối file. Định dạng:

```markdown
## 📝 Changelog

| Ngày | Thay đổi | Mô tả |
|---|---|---|
| 2026-05-14 | Thêm Dashboard + ProtectedRoute | Trang quản lý quyền và gói người dùng |
```

### Quy tắc 3 — Không để nội dung placeholder

Không để các trang có nội dung kiểu:
- `"This is the ... page."`
- `"Day la trang ... File nay nam o..."`
- `"Nội dung dẫn dắt cho chương X..."`

Luôn thay bằng nội dung thật phù hợp với dự án T-beat Studio.

### Quy tắc 4 — Đặt tên file chuẩn

- Tên component React: `PascalCase.jsx` (ví dụ: `Dashboard.jsx`, `About.jsx`)
- Tên hook: `camelCase.js` bắt đầu bằng `use` (ví dụ: `useApp.js`)
- Tên route server: `camelCase.js` (ví dụ: `auth.js`, `user.js`)
- Tên file CSS: `kebab-case.css`

### Quy tắc 5 — Bảo mật

- Không bao giờ hardcode `JWT_SECRET`, `DB_PASSWORD` vào source code
- Luôn dùng `process.env.*` kết hợp với file `.env`
- Luôn dùng Prepared Statement (`?` placeholder) cho mọi query MySQL
- Route cần xác thực phải đi qua middleware `requireAuth`

### Quy tắc 6 — Khi thêm route cần bảo vệ

Luôn bọc bằng `<ProtectedRoute>`:
```jsx
<Route path="/ten-route" element={
  <ProtectedRoute><TenPage /></ProtectedRoute>
} />
```

---

## 📂 Thông Tin Dự Án

- **Tên dự án:** NewWeb — T-beat Studio Website
- **Vị trí:** `c:\Users\quoct\Desktop\NewWeb`
- **Frontend port:** `:3000` (Vite)
- **Backend port:** `:4000` (Express)
- **Database:** MySQL, DB name: `newweb`
- **Tài liệu kiến trúc:** `ARCHITECTURE.md` (luôn giữ cập nhật)

---

## 🔄 Luồng Làm Việc Chuẩn

```
1. Đọc SKILL.md (file này)
2. Đọc ARCHITECTURE.md để hiểu trạng thái hiện tại
3. Thực hiện thay đổi theo yêu cầu
4. Cập nhật ARCHITECTURE.md tương ứng với thay đổi
5. Thêm dòng vào bảng Changelog của ARCHITECTURE.md
```
