CREATE DATABASE IF NOT EXISTS newweb;

USE newweb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password_hash)
VALUES ('Demo User', 'demo@example.com', 'replace-this-with-a-real-hash')
ON DUPLICATE KEY UPDATE email = email;
