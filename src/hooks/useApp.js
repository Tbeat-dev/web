import { useState, useEffect } from 'react';

/**
 * useAuth — Quản lý trạng thái đăng nhập người dùng
 * 
 * Trả về:
 * - user: object thông tin user (null nếu chưa đăng nhập)
 * - isLoggedIn: boolean
 * - logout: hàm đăng xuất
 * - refreshAuth: đọc lại từ localStorage
 */
export function useAuth() {
  const [user, setUser] = useState(null);

  const refreshAuth = () => {
    const saved = window.localStorage.getItem('authUser');
    setUser(saved ? JSON.parse(saved) : null);
  };

  useEffect(() => {
    refreshAuth();

    const handleAuthChange = () => refreshAuth();
    window.addEventListener('auth-success', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('auth-success', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const logout = () => {
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('authUser');
    setUser(null);
    window.location.href = '/';
  };

  return {
    user,
    isLoggedIn: !!user,
    logout,
    refreshAuth,
  };
}

/**
 * useLocalStorage — Đọc/ghi localStorage với React state
 * 
 * @param {string} key - Key trong localStorage
 * @param {*} initialValue - Giá trị mặc định nếu chưa có
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`useLocalStorage: Error setting key "${key}"`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * useDocumentTitle — Tự động cập nhật <title> của trang
 * 
 * @param {string} title - Tiêu đề trang
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | T-beat Studio` : 'T-beat Studio';
    return () => {
      document.title = prev;
    };
  }, [title]);
}
