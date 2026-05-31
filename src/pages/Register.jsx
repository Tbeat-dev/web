import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
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
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message ?? 'Registration failed');
        setMessageType('error');
        return;
      }

      setMessage('Tạo tài khoản thành công! Đang chuyển về trang đăng nhập...');
      setMessageType('success');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setMessage('Cannot connect to the server');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-header">
          <p className="eyebrow">Join us</p>
          <h1>Tạo tài khoản T-beat Studio</h1>
          <p>Bắt đầu quản lý các dự án âm nhạc của bạn.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            Full Name
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
          </label>

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
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </label>

          <div className="login-options">
            <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
          </div>

          {message ? (
            <p className={`login-message ${messageType}`}>{message}</p>
          ) : null}

          <button className="login-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="signup-text">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
