import { useParams, Link } from 'react-router-dom';
import { storyData } from '../data/story.js';

function StoryDetail() {
    const { id } = useParams();
    const chapter = storyData.chapters.find(c => c.id === parseInt(id));

    if (!chapter) {
        return (
            <section className="intro">
                <h1>Không tìm thấy chương này!</h1>
                <Link to="/history" style={{ color: 'gold' }}>Quay lại</Link>
            </section>
        );
    }

    return (
        <section className="intro" style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Focus Mode Overlay - Làm tối nền 70% */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.7)',
                zIndex: -1,
                pointerEvents: 'none'
            }}></div>

            <p className="eyebrow">{chapter.title}</p>
            <h1>Nội dung truyện</h1>

            {/* Banner Chương Truyện */}
            {chapter.banner && (
                <div className="page-entry-fade" style={{ 
                    marginTop: '40px', 
                    width: '100%', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <img src={chapter.banner} alt="Chapter Banner" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
            )}
            
            <div className="story-content" style={{ marginTop: '50px', width: '100%' }}>
                {/* Lặp qua danh sách ảnh của chương */}
                {chapter.images.map((imgUrl, index) => (
                    <div key={index} 
                        className="story-chapter-fade"
                        style={{ 
                            width: '100%', 
                            minHeight: '200px', 
                            background: 'rgba(255,255,255,0.02)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderRadius: '12px',
                            marginBottom: '24px',
                            overflow: 'hidden'
                        }}
                    >
                        <img src={imgUrl} alt={`Trang ${index + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                ))}
                
                <p style={{ textAlign: 'center', lineHeight: '1.8' }}>{chapter.content}</p>
            </div>
            
            <Link to="/history" style={{ display: 'inline-block', marginTop: '40px', color: 'gold', textDecoration: 'none', fontWeight: 'bold' }}>
                ← Quay lại danh sách chương
            </Link>
        </section>
    );
}

export default StoryDetail;
