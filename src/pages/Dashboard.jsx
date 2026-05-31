import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useApp.js';
import Icon from '../components/Icon.jsx';

// Định nghĩa các gói và quyền của từng gói
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    icon: 'leaf',
    price: 'Miễn phí',
    color: '#6b7280',
    glowColor: 'rgba(107,114,128,0.3)',
    perks: [
      { label: 'Xem trang giới thiệu', granted: true },
      { label: 'Xem danh sách chương truyện', granted: true },
      { label: 'Đọc nội dung chương (có login)', granted: true },
      { label: 'Tải game Alpha', granted: false },
      { label: 'Truy cập Discord VIP', granted: false },
      { label: 'Nhận vật phẩm độc quyền trong game', granted: false },
      { label: 'Đặt tên nhân vật độc quyền', granted: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: 'star',
    price: '49.000đ / tháng',
    color: '#43b1b1',
    glowColor: 'rgba(67,177,177,0.3)',
    recommended: true,
    perks: [
      { label: 'Xem trang giới thiệu', granted: true },
      { label: 'Xem danh sách chương truyện', granted: true },
      { label: 'Đọc nội dung chương (có login)', granted: true },
      { label: 'Tải game Alpha', granted: true },
      { label: 'Truy cập Discord VIP', granted: true },
      { label: 'Nhận vật phẩm độc quyền trong game', granted: false },
      { label: 'Đặt tên nhân vật độc quyền', granted: false },
    ],
  },
  {
    id: 'vip',
    name: 'VIP',
    icon: 'crown',
    price: '129.000đ / tháng',
    color: '#ffd700',
    glowColor: 'rgba(255,215,0,0.3)',
    perks: [
      { label: 'Xem trang giới thiệu', granted: true },
      { label: 'Xem danh sách chương truyện', granted: true },
      { label: 'Đọc nội dung chương (có login)', granted: true },
      { label: 'Tải game Alpha', granted: true },
      { label: 'Truy cập Discord VIP', granted: true },
      { label: 'Nhận vật phẩm độc quyền trong game', granted: true },
      { label: 'Đặt tên nhân vật độc quyền', granted: true },
    ],
  },
];

// Map role từ DB sang plan id
function getPlanFromRole(role) {
  if (role === 'vip') return 'vip';
  if (role === 'premium') return 'premium';
  return 'free';
}

function Dashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgradeMsg, setUpgradeMsg] = useState('');

  // Lấy thông tin profile đầy đủ từ server (có role, plan, created_at)
  useEffect(() => {
    const token = window.localStorage.getItem('authToken');
    if (!token) { setLoading(false); return; }

    fetch('/api/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) setProfile(data.user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const currentPlanId = getPlanFromRole(profile?.role);
  const currentPlan = PLANS.find(p => p.id === currentPlanId);

  const handleUpgrade = (planId) => {
    setUpgradeMsg(`Tính năng nạp gói "${planId.toUpperCase()}" đang được phát triển. Vui lòng liên hệ admin!`);
    setTimeout(() => setUpgradeMsg(''), 4000);
  };

  // Thống kê nhanh
  const quickStats = [
    { icon: 'calendar', label: 'Ngày tham gia', value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString('vi-VN') : '—' },
    { icon: 'medal', label: 'Gói hiện tại', value: currentPlan?.name || 'Free' },
    { icon: 'key', label: 'Quyền truy cập', value: `${currentPlan?.perks.filter(p => p.granted).length || 3} / ${PLANS[2].perks.length}` },
    { icon: 'email', label: 'Email', value: profile?.email || user?.email || '—' },
  ];

  if (loading) {
    return (
      <section className="intro" style={{ textAlign: 'center', paddingTop: '80px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: '#9ca3af' }}>Đang tải thông tin...</p>
      </section>
    );
  }

  return (
    <section className="intro page-entry-fade" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <p className="eyebrow">Dashboard</p>
      <h1>Xin chào, {profile?.name || user?.name}! <Icon name="waving-hand" size={48} /></h1>

      {/* Upgrade Notice Toast */}
      {upgradeMsg && (
        <div style={{
          position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
          background: '#1e3a3a', border: '1px solid #43b1b1', color: '#7eddd8',
          padding: '14px 28px', borderRadius: '12px', zIndex: 200,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)', fontWeight: 600,
          animation: 'fadeInUp 0.3s ease',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Icon name="info" size={20} /> {upgradeMsg}
        </div>
      )}

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginTop: '40px',
      }}>
        {quickStats.map((stat, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ marginBottom: '8px' }}><Icon name={stat.icon} size={40} /></div>
            <div style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              {stat.label}
            </div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', wordBreak: 'break-all' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Current Plan Banner */}
      <div style={{
        marginTop: '40px',
        padding: '28px 32px',
        background: `linear-gradient(135deg, ${currentPlan.glowColor}, rgba(0,0,0,0.3))`,
        border: `1px solid ${currentPlan.color}55`,
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
        <div style={{ fontSize: '3rem' }}>{currentPlan.icon}</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 4px', color: currentPlan.color, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Gói hiện tại
          </p>
          <h3 style={{ margin: '0 0 6px', color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name={currentPlan.icon} size={40} /> {currentPlan.name}
          </h3>
          <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.85rem' }}>
            {currentPlanId === 'free' ? 'Nâng cấp để mở khóa toàn bộ tính năng!' : `Gói của bạn: ${currentPlan.price}`}
          </p>
        </div>
        {currentPlanId === 'free' && (
          <button
            onClick={() => handleUpgrade('premium')}
            style={{
              padding: '12px 24px', borderRadius: '10px', border: 'none',
              background: '#43b1b1', color: 'white', fontWeight: 700,
              fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#38a3a3'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#43b1b1'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Icon name="lightning" size={20} /> Nâng cấp ngay
          </button>
        )}
      </div>

      {/* Permissions List */}
      <div style={{ marginTop: '40px' }}>
        <p className="eyebrow" style={{ marginBottom: '20px' }}>🔑 Quyền Truy Cập Của Bạn</p>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          {currentPlan.perks.map((perk, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 20px',
              borderBottom: i < currentPlan.perks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: perk.granted ? 'transparent' : 'rgba(0,0,0,0.1)',
            }}>
              <span style={{ flexShrink: 0, display: 'flex' }}>
                <Icon name={perk.granted ? "checkmark" : "lock"} size={20} />
              </span>
              <span style={{
                color: perk.granted ? '#e5e7eb' : '#4b5563',
                fontSize: '0.9rem',
                textDecoration: perk.granted ? 'none' : 'none',
              }}>
                {perk.label}
              </span>
              {!perk.granted && (
                <span style={{
                  marginLeft: 'auto', fontSize: '0.72rem', color: '#43b1b1',
                  fontWeight: 600, whiteSpace: 'nowrap',
                }}>
                  Cần nâng cấp
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Plan Comparison Cards */}
      <div style={{ marginTop: '48px' }}>
        <p className="eyebrow" style={{ marginBottom: '24px' }}>💎 Các Gói Đăng Ký</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {PLANS.map((plan) => {
            const isActive = plan.id === currentPlanId;
            return (
              <div key={plan.id} style={{
                background: isActive
                  ? `linear-gradient(135deg, ${plan.glowColor}, rgba(0,0,0,0.4))`
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? plan.color + '88' : plan.recommended ? plan.color + '44' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '20px',
                padding: '28px 24px',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = plan.color + '66'; e.currentTarget.style.transform = 'translateY(-4px)'; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = plan.recommended ? plan.color + '44' : 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}}
              >
                {/* Badge */}
                {plan.recommended && !isActive && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: plan.color, color: 'black', padding: '3px 16px',
                    borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}>✨ Phổ biến nhất</div>
                )}
                {isActive && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: plan.color, color: 'black', padding: '3px 16px',
                    borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}><Icon name="checkmark" size={12} /> Gói của bạn</div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ marginBottom: '8px' }}><Icon name={plan.icon} size={64} /></div>
                  <h3 style={{ margin: '0 0 4px', color: plan.color, fontSize: '1.2rem' }}>{plan.name}</h3>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600 }}>{plan.price}</p>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.perks.map((perk, i) => (
                    <li key={i} style={{
                      display: 'flex', gap: '8px', alignItems: 'flex-start',
                      color: perk.granted ? '#d1d5db' : '#4b5563',
                      fontSize: '0.82rem', lineHeight: 1.5,
                    }}>
                      <span style={{ flexShrink: 0, marginTop: '2px' }}>
                        <Icon name={perk.granted ? "checkmark" : "cancel"} size={14} />
                      </span>
                      {perk.label}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => !isActive && handleUpgrade(plan.id)}
                  disabled={isActive}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '10px',
                    border: isActive ? 'none' : `1px solid ${plan.color}88`,
                    background: isActive ? plan.color + '22' : plan.id === 'free' ? 'transparent' : plan.color,
                    color: isActive ? plan.color : plan.id === 'free' ? '#6b7280' : 'black',
                    fontWeight: 700, fontSize: '0.9rem',
                    cursor: isActive ? 'default' : 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  {isActive ? <><Icon name="checkmark" size={16} /> Đang dùng</> : plan.id === 'free' ? 'Gói cơ bản' : `Nâng lên ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div style={{
        marginTop: '48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '12px',
      }}>
        {[
          { icon: 'book', label: 'Xem cốt truyện', to: '/history' },
          { icon: 'download', label: 'Tải game', to: '/download' },
          { icon: 'sword', label: 'Dự án', to: '/project' },
          { icon: 'info', label: 'Về chúng tôi', to: '/about' },
        ].map((link, i) => (
          <Link key={i} to={link.to} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '8px', padding: '20px 12px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px', textDecoration: 'none', color: '#d1d5db',
            fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(67,177,177,0.4)'; e.currentTarget.style.color = '#43b1b1'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ marginBottom: '8px' }}><Icon name={link.icon} size={40} /></div>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div style={{ marginTop: '48px', textAlign: 'center', paddingBottom: '40px' }}>
        <button
          onClick={logout}
          style={{
            padding: '10px 28px', borderRadius: '10px',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            color: '#fca5a5', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '0 auto'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
        >
          <Icon name="exit" size={20} /> Đăng xuất
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
