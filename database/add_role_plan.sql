-- ============================================================
-- Migration: Thêm cột role và plan vào bảng users
-- Chạy 1 lần trong MySQL sau khi đã có bảng users
-- ============================================================

-- Thêm cột role (free | premium | vip | admin)
ALTER TABLE users
  ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'free'
  AFTER password_hash;

-- Thêm cột plan (free | premium | vip)
ALTER TABLE users
  ADD COLUMN plan VARCHAR(20) NOT NULL DEFAULT 'free'
  AFTER role;

-- Kiểm tra kết quả
DESCRIBE users;

-- ============================================================
-- Cấu trúc bảng users sau migration:
-- ============================================================
-- id            INT AUTO_INCREMENT PRIMARY KEY
-- name          VARCHAR(255) NOT NULL
-- email         VARCHAR(255) NOT NULL UNIQUE
-- password_hash VARCHAR(255) NOT NULL
-- role          VARCHAR(20)  NOT NULL DEFAULT 'free'
-- plan          VARCHAR(20)  NOT NULL DEFAULT 'free'
-- created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
-- ============================================================

-- Cập nhật demo user lên VIP để test dashboard (tuỳ chọn)
-- UPDATE users SET role = 'vip', plan = 'vip' WHERE email = 'demo@example.com';
