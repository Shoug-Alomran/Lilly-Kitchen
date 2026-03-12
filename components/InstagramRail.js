export default function InstagramRail({ items }) {
  const loopItems = [...items, ...items];

  return (
    <div className="ig-marquee">
      <div className="ig-track">
        {loopItems.map((item, index) => (
          <a
            key={`${item.id}-${index}`}
            className="ig-tile"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
          >
            <div className={`ig-tile-bg ${item.className}`} />
            <div className="ig-overlay">♥ {item.likes}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
