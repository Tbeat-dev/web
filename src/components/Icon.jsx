export default function Icon({ name, size = 48, iconStyle = 'color', className, style }) {
  // Nếu name chứa ký tự đặc biệt (emoji), render dưới dạng text
  const isEmoji = /[^\x00-\x7F]/.test(name);

  if (isEmoji) {
    return (
      <span className={className} style={{ fontSize: `${size}px`, lineHeight: 1, ...style }}>
        {name}
      </span>
    );
  }

  return (
    <img 
      src={`https://img.icons8.com/${iconStyle}/${size}/${name}.png`} 
      alt={name} 
      className={className}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        verticalAlign: 'middle', 
        display: 'inline-block',
        ...style 
      }}
      loading="lazy"
    />
  );
}
