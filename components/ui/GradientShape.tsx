type Shape = 'circle' | 'diamond' | 'square';

export function GradientShape({ shape = 'circle', size = 32 }: { shape?: Shape; size?: number }) {
  const radius = shape === 'circle' ? '50%' : shape === 'diamond' ? '0' : '6px';
  const transform = shape === 'diamond' ? 'rotate(45deg)' : 'none';
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: 'var(--ajx-gradient)',
        transform,
        flexShrink: 0,
        boxShadow: '0 4px 14px -4px rgba(99,102,241,.5)',
      }}
    />
  );
}
