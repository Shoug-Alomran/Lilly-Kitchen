export default function InstagramRail({ items }) {
  const sequenceItems = [...items, ...items];
  const loopCopies = [0, 1];

  return (
    <div className="ig-marquee">
      <div className="ig-track">
        {loopCopies.map((copyIndex) => (
          <div
            key={copyIndex}
            className="ig-track-group"
            aria-hidden={copyIndex > 0 ? "true" : undefined}
          >
            {sequenceItems.map((item, itemIndex) => (
              <a
                key={`${item.id}-${copyIndex}-${itemIndex}`}
                className="ig-tile"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                tabIndex={copyIndex > 0 ? -1 : undefined}
              >
                <div className={`ig-tile-bg ${item.className}`}>
                  <div className="ig-photo-plate" />
                  <div className="ig-photo-garnish ig-photo-garnish--one" />
                  <div className="ig-photo-garnish ig-photo-garnish--two" />
                  <div className="ig-photo-shine" />
                </div>
                <div className="ig-overlay">♥ {item.likes}</div>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
