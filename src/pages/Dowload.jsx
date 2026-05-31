import Icon from '../components/Icon.jsx';

function Download() {
  const platforms = [
    {
      name: 'Windows',
      icon: 'windows-10',
      version: 'v0.1.0 Alpha',
      size: 'Sắp ra mắt',
      available: false,
    },
    {
      name: 'Android',
      icon: '📱',
      version: 'v0.1.0 Alpha',
      size: 'Sắp ra mắt',
      available: false,
    },
  ];

  const patches = [
    { version: 'v0.1.0', date: '2025 Q4', note: 'Alpha release đầu tiên — hệ thống chiến đấu, di chuyển và cốt truyện chương 1.' },
    { version: 'v0.0.9', date: '2025 Q3', note: 'Internal build — Object Pooling, Day/Night cycle, EXP system.' },
  ];

  return (
    <section className="intro page-entry-fade">
      <p className="eyebrow">Downloads</p>
      <h1>Tải Xuống Game.</h1>
      <p>
        Game hiện đang trong giai đoạn phát triển tích cực. Bản alpha sẽ sớm được phát hành
        cho cộng đồng thử nghiệm. Đăng ký tài khoản để nhận thông báo sớm nhất!
      </p>

      {/* Platform Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        marginTop: '48px',
      }}>
        {platforms.map((p, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '32px 28px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ marginBottom: '16px' }}>
              <Icon name={p.icon} size={64} />
            </div>
            <h3 style={{ margin: '0 0 8px', color: 'white', fontSize: '1.2rem' }}>{p.name}</h3>
            <p style={{ margin: '0 0 4px', color: '#43b1b1', fontSize: '0.85rem', fontWeight: 700 }}>{p.version}</p>
            <p style={{ margin: '0 0 24px', color: '#9ca3af', fontSize: '0.85rem' }}>{p.size}</p>

            <button
              disabled={!p.available}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: p.available ? '#43b1b1' : 'rgba(255,255,255,0.08)',
                color: p.available ? 'white' : '#6b7280',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: p.available ? 'pointer' : 'not-allowed',
              }}
            >
              {p.available ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icon name="download" size={20} /> Tải về {p.name}
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icon name="lock" size={20} /> Chưa phát hành
                </span>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Coming Soon Banner */}
      <div style={{
        marginTop: '48px',
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(255,215,0,0.06), rgba(67,177,177,0.06))',
        border: '1px solid rgba(255,215,0,0.2)',
        borderRadius: '20px',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0 0 12px' }}>
          <Icon name="hourglass" size={48} />
        </p>
        <h3 style={{ color: 'gold', margin: '0 0 12px', fontSize: '1.3rem' }}>Bản Alpha đang được hoàn thiện!</h3>
        <p style={{ color: '#d1d5db', margin: 0, lineHeight: 1.7 }}>
          Đăng ký tài khoản trên website để nhận thông báo ngay khi game ra mắt.
          Những người đăng ký sớm sẽ nhận được phần thưởng đặc biệt trong game!
        </p>
      </div>

      {/* Patch Notes */}
      <div style={{ marginTop: '60px' }}>
        <p className="eyebrow" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="clipboard" size={24} /> Lịch Sử Phiên Bản
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {patches.map((patch, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '20px 24px',
            }}>
              <div style={{ flexShrink: 0, textAlign: 'center' }}>
                <div style={{
                  background: 'rgba(67,177,177,0.15)',
                  border: '1px solid rgba(67,177,177,0.3)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  color: '#43b1b1',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  marginBottom: '4px',
                }}>{patch.version}</div>
                <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{patch.date}</div>
              </div>
              <p style={{ margin: 0, color: '#d1d5db', lineHeight: 1.7, fontSize: '0.95rem' }}>{patch.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Requirements */}
      <div style={{ marginTop: '60px' }}>
        <p className="eyebrow" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="laptop" size={24} /> Yêu Cầu Cấu Hình (Dự Kiến)
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {[
            {
              label: 'Tối thiểu',
              specs: ['OS: Windows 10 64-bit', 'CPU: Intel Core i3', 'RAM: 4 GB', 'GPU: Integrated Graphics', 'Storage: 2 GB'],
            },
            {
              label: 'Khuyến nghị',
              specs: ['OS: Windows 10/11 64-bit', 'CPU: Intel Core i5 / Ryzen 5', 'RAM: 8 GB', 'GPU: GTX 1050 / RX 570', 'Storage: 4 GB SSD'],
            },
          ].map((req, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${i === 1 ? 'rgba(67,177,177,0.3)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '16px',
              padding: '24px',
            }}>
              <h4 style={{ color: i === 1 ? '#43b1b1' : '#9ca3af', margin: '0 0 16px', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i === 1 ? <Icon name="star" size={20} /> : ''}{req.label}
              </h4>
              <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#d1d5db', lineHeight: 2, fontSize: '0.9rem' }}>
                {req.specs.map((s, j) => <li key={j}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Download;