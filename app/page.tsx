"use client";

import { useState } from "react";

type PartOneCard = {
  term: string;
  romanization: string;
  era: string;
  meaning: string;
  scenario: string;
  answer: string;
  options: string[];
  relation: string;
  note: string;
  prompt: string;
};

type PartTwoCard = {
  remix: string;
  format: string;
  answer: string;
  options: string[];
  meaning: string;
  note: string;
  prompt: string;
};

const stylePrompt =
  "Editorial card-game illustration for adult Korean-language learners, playful retro-modern Korean poster style, bold flat shapes, warm cream background, coral red, deep navy and fresh lime palette, expressive adult characters, clear visual storytelling, subtle paper grain, landscape 4:3 composition, no written words, no letters, no logos, no watermark.";

const partOneCards: PartOneCard[] = [
  {
    term: "스불재",
    romanization: "seu-bul-jae",
    era: "2020s internet slang",
    meaning: "I brought this disaster upon myself.",
    scenario: "You ignored every backup reminder. Then your laptop died the night before the deadline.",
    answer: "제 꾀에 제가 넘어간다",
    options: ["제 꾀에 제가 넘어간다", "백지장도 맞들면 낫다", "원숭이도 나무에서 떨어진다"],
    relation: "CLOSE MATCH",
    note: "Both point to suffering the consequences of your own actions. 스불재 is shorter, more casual, and usually self-mocking.",
    prompt: `${stylePrompt} A tired office worker staring in horror at a dead laptop while ignored backup reminder notes pile up around the desk; the disaster is clearly caused by the worker's own choices.`,
  },
  {
    term: "갓생",
    romanization: "gat-saeng",
    era: "2020s lifestyle slang",
    meaning: "A disciplined, productive, admirable life.",
    scenario: "Wake up early, exercise, study Korean, prepare lunch, and still arrive at work on time.",
    answer: "티끌 모아 태산",
    options: ["티끌 모아 태산", "누워서 떡 먹기", "가는 날이 장날"],
    relation: "SAME VIBE",
    note: "갓생 celebrates disciplined living; the proverb emphasizes how small efforts accumulate into something big.",
    prompt: `${stylePrompt} One energetic adult completing a sequence of small morning habits—waking early, stretching, studying Korean, packing a healthy lunch—with tiny completed tasks visually building into a proud mountain shape.`,
  },
  {
    term: "중꺾마",
    romanization: "jung-kkeok-ma",
    era: "2022 sports & gaming meme",
    meaning: "What matters is an unbreakable spirit.",
    scenario: "Your team is far behind, but nobody gives up before the final whistle.",
    answer: "고생 끝에 낙이 온다",
    options: ["고생 끝에 낙이 온다", "우물 안 개구리", "낮말은 새가 듣고 밤말은 쥐가 듣는다"],
    relation: "SAME VIBE",
    note: "The meme focuses on perseverance; the proverb promises that hardship can eventually give way to joy.",
    prompt: `${stylePrompt} A diverse amateur sports team exhausted and far behind on a scoreboard but standing back up together with determined faces, a bright finish line glowing in the distance.`,
  },
  {
    term: "내로남불",
    romanization: "nae-ro-nam-bul",
    era: "2010s–2020s public discourse",
    meaning: "One rule for me, another for you.",
    scenario: "He complains when others are five minutes late, but expects everyone to wait when he is late.",
    answer: "똥 묻은 개가 겨 묻은 개 나무란다",
    options: ["똥 묻은 개가 겨 묻은 개 나무란다", "개천에서 용 난다", "콩 심은 데 콩 난다"],
    relation: "CULTURAL COUSIN",
    note: "Both criticize hypocrisy: someone with a bigger fault judges another person for a smaller one.",
    prompt: `${stylePrompt} A hypocritical adult pointing angrily at a wall clock because a friend is five minutes late, while a second clock and calendar reveal that the accuser arrived much later the previous day.`,
  },
  {
    term: "오히려 좋아",
    romanization: "ohiryeo joa",
    era: "2020s reaction meme",
    meaning: "This might actually be better!",
    scenario: "The café is sold out of the cake you wanted, so you discover an even better fresh dessert.",
    answer: "하늘이 무너져도 솟아날 구멍이 있다",
    options: ["하늘이 무너져도 솟아날 구멍이 있다", "소 잃고 외양간 고친다", "사공이 많으면 배가 산으로 간다"],
    relation: "POSITIVE ENERGY",
    note: "The meme cheerfully reframes a setback. The proverb says a way forward can still be found in a disaster.",
    prompt: `${stylePrompt} An adult customer first disappointed by an empty cake display, then delighted as a baker presents a beautiful fresh dessert from the oven; the setback visibly turns into a lucky discovery.`,
  },
  {
    term: "알잘딱깔센",
    romanization: "al-jal-ttak-kkal-sen",
    era: "late 2010s–2020s slang",
    meaning: "Handle it well, neatly, and with good sense—without being told every detail.",
    scenario: "You give one short instruction. Your coworker understands the whole situation and delivers perfectly.",
    answer: "하나를 보면 열을 안다",
    options: ["하나를 보면 열을 안다", "열 번 찍어 안 넘어가는 나무 없다", "두 손뼉이 맞아야 소리가 난다"],
    relation: "CLOSE MATCH",
    note: "Both praise someone who quickly understands more than what was explicitly shown or explained.",
    prompt: `${stylePrompt} A capable coworker receives one simple sticky note and confidently transforms a messy project table into a perfectly organized presentation while a surprised manager gives a thumbs-up.`,
  },
  {
    term: "엄친아",
    romanization: "eom-chin-a",
    era: "2000s comparison culture",
    meaning: "The impossibly perfect ‘friend’s son’ your mother compares you with.",
    scenario: "Your family praises someone else’s grades, job, manners, cooking, and fitness—all during dinner.",
    answer: "남의 떡이 커 보인다",
    options: ["남의 떡이 커 보인다", "싼 게 비지떡", "세 살 버릇 여든까지 간다"],
    relation: "CULTURAL COUSIN",
    note: "엄친아 captures comparison pressure; the proverb says what belongs to someone else often looks better.",
    prompt: `${stylePrompt} A humorous Korean family dinner where relatives admire an impossibly perfect young adult shown with trophies, a chef apron and exercise gear, while another adult at the table looks overwhelmed by comparison.`,
  },
  {
    term: "느좋",
    romanization: "neu-jo",
    era: "2020s aesthetic slang",
    meaning: "It just has a nice vibe.",
    scenario: "You cannot explain why, but the café’s colors, music, light, and tableware all feel right.",
    answer: "보기 좋은 떡이 먹기도 좋다",
    options: ["보기 좋은 떡이 먹기도 좋다", "그림의 떡", "떡 줄 사람은 생각도 않는데 김칫국부터 마신다"],
    relation: "SAME VIBE",
    note: "느좋 is an intuitive aesthetic reaction. The proverb connects pleasing appearance with a pleasing experience.",
    prompt: `${stylePrompt} A stylish adult entering a beautifully composed Korean café with harmonious lighting, ceramics, plants and dessert, pausing with a delighted expression because the whole atmosphere simply feels right.`,
  },
];

