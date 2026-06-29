interface BlackLineLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

const heights = { sm: 36, md: 48, lg: 64 };

export function BlackLineLogo({ size = 'md' }: BlackLineLogoProps) {
  const h = heights[size];
  return (
    <div className={`bl-logo bl-logo--${size}`}>
      <img
        src={`${import.meta.env.BASE_URL}img/logo-blackline.png`}
        alt="BlackLine Studio Automotivo"
        className="bl-logo__img"
        height={h}
      />
    </div>
  );
}
