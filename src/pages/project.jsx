import Icon from '../components/Icon.jsx';

function Project() {
  const projects = [
    {
      name: 'MMORPG 2D — T-beat World',
      status: 'Đang phát triển',
      statusColor: '#43b1b1',
      icon: '🗡️',
      desc: 'Game MMORPG 2D top-down với hệ thống chiến đấu combo, EXP & lên cấp, Day/Night cycle và cốt truyện phong phú. Được xây dựng bằng Unity + C#.',
      tags: ['Unity', 'C#', '2D', 'MMORPG', 'Top-down'],
      progress: 35,
    },
    {
      name: 'T-beat Studio Website',
      status: 'Đang phát triển',
      statusColor: '#43b1b1',
      icon: 'globe',
      desc: 'Website giới thiệu dự án game, tích hợp hệ thống đăng nhập, xem cốt truyện và tải game. Được xây dựng bằng React + Vite + Express + MySQL.',
      tags: ['React', 'Vite', 'Express', 'MySQL', 'JWT'],
      progress: 60,
    },
  ];

  const features = [
    { icon: '⚔️', title: 'Combat System', desc: 'Hệ thống chiến đấu combo với IDamageable interface, Object Pooling cho damage text' },
    { icon: 'line-chart', title: 'EXP & Level Up', desc: 'Hệ thống EXP, lên cấp với hiệu ứng hologram và level-up effect' },
    { icon: 'moon-symbol', title: 'Day/Night Cycle', desc: 'Chu kỳ ngày đêm tự động với Global Light 2D và Gradient màu sắc' },
    { icon: 'brain', title: 'Enemy AI', desc: 'AI địch với Chase Range, Attack Range và Flip theo hướng di chuyển' },
    { icon: 'backpack', title: 'Equipment System', desc: 'Hệ thống trang bị vũ khí ảnh hưởng đến chiến đấu và animation' },
    { icon: '🔐', title: 'Auth System', desc: 'Đăng nhập / đăng ký bảo mật với bcrypt + JWT + MySQL' },
  ];

  return (
    <section className="intro page-entry-fade">
      <p className="eyebrow">Our Projects</p>
      <h1>Tổng Hợp Dự Án.</h1>
      <p>
        Tất cả các dự án đang được phát triển bởi T-beat Studio.
        Mỗi dự án đều là một bước tiến trên con đường xây dựng thế giới game mơ ước.
      </p>

      {/* Project Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '48px' }}>
        {projects.map((proj, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '32px',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(67,177,177,0.4)';
              e.currentTarget.style.background = 'rgba(67,177,177,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <Icon name={proj.icon} size={48} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px', color: 'white', fontSize: '1.2rem' }}>{proj.name}</h3>
                <span style={{
                  display: 'inline-block',
                  background: `rgba(${proj.statusColor === '#43b1b1' ? '67,177,177' : '255,215,0'},0.15)`,
                  border: `1px solid ${proj.statusColor}55`,
                  color: proj.statusColor,
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}>● {proj.status}</span>
              </div>
            </div>

            <p style={{ margin: '0 0 20px', color: '#d1d5db', lineHeight: 1.7, fontSize: '0.95rem' }}>{proj.desc}</p>

            {/* Progress Bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Tiến độ hoàn thành</span>
                <span style={{ color: '#43b1b1', fontSize: '0.8rem', fontWeight: 700 }}>{proj.progress}%</span>
              </div>
              <div style={{
                width: '100%', height: '6px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '99px', overflow: 'hidden',
              }}>
                <div style={{
                  width: `${proj.progress}%`, height: '100%',
                  background: 'linear-gradient(90deg, #43b1b1, #7eddd8)',
                  borderRadius: '99px',
                  transition: 'width 1s ease',
                }} />
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {proj.tags.map((tag, j) => (
                <span key={j} style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#d1d5db',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Highlights */}
      <div style={{ marginTop: '60px' }}>
        <p className="eyebrow" style={{ marginBottom: '24px' }}>
          ✨ Tính Năng Nổi Bật
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '20px',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ marginBottom: '10px' }}>
                <Icon name={f.icon} size={40} />
              </div>
              <h4 style={{ margin: '0 0 6px', color: 'gold', fontSize: '0.95rem' }}>{f.title}</h4>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.82rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
