interface BlackLineLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

const sizes = { sm: 28, md: 36, lg: 48 };

export function BlackLineLogo({ size = 'md', showSubtitle = false }: BlackLineLogoProps) {
  const px = sizes[size];
  return (
    <div className={`bl-logo bl-logo--${size}`}>
      <img src={`${import.meta.env.BASE_URL}img/favicon.svg`} alt="" width={px} height={px} className="bl-logo__mark" />
      <div className="bl-logo__text">
        <span className="bl-logo__name">BlackLine</span>
        {showSubtitle ? <span className="bl-logo__sub">Studio Automotivo</span> : null}
      </div>
    </div>
  );
}
