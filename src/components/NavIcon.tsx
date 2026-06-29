import type { HubNavIcon } from '../lib/hubNav';

interface NavIconProps {
  name: HubNavIcon;
  className?: string;
}

export function NavIcon({ name, className }: NavIconProps) {
  return (
    <span className={`material-symbols-outlined ${className ?? ''}`} aria-hidden>
      {name}
    </span>
  );
}
