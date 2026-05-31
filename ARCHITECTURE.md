# 📐 Kiến Trúc Hệ Thống — T-beat Studio Website

> Tài liệu mô tả chi tiết công nghệ sử dụng và cách hệ thống được thiết kế cho dự án NewWeb.

---

## 📋 Mục Lục

1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Front-end](#2-front-end)
3. [Back-end](#3-back-end)
4. [Cơ sở dữ liệu](#4-cơ-sở-dữ-liệu)
5. [Luồng xác thực (Auth Flow)](#5-luồng-xác-thực-auth-flow)
6. [Cấu trúc thư mục](#6-cấu-trúc-thư-mục)
7. [API Endpoints](#7-api-endpoints)
8. [Biến môi trường (.env)](#8-biến-môi-trường-env)
9. [Hướng dẫn chạy dự án](#9-hướng-dẫn-chạy-dự-án)
10. [Changelog](#10-changelog)

---

## 1. Tổng Quan Hệ Thống

```
┌─────────────────────────────────────────────────────────┐
│                     NGƯỜI DÙNG (Browser)                 │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTP / HTTPS
                            ▼
┌─────────────────────────────────────────────────────────┐
│              FRONT-END  (Vite Dev Server :3000)          │
│                    React + React Router                  │
│  ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌────────────┐  │
│  │  Home    │ │  About  │ │ History  │ │  Download  │  │
│  └──────────┘ └─────────┘ └──────────┘ └────────────┘  │
│  ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌────────────┐  │
│  │  Login   │ │Register │ │ Project  │ │ Dashboard🔒│  │
│  └──────────┘ └─────────┘ └──────────┘ └────────────┘  │
│           ProtectedRoute → redirect /login               │
└───────────────────────────┬─────────────────────────────┘
                            │ /api/* (Proxy qua Vite)
                            ▼
┌─────────────────────────────────────────────────────────┐
│              BACK-END  (Express Server :4000)            │
│                                                          │
│   POST /api/auth/login        POST /api/auth/register   │
│   GET  /api/user/me (🔒JWT)   GET  /api/health          │
│   GET  /api/db-test                                     │
└───────────────────────────┬─────────────────────────────┘
                            │ mysql2/promise (Connection Pool)
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  DATABASE  (MySQL :3306)                  │
│                    Database: `newweb`                    │
│                    Table: `users`                        │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Front-end

### Công nghệ sử dụng

| Thư viện / Tool | Phiên bản | Mục đích |
|---|---|---|
| **React** | latest | UI framework, component-based |
| **Vite** | latest | Build tool, dev server cực nhanh |
| **React Router DOM** | ^7.15.0 | Client-side routing (SPA) |
| **@vitejs/plugin-react** | latest | Hỗ trợ JSX và React Fast Refresh |
| **Vanilla CSS** | — | Styling (không dùng Tailwind hay CSS-in-JS) |

### Cách hoạt động

- **SPA (Single Page Application)**: Toàn bộ ứng dụng là 1 trang HTML duy nhất (`index.html`), React Router xử lý điều hướng mà **không reload trang**.
- **Vite Proxy**: Trong môi trường dev, mọi request đến `/api/*` sẽ được Vite tự động **proxy** sang `http://localhost:4000` — giải quyết vấn đề CORS mà không cần cấu hình thêm.

```js
// vite.config.js — Proxy config
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:4000',  // Forward đến Express
      changeOrigin: true,
    }
  }
}
```

### Cấu trúc trang (Routes)

| URL | Component | Yêu cầu đăng nhập? |
|---|---|---|
| `/` | `Home.jsx` | ❌ Không |
| `/about` | `About.jsx` | ❌ Không |
| `/project` | `project.jsx` | ❌ Không |
| `/history` | `History.jsx` | ❌ (chỉ cần login để xem chapter) |
| `/history/chapter/:id` | `StoryDetail.jsx` | ✅ Có |
| `/download` | `Dowload.jsx` | ❌ Không |
| `/login` | `Login.jsx` | ❌ Không |
| `/register` | `Register.jsx` | ❌ Không |
| `/dashboard` | `Dashboard.jsx` | ✅ Có (ProtectedRoute) |

> 🔒 Route `/dashboard` được bọc trong `<ProtectedRoute>` — tự động redirect về `/login` nếu chưa đăng nhập.
> Sau khi đăng nhập thành công, hệ thống redirect thẳng về `/dashboard`.

### Quản lý Auth State (Front-end)

```
localStorage
  ├── authToken  →  JWT token (string)
  └── authUser   →  { id, name, email } (JSON)

Custom Hook: useAuth()
  ├── user         →  object user hoặc null
  ├── isLoggedIn   →  boolean
  ├── logout()     →  xóa localStorage + redirect về /
  └── refreshAuth()→  đọc lại từ localStorage
```

- **Không dùng Redux / Context API** — auth state được quản lý qua `localStorage` và custom event `auth-success`.
- Khi login thành công, `Login.jsx` bắn event `window.dispatchEvent(new Event('auth-success'))` để `useAuth` hook cập nhật state ngay lập tức.

---

## 3. Back-end

### Công nghệ sử dụng

| Package | Phiên bản | Mục đích |
|---|---|---|
| **Express** | ^5.2.1 | Web framework, xử lý HTTP request |
| **mysql2** | ^3.22.3 | Driver kết nối MySQL, hỗ trợ Promise & Connection Pool |
| **bcryptjs** | ^3.0.3 | Hash mật khẩu (salt rounds = 10~12) |
| **jsonwebtoken** | ^9.0.3 | Tạo và verify JWT token |
| **dotenv** | ^17.4.2 | Đọc biến môi trường từ file `.env` |
| **cors** | ^2.8.6 | Cho phép cross-origin request từ frontend |
| **concurrently** | ^9.2.1 | Chạy nhiều npm script cùng lúc |

### Thiết kế Back-end

#### Kiến trúc: Monolith nhỏ gọn (Simple Layered)

```
server/
├── index.js          ← Entry point: khởi tạo Express, gắn middleware, lắng nghe port
├── db.js             ← Tầng kết nối DB: tạo Connection Pool MySQL
├── routes/
│   ├── auth.js       ← Router: POST /login, POST /register
│   └── user.js       ← Router: GET /me (🔒 JWT middleware)
└── seed.js           ← Script tạo dữ liệu mẫu (chạy 1 lần)
```

#### Tầng Middleware (index.js)

```
Request đến
    │
    ▼
cors()           → Kiểm tra Origin, cho phép CLIENT_ORIGIN từ .env
    │
    ▼
express.json()   → Parse body JSON thành req.body
    │
    ▼
/api/auth        → authRouter (routes/auth.js)
    │
    ▼
/api/user        → userRouter (routes/user.js)
    │              └── requireAuth middleware (verify JWT)
    ▼
/api/health      → Trả { ok: true } để kiểm tra server còn sống
    │
    ▼
/api/db-test     → Trả kết quả query MySQL để kiểm tra DB
```

#### Tầng Connection Pool (db.js)

- Dùng `mysql2/promise` với **Connection Pool** thay vì tạo connection mới mỗi request.
- Pool quản lý tối đa **10 kết nối** đồng thời (`connectionLimit: 10`).
- `enableKeepAlive: true` để tránh kết nối bị timeout sau thời gian dài không dùng.

```
Client Request → Pool.execute() → [Lấy connection từ pool] → Query MySQL → [Trả connection về pool]
```

#### Tầng Router — Auth (routes/auth.js)

**POST `/api/auth/register`**
```
1. Nhận { name, email, password } từ body
2. Kiểm tra thiếu field → 400 Bad Request
3. Query DB: SELECT email → nếu tồn tại → 400 "Email already registered"
4. bcrypt.hash(password, 10) → tạo password_hash
5. INSERT INTO users (name, email, password_hash)
6. Trả 201 { ok: true, userId }
```

**POST `/api/auth/login`**
```
1. Nhận { email, password } từ body
2. Kiểm tra thiếu field → 400 Bad Request
3. Query DB: SELECT user WHERE email = ?
4. Không tìm thấy → 401 "Invalid email or password"
5. bcrypt.compare(password, user.password_hash)
6. Sai mật khẩu → 401 "Invalid email or password"
7. jwt.sign({ sub: user.id, email }, JWT_SECRET, { expiresIn: '7d' })
8. Trả 200 { ok: true, token, user: { id, name, email } }
```

### Bảo mật

| Vấn đề | Giải pháp |
|---|---|
| Mật khẩu lưu DB | Hash bằng **bcrypt** (cost factor 10-12), không bao giờ lưu plaintext |
| Xác thực phiên | **JWT** với `expiresIn: 7d`, ký bằng `JWT_SECRET` từ `.env` |
| SQL Injection | Dùng **Prepared Statement** (`?` placeholder) qua `pool.execute()` |
| CORS | Chỉ cho phép origin từ `CLIENT_ORIGIN` trong `.env` |
| Lộ thông tin lỗi | Response error không trả stack trace ra ngoài (chỉ `error.message`) |

---

## 4. Cơ Sở Dữ Liệu

### Database: `newweb` (MySQL)

#### Bảng `users`

```sql
CREATE TABLE users (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  NOT NULL DEFAULT 'free',
  plan          VARCHAR(20)  NOT NULL DEFAULT 'free',
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);
```

| Cột | Kiểu | Mô tả |
|---|---|---|
| `id` | INT, PK, AUTO_INCREMENT | ID định danh duy nhất |
| `name` | VARCHAR(255), NOT NULL | Tên hiển thị người dùng |
| `email` | VARCHAR(255), UNIQUE | Email (dùng để đăng nhập) |
| `password_hash` | VARCHAR(255) | Mật khẩu đã hash bằng bcrypt |
| `role` | VARCHAR(20), DEFAULT 'free' | Quyền: `free` \| `premium` \| `vip` \| `admin` |
| `plan` | VARCHAR(20), DEFAULT 'free' | Gói đăng ký: `free` \| `premium` \| `vip` |
| `created_at` | TIMESTAMP | Thời gian tạo tài khoản |

> ⚠️ Nếu đã tạo bảng trước đó, chạy migration: `database/add_role_plan.sql`

#### Seed dữ liệu mẫu

```bash
npm run db:seed
# Tạo tài khoản: demo@example.com / demo123456
```

---

## 5. Luồng Xác Thực (Auth Flow)

### Đăng ký

```
[Người dùng] --POST /api/auth/register--> [Express]
                                               │
                                    Kiểm tra email trùng?
                                        ├─ Có → 400 Error
                                        └─ Không ↓
                                    bcrypt.hash(password)
                                           ↓
                                    INSERT INTO users
                                           ↓
                              [201 Created] → Redirect /login (2s)
```

### Đăng nhập

```
[Người dùng] --POST /api/auth/login--> [Express]
                                            │
                                   SELECT user by email
                                       ├─ Không tìm thấy → 401
                                       └─ Tìm thấy ↓
                                   bcrypt.compare(password)
                                       ├─ Sai → 401
                                       └─ Đúng ↓
                                   jwt.sign({ sub, email }, secret)
                                           ↓
                              [200 OK] { token, user }
                                           ↓
                              [Browser] localStorage.setItem
                                   authToken = JWT
                                   authUser  = { id, name, email }
                                           ↓
                              dispatchEvent('auth-success')
                                           ↓
                              useAuth() cập nhật UI → Redirect /
```

### Đăng xuất

```
[Người dùng click Đăng xuất]
         ↓
logout() từ useAuth hook
         ↓
localStorage.removeItem('authToken')
localStorage.removeItem('authUser')
         ↓
window.location.href = '/'
```

---

## 6. Cấu Trúc Thư Mục

```
NewWeb/
├── public/                    # Static files (favicon, ảnh public)
├── database/
│   └── add_role_plan.sql      # Migration: thêm cột role, plan vào users
├── src/
│   ├── assets/
│   │   ├── images/story/      # Ảnh truyện (import qua Vite)
│   │   └── videos/            # Video nền (comic.mp4)
│   ├── components/
│   │   ├── Icon.jsx           # Component hiển thị icon từ Icons8 API
│   │   ├── ProtectedRoute.jsx # HOC bảo vệ route yêu cầu đăng nhập
│   │   ├── Features/          # (Dự kiến)
│   │   ├── Hero/              # (Dự kiến)
│   │   └── Navbar/            # (Dự kiến)
│   ├── data/
│   │   └── story.js           # Dữ liệu cốt truyện (chapters, Vite import ảnh)
│   ├── hooks/
│   │   └── useApp.js          # Custom hooks: useAuth, useLocalStorage, useDocumentTitle
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx          # Giới thiệu studio, team, tech stack
│   │   ├── project.jsx        # Danh sách dự án, progress bar, features
│   │   ├── History.jsx        # Danh sách chương truyện (yêu cầu login)
│   │   ├── StoryDetail.jsx    # Đọc từng chương (ảnh + nội dung)
│   │   ├── Dowload.jsx        # Trang tải game, patch notes, system req
│   │   ├── Login.jsx          # Đăng nhập → redirect /dashboard
│   │   ├── Register.jsx       # Đăng ký → redirect /login (2s)
│   │   └── Dashboard.jsx      # 🔒 Dashboard: quyền, gói, stats
│   ├── styles/
│   │   └── global.css         # CSS toàn cục, design system
│   ├── App.jsx                # Root component, routing, navbar
│   └── main.jsx               # Entry point React
├── server/
│   ├── db.js                  # MySQL Connection Pool
│   ├── index.js               # Express app entry
│   ├── seed.js                # Script seed dữ liệu mẫu
│   └── routes/
│       ├── auth.js            # POST /login, POST /register
│       └── user.js            # GET /me (🔒 requireAuth JWT middleware)
├── scripts/
│   ├── start-mysql.ps1        # PowerShell: khởi động MySQL
│   └── stop-mysql.ps1         # PowerShell: dừng MySQL
├── .env                       # Biến môi trường (KHÔNG commit lên Git)
├── .env.example               # Mẫu file .env
├── .gitignore
├── vite.config.js             # Cấu hình Vite + Proxy
├── package.json
├── SKILL.md                   # Quy tắc làm việc cho AI
└── ARCHITECTURE.md            # Tài liệu kiến trúc hệ thống
```

---

## 7. API Endpoints

| Method | Endpoint | Auth | Body | Response | Mô tả |
|---|---|---|---|---|---|
| `GET` | `/api/health` | ❌ | — | `{ ok: true }` | Kiểm tra server sống |
| `GET` | `/api/db-test` | ❌ | — | `{ ok, database }` | Kiểm tra kết nối DB |
| `POST` | `/api/auth/register` | ❌ | `{ name, email, password }` | `{ ok, userId }` | Đăng ký tài khoản |
| `POST` | `/api/auth/login` | ❌ | `{ email, password }` | `{ ok, token, user }` | Đăng nhập |
| `GET` | `/api/user/me` | 🔒 JWT | — | `{ ok, user }` | Lấy thông tin user (có role, plan) |

> 🔒 Endpoint có JWT: gửi header `Authorization: Bearer <token>`

---

## 8. Biến Môi Trường (.env)

```env
# Server
API_PORT=4000                          # Port Express lắng nghe
CLIENT_ORIGIN=http://localhost:3000    # Origin được phép CORS

# MySQL
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=newweb

# JWT
JWT_SECRET=change_this_to_a_long_random_secret
```

> ⚠️ **Lưu ý:** File `.env` đã được thêm vào `.gitignore`. Không bao giờ commit file này lên Git vì chứa thông tin nhạy cảm.

---

## 9. Hướng Dẫn Chạy Dự Án

### Bước 1 — Cài dependencies

```bash
npm install
```

### Bước 2 — Tạo file `.env`

```bash
cp .env.example .env
# Sau đó chỉnh sửa .env với thông tin MySQL của bạn
```

### Bước 3 — Khởi động MySQL

```bash
npm run mysql:start
```

### Bước 4 — Tạo database và seed dữ liệu

Truy cập MySQL và tạo database:
```sql
CREATE DATABASE newweb;
USE newweb;
CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Seed tài khoản mẫu:
```bash
npm run db:seed
# demo@example.com / demo123456
```

### Bước 5 — Chạy toàn bộ hệ thống

```bash
npm run dev:all
# Chạy đồng thời Vite (port 3000) và Express (port 4000)
```

Hoặc chạy riêng lẻ:
```bash
npm run dev          # Chỉ Vite frontend
npm run dev:server   # Chỉ Express backend (với --watch)
```

### Kiểm tra hệ thống

| URL | Kết quả mong đợi |
|---|---|
| `http://localhost:3000` | Trang web hiển thị |
| `http://localhost:3000/dashboard` | Dashboard (cần đăng nhập) |
| `http://localhost:4000/api/health` | `{ "ok": true }` |
| `http://localhost:4000/api/db-test` | `{ "ok": true, "database": {...} }` |
| `http://localhost:4000/api/user/me` | `{ "ok": true, "user": {...} }` (cần JWT) |

---

## 10. Changelog

> Ghi lại mọi thay đổi quan trọng theo thứ tự thời gian mới nhất lên trên.

| Ngày | Thay đổi | Mô tả chi tiết |
|---|---|---|
| 2026-05-14 | Chuyển sang dùng Icons8 | Tạo component `Icon.jsx`, thay toàn bộ emoji ở UI sang icon 2D/3D đẹp mắt |
| 2026-05-14 | Thêm `SKILL.md` | File quy tắc làm việc cho AI — bắt buộc đọc trước khi thay đổi dự án |
| 2026-05-14 | Cập nhật `ARCHITECTURE.md` | Phản ánh toàn bộ thay đổi từ phiên làm việc này |
| 2026-05-14 | Thêm Dashboard (`/dashboard`) | Trang xem quyền và gói đăng ký, bảo vệ bởi `ProtectedRoute` |
| 2026-05-14 | Thêm `ProtectedRoute` | HOC tự động redirect `/login` nếu chưa đăng nhập |
| 2026-05-14 | Thêm `GET /api/user/me` | API trả thông tin user đầy đủ, có JWT middleware `requireAuth` |
| 2026-05-14 | Thêm cột `role`, `plan` vào DB | Migration: `database/add_role_plan.sql` |
| 2026-05-14 | Redirect sau login → `/dashboard` | Trước đây redirect về `/` |
| 2026-05-14 | Hoàn thiện `About.jsx` | Nội dung thật: team, tech stack, mission, contact |
| 2026-05-14 | Hoàn thiện `Dowload.jsx` | Platform cards, patch notes, system requirements |
| 2026-05-14 | Hoàn thiện `project.jsx` | Progress bar, feature highlights, project cards |
| 2026-05-14 | Sửa `story.js` image paths | Chuyển từ path string sang Vite import (production-safe) |
| 2026-05-14 | Tạo `src/hooks/useApp.js` | Custom hooks: `useAuth`, `useLocalStorage`, `useDocumentTitle` |
| 2026-05-14 | Refactor `App.jsx` | Dùng `useAuth` hook thay vì quản lý state thủ công |
