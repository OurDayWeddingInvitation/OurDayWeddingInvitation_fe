type FadeSpinnerProps = {
  size?: number;
  color?: string;
};

export const FadeSpinner = ({
  size = 20,
  color = "#999",
}: FadeSpinnerProps) => {
  const COUNT = 9;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {Array.from({ length: COUNT }).map((_, i) => {
        const rotate = (360 / COUNT) * i; // 40deg
        const delay = -(1 - i / COUNT); // stagger

        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 block"
            style={{
              width: size * 0.08,
              height: size * 0.28,
              backgroundColor: color,
              borderRadius: size * 0.04,
              transform: `
                rotate(${rotate}deg)
                translate(0, -${size * 0.42}px)
              `,
              animation: "fade-spinner 1.2s linear infinite",
              animationDelay: `${delay}s`,
              opacity: 0.25,
            }}
          />
        );
      })}
    </div>
  );
};
