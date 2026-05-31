import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Đã gộp import cho gọn

function Login() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setMessageType('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message ?? 'Login failed');
        setMessageType('error');
        return;
      }

      // Lưu thông tin đăng nhập vào localStorage
      window.localStorage.setItem('authToken', data.token);
      window.localStorage.setItem('authUser', JSON.stringify(data.user));

      // Bắn sự kiện để App.jsx cập nhật state ngay lập tức
      window.dispatchEvent(new Event('auth-success'));

      setMessage(`Welcome back, ${data.user.name}`);
      setMessageType('success');
      
      // CHUYỂN HƯỚNG VỀ DASHBOARD
      navigate('/dashboard'); 

    } catch {
      setMessage('Cannot connect to the login server');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-header">
          <p className="eyebrow">Member access</p>
          <h1>Đăng nhập vào  T-beat Studio</h1>
          <p>Truy cập bảng điều khiển dự án và tệp phát triển của bạn.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            Email
            <input
              type="email"
              name="email"
              placeholder="demo@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="form-field">
            Password
            <input
              type="password"
              name="password"
              placeholder="demo123456"
              autoComplete="current-password"
              required
            />
          </label>

          <div className="login-options">
            <label className="remember-option">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <Link to="/register">Bạn chưa có tài khoản?</Link>
          </div>

          {message ? (
            <p className={`login-message ${messageType}`}>{message}</p>
          ) : null}

          <button className="login-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-text">
          Ví dụ: <strong>demo@example.com</strong> /{' '}
          <strong>demo123456</strong>
        </p>
      </div>
    </section>
  );
}

export default Login;