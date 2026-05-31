import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import Project from './pages/project.jsx';        
import History from './pages/History.jsx';        
import StoryDetail from './pages/StoryDetail.jsx';
import Download from './pages/Dowload.jsx';       
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';      
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Icon from './components/Icon.jsx';
import backgroundVideo from './assets/videos/comic.mp4';
import { useAuth } from './hooks/useApp.js';
import './styles/global.css';

function App() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <main className="app-shell">
        <video 
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="background-video"
          src={backgroundVideo}
        >
        </video>
        <nav className="nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/about">Giới Thiệu</Link>
          <Link to="/project">Dự án</Link>
          <Link to="/history">Cốt truyện</Link>
          <Link to="/download">Tải xuống</Link>

          {user ? (
            <div className="nav-auth">
              <Link to="/dashboard" className="dashboard-link">
                <Icon name="bar-chart" size={20} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
                {user.name}
              </Link>
              <button onClick={logout} className="logout-button">Đăng xuất</button>
            </div>
          ) : (
            <Link className="login-link" to="/login">Đăng nhập</Link>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/chapter/:id" element={<StoryDetail />} />
          <Route path="/download" element={<Download />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
