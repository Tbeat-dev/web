import Icon from '../components/Icon.jsx';

function About() {
  const members = [
    {
      name: 'T-beat Studio',
      role: 'Game Developer & Founder',
      desc: 'Sinh viên đam mê công nghệ, lập trình game và phát triển web. Người sáng lập và đầu não duy nhất đứng sau dự án T-beat Studio.',
      icon: 'console',
    },
  ];

  const techStack = [
    { name: 'Unity', icon: 'joystick', desc: 'Engine phát triển game 2D MMORPG' },
    { name: 'React + Vite', icon: 'atom', desc: 'Frontend của website dự án' },
    { name: 'Express + MySQL', icon: 'database', desc: 'Backend API và cơ sở dữ liệu' },
    { name: 'C#', icon: 'laptop', desc: 'Ngôn ngữ lập trình game' },
  ];

  return (
    <section className="intro page-entry-fade">
      <p className="eyebrow">About Us</p>
      <h1>T-beat Studio.</h1>
      <p>
        T-beat Studio là một indie studio được thành lập bởi một sinh viên đam mê game và công nghệ.
        Chúng tôi đang xây dựng một dự án MMORPG 2D đầy tham vọng — nơi cốt truyện phong phú,
        hệ thống chiến đấu sâu sắc và cộng đồng người chơi hòa quyện thành một trải nghiệm độc đáo.
      </p>

      {/* Mission */}
      <div style={{
        marginTop: '60px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '36px',
        backdropFilter: 'blur(10px)',
      }}>
        <p className="eyebrow" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="target" size={24} /> Sứ Mệnh
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.9', margin: 0 }}>
          Tạo ra một thế giới game nơi mỗi người chơi cảm thấy câu chuyện của mình thực sự quan trọng.
          Không cần ngân sách triệu đô — chỉ cần đam mê, kỹ năng và sự kiên trì. T-beat Studio
          chứng minh rằng một cá nhân cũng có thể tạo ra trải nghiệm đáng nhớ.
        </p>
      </div>

      {/* Team */}
      <div style={{ marginTop: '60px' }}>
        <p className="eyebrow" style={{ marginBottom: '24px' }}>
          👥 Đội Ngũ
        </p>
        {members.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '16px',
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(67,177,177,0.1)',
              borderRadius: '50%',
              border: '1px solid rgba(67,177,177,0.3)',
              flexShrink: 0,
            }}>
              <Icon name={m.icon} size={40} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', color: 'gold', fontSize: '1.15rem' }}>{m.name}</h3>
              <p style={{ margin: '0 0 8px', color: '#43b1b1', fontSize: '0.85rem', fontWeight: 700 }}>{m.role}</p>
              <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.6 }}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div style={{ marginTop: '60px' }}>
        <p className="eyebrow" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="maintenance" size={24} /> Công Nghệ Sử Dụng
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {techStack.map((t, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              padding: '24px 20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(67,177,177,0.5)';
                e.currentTarget.style.background = 'rgba(67,177,177,0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <Icon name={t.icon} size={48} />
              </div>
              <h4 style={{ margin: '0 0 8px', color: 'white', fontSize: '1rem' }}>{t.name}</h4>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.8rem' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{
        marginTop: '60px',
        textAlign: 'center',
        padding: '40px',
        background: 'linear-gradient(135deg, rgba(67,177,177,0.08), rgba(255,215,0,0.04))',
        border: '1px solid rgba(67,177,177,0.2)',
        borderRadius: '20px',
      }}>
        <p className="eyebrow">
          📬 Liên Hệ
        </p>
        <p style={{ color: '#d1d5db', fontSize: '1rem' }}>
          Có ý tưởng, góp ý hoặc muốn đồng hành cùng dự án? Hãy liên hệ với chúng tôi!
        </p>
        <a
          href="mailto:tbeat.studio@gmail.com"
          style={{
            display: 'inline-block',
            marginTop: '12px',
            padding: '12px 28px',
            background: '#43b1b1',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#38a3a3'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#43b1b1'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          tbeat.studio@gmail.com
        </a>
      </div>
    </section>
  );
}

export default About;
