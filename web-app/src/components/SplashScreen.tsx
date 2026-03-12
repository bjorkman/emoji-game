import {
  splash, splashTicker, tickerRowLeft, tickerRowRight,
  idolCard, idolCardImg, idolCardOverlay, idolCardName,
  splashVignette, splashHero, splashEyebrow,
  splashTitleBlock, splashTitle, splashTagline,
  splashInstructions, instIcon, btnPlay, btnPlayArrow, btnChoose,
} from './SplashScreen.css';

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
  onChooseGame: () => void;
}

function IdolCard({ card }: Readonly<{ card: SplashCard }>) {
  return (
    <div className={idolCard}>
      <img src={card.img} alt={card.name} className={idolCardImg} />
      <div className={idolCardOverlay} />
      <div className={idolCardName}>{card.name}</div>
    </div>
  );
}

export default function SplashScreen({ title, eyebrow, tagline, instructions, cards, onPlay, onChooseGame }: Readonly<Props>) {
  const hasTicker = cards.length > 0;
  const mid = Math.ceil(cards.length / 2);
  const ROW1 = hasTicker ? [...cards.slice(0, mid), ...cards.slice(0, mid)] : [];
  const ROW2 = hasTicker ? [...cards.slice(mid), ...cards.slice(mid)] : [];

  return (
    <div className={splash}>

      {hasTicker && (
        <div className={splashTicker} aria-hidden="true">
          <div className={tickerRowLeft}>
            {ROW1.map((c, i) => <IdolCard key={'row1-' + i} card={c} />)}
          </div>
          {ROW2.length > 0 && (
            <div className={tickerRowRight}>
              {ROW2.map((c, i) => <IdolCard key={'row2-' + i} card={c} />)}
            </div>
          )}
          <div className={tickerRowLeft}>
            {ROW1.map((c, i) => <IdolCard key={'row3-' + i} card={c} />)}
          </div>
        </div>
      )}

      <div className={splashHero}>
        <div className={splashEyebrow}>{eyebrow}</div>

        <div className={splashTitleBlock}>
          <h1 className={splashTitle}>{title}</h1>
          <p className={splashTagline}>{tagline}</p>
        </div>

        <ul className={splashInstructions}>
          {instructions.map(([icon, text]) => (
            <li key={text}>
              <span className={instIcon}>{icon}</span>
              {text}
            </li>
          ))}
        </ul>

        <button className={btnPlay} onClick={onPlay}>
          <span>Play Now</span>
          <span className={btnPlayArrow}>→</span>
        </button>

        <button className={btnChoose} onClick={onChooseGame}>
          ← Choose Game
        </button>
      </div>

      <div className={splashVignette} aria-hidden="true" />
    </div>
  );
}