const partTwoCards: PartTwoCard[] = [
  {
    remix: "개똥 SOLD OUT",
    format: "CONSUMER CULTURE REMIX",
    answer: "개똥도 약에 쓰려면 없다",
    options: ["개똥도 약에 쓰려면 없다", "싼 게 비지떡", "그림의 떡"],
    meaning: "Even something common is nowhere to be found exactly when you need it.",
    note: "The remix turns sudden scarcity into an online shopping ‘sold out’ moment.",
    prompt: `${stylePrompt} A comic online shopping scene where an adult urgently searches for a very ordinary humble item, but every shelf and product tile is dramatically empty with red sold-out symbols represented only by shapes, no readable text.`,
  },
  {
    remix: "톨로 주고 그란데로 받는다",
    format: "CAFÉ SIZE REMIX",
    answer: "되로 주고 말로 받는다",
    options: ["되로 주고 말로 받는다", "콩 한 쪽도 나눠 먹는다", "누워서 떡 먹기"],
    meaning: "You give a little but get much more back—often as punishment or loss.",
    note: "Traditional measuring units become familiar coffee cup sizes: small in, much larger out.",
    prompt: `${stylePrompt} At a modern café counter, one adult hands over a tiny cup but immediately receives an absurdly huge overflowing cup in return, looking shocked by the disproportionate exchange.`,
  },
  {
    remix: "중요한 건 꺾이는 고개",
    format: "MEME WORDPLAY",
    answer: "벼는 익을수록 고개를 숙인다",
    options: ["벼는 익을수록 고개를 숙인다", "중이 제 머리 못 깎는다", "고래 싸움에 새우 등 터진다"],
    meaning: "The wiser or more accomplished a person becomes, the more humble they should be.",
    note: "It bends 중꺾마 into a visual lesson about mature rice bowing its head.",
    prompt: `${stylePrompt} A golden rice field where the fullest mature rice stalk bows gracefully while younger empty stalks stand stiff and proud, visual metaphor for wisdom and humility.`,
  },
  {
    remix: "3년 차 서당 개, 폼 미쳤다",
    format: "PERFORMANCE MEME",
    answer: "서당 개 삼 년이면 풍월을 읊는다",
    options: ["서당 개 삼 년이면 풍월을 읊는다", "개구리 올챙이 적 생각 못 한다", "하룻강아지 범 무서운 줄 모른다"],
    meaning: "Long exposure to an environment can teach you something, even without formal study.",
    note: "The remix treats the dog like a veteran performer entering its third season.",
    prompt: `${stylePrompt} A proud Korean dog outside a traditional village school confidently reciting poetry to amazed adult students, with a playful veteran-performer pose and traditional study objects around it.`,
  },
  {
    remix: "아, 방앗간은 못 참지ㅋㅋ",
    format: "CAN’T-RESIST MEME",
    answer: "참새가 방앗간을 그냥 지나치랴",
    options: ["참새가 방앗간을 그냥 지나치랴", "가재는 게 편", "울며 겨자 먹기"],
    meaning: "People cannot easily pass by something they love or habitually enjoy.",
    note: "못 참지 is the perfect modern reaction when temptation is simply too strong.",
    prompt: `${stylePrompt} A sparrow flying past a traditional Korean mill suddenly making a dramatic U-turn toward delicious grains, unable to resist, with lively comic motion and amused adult bystanders.`,
  },
  {
    remix: "설마: 사람 잡은 썰 푼다",
    format: "COMMUNITY POST TITLE",
    answer: "설마가 사람 잡는다",
    options: ["설마가 사람 잡는다", "말 한마디에 천 냥 빚도 갚는다", "공든 탑이 무너지랴"],
    meaning: "Careless confidence that ‘it probably won’t happen’ can cause real trouble.",
    note: "The abstract word 설마 becomes the author of a dramatic anonymous community post.",
    prompt: `${stylePrompt} An overconfident adult ignoring a clear warning sign while a chain of small preventable accidents begins behind them, composed like a dramatic anonymous internet confession without any visible text.`,
  },
  {
    remix: "산에서 노 저은 썰 푼다",
    format: "COMMUNITY POST TITLE",
    answer: "사공이 많으면 배가 산으로 간다",
    options: ["사공이 많으면 배가 산으로 간다", "백지장도 맞들면 낫다", "가는 날이 장날"],
    meaning: "Too many people giving directions can make a project go completely off course.",
    note: "The impossible result becomes a first-person internet story: somehow, we rowed a boat up a mountain.",
    prompt: `${stylePrompt} A wooden boat impossibly stranded high on a green mountain while too many adult rowers point in conflicting directions and argue, each holding an oar, humorous clear cause-and-effect scene.`,
  },
  {
    remix: "굼벵이 구르는 폼 미쳤다",
    format: "PERFORMANCE MEME",
    answer: "굼벵이도 구르는 재주가 있다",
    options: ["굼벵이도 구르는 재주가 있다", "우물 안 개구리", "낫 놓고 기역 자도 모른다"],
    meaning: "Everyone has at least one thing they can do well.",
    note: "The slow grub receives sports-commentator hype for finally showing its special move.",
    prompt: `${stylePrompt} A tiny grub executing an unexpectedly spectacular rolling move like a champion athlete while a diverse group of adults cheers in delighted surprise, playful underdog victory.`,
  },
];

