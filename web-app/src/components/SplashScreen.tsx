import styles from './SplashScreen.module.css';

interface SplashCard {
  name: string;
  img: string;
}

interface Props {
  title: string;
  eyebrow: string;
  tagline: string;
  instructions: [string, string][];
  cards: SplashCard[];
  onPlay: () => void;
}

function IdolCard({ card }: { card: SplashCard }) {
  return (
    <div className={styles.idolCard}>
      <img src={card.img} alt={card.name} className={styles.idolCardImg} />
      <div className={styles.idolCardOverlay} />
      <div className={styles.idolCardName}>{card.name}</div>
    </div>
  );
}

export default function SplashScreen({ title, eyebrow, tagline, instructions, cards, onPlay }: Props) {
  const hasTicker = cards.length > 0;
  const mid = Math.ceil(cards.length / 2);
  const ROW1 = hasTicker ? [...cards.slice(0, mid), ...cards.slice(0, mid)] : [];
  const ROW2 = hasTicker ? [...cards.slice(mid), ...cards.slice(mid)] : [];

  return (
    <div className={styles.splash}>

      {hasTicker && (
        <div className={styles.splashTicker} aria-hidden="true">
          <div className={`${styles.tickerRow} ${styles.tickerLeft}`}>
            {ROW1.map((c, i) => <IdolCard key={i} card={c} />)}
          </div>
          {ROW2.length > 0 && (
            <div className={`${styles.tickerRow} ${styles.tickerRight}`}>
              {ROW2.map((c, i) => <IdolCard key={i} card={c} />)}
            </div>
          )}
          <div className={`${styles.tickerRow} ${styles.tickerLeft}`}>
            {ROW1.map((c, i) => <IdolCard key={i} card={c} />)}
          </div>
        </div>
      )}

      <div className={styles.splashHero}>
        <div className={styles.splashEyebrow}>{eyebrow}</div>

        <div className={styles.splashTitleBlock}>
          <h1 className={styles.splashTitle}>{title}</h1>
          <p className={styles.splashTagline}>{tagline}</p>
        </div>

        <ul className={styles.splashInstructions}>
          {instructions.map(([icon, text]) => (
            <li key={text}>
              <span className={styles.instIcon}>{icon}</span>
              {text}
            </li>
          ))}
        </ul>

        <button className={styles.btnPlay} onClick={onPlay}>
          <span>Play Now</span>
          <span className={styles.btnPlayArrow}>→</span>
        </button>
      </div>

      <div className={styles.splashVignette} aria-hidden="true" />
    </div>
  );
}
