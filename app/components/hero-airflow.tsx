export function HeroAirflow() {
  return (
    <div className="hero-airflow" aria-hidden="true">
      <svg className="hero-airflow-svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="airflow-gold" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".28" stopColor="#fff8e9" stopOpacity=".72" />
            <stop offset=".72" stopColor="#e7f3ed" stopOpacity=".55" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="airflow-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="airflow-soft" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <g className="hero-airflow-glow" fill="none" stroke="url(#airflow-gold)" strokeLinecap="round" filter="url(#airflow-glow)">
          <path d="M-120 670 C 260 390, 480 760, 820 510 S 1260 210, 1730 330" />
          <path d="M-180 780 C 250 520, 430 820, 850 590 S 1280 350, 1720 470" />
          <path className="hero-airflow-accent" d="M570 645 C 650 600, 720 610, 790 575" />
          <path d="M160 980 C 410 670, 700 820, 970 650 S 1300 480, 1630 560" />
        </g>

        <g className="hero-airflow-ribbons" fill="none" stroke="url(#airflow-gold)" strokeLinecap="round" filter="url(#airflow-soft)">
          <path d="M-120 670 C 260 390, 480 760, 820 510 S 1260 210, 1730 330" />
          <path d="M-180 780 C 250 520, 430 820, 850 590 S 1280 350, 1720 470" />
          <path className="hero-airflow-accent" d="M570 645 C 650 600, 720 610, 790 575" />
          <path d="M160 980 C 410 670, 700 820, 970 650 S 1300 480, 1630 560" />
        </g>
      </svg>
    </div>
  );
}