export default function Home() {
  const [part, setPart] = useState<0 | 1 | 2>(0);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completedOne, setCompletedOne] = useState(false);

  const cards = part === 1 ? partOneCards : partTwoCards;
  const card = cards[index];
  const isDone = part !== 0 && index >= cards.length;

  const begin = (nextPart: 1 | 2) => {
    setPart(nextPart);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setShowPrompt(false);
  };

  const choose = (option: string) => {
    if (selected || !card) return;
    setSelected(option);
    if (option === card.answer) setScore((value) => value + 1);
  };

  const next = () => {
    if (index === cards.length - 1 && part === 1) setCompletedOne(true);
    setIndex((value) => value + 1);
    setSelected(null);
    setShowPrompt(false);
    setCopied(false);
  };

  const copyPrompt = async () => {
    if (!card) return;
    await navigator.clipboard.writeText(card.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (part === 0) {
    return (
      <main className="landing-shell">
        <header className="topbar">
          <div className="brand-mark">OV</div>
          <div className="brand-name">SINAVRO VIBE</div>
          <span className="edition-pill">ENGLISH EDITION</span>
        </header>

        <section className="hero">
          <div className="eyebrow">A KOREAN CULTURE CARD GAME</div>
          <h1>
            Old Wisdom,
            <span>New Vibes.</span>
          </h1>
          <p className="hero-copy">
            Match Korean internet slang with timeless proverbs. Then remix the old wisdom in the language of memes.
          </p>
          <div className="hero-tags" aria-label="Game themes">
            <span>#KoreanSlang</span><span>#Proverbs</span><span>#WorldWisdom</span>
          </div>
        </section>

        <section className="part-grid" aria-label="Choose a game part">
          <article className="part-card coral-card">
            <div className="part-number">PART 01</div>
            <div className="part-icon">#</div>
            <h2>Catch the Vibe</h2>
            <p>Discover real Korean slang, read the situation, and find its closest proverb cousin.</p>
            <ul>
              <li>8 real expressions</li>
              <li>English culture notes</li>
              <li>Nano Banana prompts</li>
            </ul>
            <button onClick={() => begin(1)}>START PART 1 <span>→</span></button>
          </article>

          <article className="part-card lime-card">
            <div className="part-number">PART 02</div>
            <div className="part-icon remix-icon">↻</div>
            <h2>Proverb Remix</h2>
            <p>Decode Korean proverbs rewritten as memes, community posts, and modern punchlines.</p>
            <ul>
              <li>8 creative remixes</li>
              <li>Original meaning reveal</li>
              <li>Make-your-own discussion</li>
            </ul>
            <button onClick={() => begin(2)}>START PART 2 <span>→</span></button>
          </article>
        </section>

        <footer className="landing-footer">
          <span>LEARN THE WORDS.</span><span>READ THE CULTURE.</span><span>SHARE YOUR WISDOM.</span>
        </footer>
      </main>
    );
  }

  if (isDone) {
    return (
      <main className="result-shell">
        <div className="result-card">
          <div className="result-burst">{score}/{cards.length}</div>
          <div className="eyebrow">PART {String(part).padStart(2, "0")} COMPLETE</div>
          <h1>{score >= 6 ? "Your vibe is immaculate." : "The wisdom is loading."}</h1>
          <p>
            {part === 1
              ? "You have decoded the slang. Now use those new vibes to remix old Korean wisdom."
              : "You have travelled from old proverbs to internet memes—and found the human truth underneath both."}
          </p>
          <div className="world-question">
            <span>AROUND THE WORLD</span>
            Does your language have a proverb that matched one of today’s cards?
          </div>
          <div className="result-actions">
            {part === 1 && <button className="primary-action" onClick={() => begin(2)}>CONTINUE TO PART 2 →</button>}
            <button className="secondary-action" onClick={() => begin(part)}>PLAY AGAIN</button>
            <button className="text-action" onClick={() => setPart(0)}>BACK TO HOME</button>
          </div>
        </div>
      </main>
    );
  }

  const isPartOne = part === 1;
  const answer = card.answer;
  const correct = selected === answer;

  return (
    <main className="game-shell">
      <header className="game-header">
        <button className="mini-brand" onClick={() => setPart(0)} aria-label="Back to home">OV</button>
        <div className="game-title">
          <span>PART {String(part).padStart(2, "0")}</span>
          {isPartOne ? "CATCH THE VIBE" : "PROVERB REMIX"}
        </div>
        <div className="score">SCORE <strong>{score}</strong></div>
      </header>

      <div className="progress-row">
        <div className="progress-track"><span style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></div>
        <span>{index + 1} / {cards.length}</span>
      </div>

      <section className="play-grid">
        <div className="visual-column">
          <div className="image-slot">
            <span className="slot-label">IMAGE SLOT {String(index + 1).padStart(2, "0")}</span>
            <div className="slot-shape"><span>+</span></div>
            <strong>Artwork intentionally left blank</strong>
            <small>Generate with Nano Banana, then place the final card art here.</small>
          </div>
          <div className={`prompt-panel ${showPrompt ? "open" : ""}`}>
            <button className="prompt-toggle" onClick={() => setShowPrompt((value) => !value)}>
              <span>NANO BANANA IMAGE PROMPT</span><b>{showPrompt ? "−" : "+"}</b>
            </button>
            {showPrompt && (
              <div className="prompt-content">
                <p>{card.prompt}</p>
                <button onClick={copyPrompt}>{copied ? "COPIED!" : "COPY PROMPT"}</button>
              </div>
            )}
          </div>
        </div>

        <div className="question-column">
          {isPartOne ? (
            <>
              <div className="meta-line"><span>{(card as PartOneCard).era}</span><span>REAL KOREAN SLANG</span></div>
              <div className="slang-word">{(card as PartOneCard).term}</div>
              <div className="romanization">[{(card as PartOneCard).romanization}]</div>
              <div className="meaning-box"><span>THE VIBE</span>{(card as PartOneCard).meaning}</div>
              <div className="scenario"><span>Picture this</span>{(card as PartOneCard).scenario}</div>
              <h2>Which proverb carries the closest wisdom?</h2>
            </>
          ) : (
            <>
              <div className="meta-line"><span>{(card as PartTwoCard).format}</span><span>CREATIVE REMAKE</span></div>
              <div className="remix-quote">“{(card as PartTwoCard).remix}”</div>
              <div className="scenario remix-instruction"><span>Decode it</span>Find the original Korean proverb hiding inside this modern remix.</div>
              <h2>What is the original proverb?</h2>
            </>
          )}

          <div className="answer-list">
            {card.options.map((option, optionIndex) => {
              const state = selected
                ? option === answer
                  ? "correct"
                  : option === selected
                    ? "wrong"
                    : "muted"
                : "";
              return (
                <button key={option} className={state} onClick={() => choose(option)} disabled={Boolean(selected)}>
                  <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
                  {selected && option === answer && <b>✓</b>}
                  {selected && option === selected && option !== answer && <b>×</b>}
                </button>
              );
            })}
          </div>

          {selected && (
            <div className={`reveal ${correct ? "right" : "try-again"}`}>
              <div className="reveal-top">
                <span>{correct ? "NICE MATCH!" : "NOT THIS TIME"}</span>
                <em>{isPartOne ? (card as PartOneCard).relation : "ORIGINAL WISDOM"}</em>
              </div>
              {!correct && <strong>{answer}</strong>}
              <p>{isPartOne ? (card as PartOneCard).note : (card as PartTwoCard).meaning}</p>
              {!isPartOne && <small>{(card as PartTwoCard).note}</small>}
              <div className="discuss-line">
                <b>YOUR CULTURE:</b> Is there a similar saying in your language?
              </div>
              <button className="next-button" onClick={next}>{index === cards.length - 1 ? "SEE RESULTS" : "NEXT CARD"} →</button>
            </div>
          )}
        </div>
      </section>

      <footer className="game-footer">
        <span>OLD WISDOM, NEW VIBES</span>
        {completedOne && part === 2 && <span>PART 1 CLEARED ✓</span>}
      </footer>
    </main>
  );
}
