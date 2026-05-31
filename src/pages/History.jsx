import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storyData } from '../data/story.js';

function History() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginMsg, setShowLoginMsg] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = window.localStorage.getItem('authUser');
        setIsLoggedIn(!!user);
    }, []);

    const handleChapterClick = (e, path) => {
        if (!isLoggedIn) {
            e.preventDefault();
            setShowLoginMsg(true);
            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => setShowLoginMsg(false), 3000);
        } else {
            navigate(path);
        }
    };

    return (
        <section className="intro page-entry-fade">
            <p className="eyebrow">History & Lore</p>
            <h1>{storyData.title}</h1>

            {showLoginMsg && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#ef4444',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    zIndex: 100,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    fontWeight: 'bold',
                    animation: 'fantasyGlow 2s infinite'
                }}>
                    ⚠️ Bạn phải đăng nhập để xem nội dung này!
                </div>
            )}
            
            <div className="chapters-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '32px', 
                marginTop: '50px' 
            }}>
                {storyData.chapters.map((chapter) => (
                    <div 
                        key={chapter.id} 
                        onClick={(e) => handleChapterClick(e, chapter.path)}
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                        <div className="chapter-card" style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: isLoggedIn ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.05)',
                            transition: 'all 0.3s ease',
                            opacity: isLoggedIn ? 1 : 0.7,
                            filter: isLoggedIn ? 'none' : 'grayscale(0.5)'
                        }}>
                            {/* Hiển thị ảnh banner hoặc ảnh đầu tiên của chương */}
                            <div style={{ 
                                width: '100%', 
                                aspectRatio: '16/9', 
                                background: 'linear-gradient(45deg, #1a1a1a, #333)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {(chapter.banner || (chapter.images && chapter.images[0])) ? (
                                    <img 
                                        src={chapter.banner || chapter.images[0]} 
                                        alt={chapter.title} 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            opacity: isLoggedIn ? 1 : 0.3 // Làm mờ ảnh nếu chưa đăng nhập
                                        }} 
                                    />
                                ) : (
                                    <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }}>IMAGE</span>
                                )}

                                {!isLoggedIn && (
                                    <div style={{
                                        position: 'absolute',
                                        fontSize: '2rem',
                                        zIndex: 2
                                    }}>🔒</div>
                                )}
                            </div>
                            
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <h3 style={{ color: 'white', margin: 0, fontSize: '1.1rem' }}>{chapter.title}</h3>
                                <p style={{ color: isLoggedIn ? 'gold' : '#9ca3af', fontSize: '0.85rem', marginTop: '8px' }}>
                                    {isLoggedIn ? 'Xem ngay →' : 'Yêu cầu đăng nhập'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default History;