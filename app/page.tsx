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
  image?: string;
  imageAlt?: string;
};

type PartTwoCard = {
  remix: string;
  format: string;
  answer: string;
  options: string[];
  meaning: string;
  note: string;
  prompt: string;
  image?: string;
  imageAlt?: string;
};

const stylePrompt =
  "High-energy editorial card-game illustration for young adult international audiences, meme-native visual humor, capturing the exact split-second when something hilariously goes wrong or unexpectedly right, exaggerated but believable adult facial expressions and body language, instantly readable absurd situation, bold off-center framing, playful wide-angle or low-angle camera, one surprising foreground detail, hand-cut paper collage mixed with risograph print, visible paper fibers, rough ink texture, slightly misregistered colors, bold graphic shadows, warm cream, electric coral, deep navy and acid-lime palette, landscape 4:3 composition. Use a contemporary global visual language. Do not add traditional Korean clothing, architecture, calligraphy or decorative motifs unless the individual scene prompt explicitly requests them to explain the original proverb. Avoid glossy 3D, polished corporate illustration, anime school characters, cute children, generic smooth AI illustration, written words, letters, logos and watermarks.";

const partOneCards: PartOneCard[] = [
  {
    term: "스불재",
    romanization: "seu-bul-jae",
    image: "/card-art/part1-01-seubuljae.webp",
    imageAlt: "An office worker spills coffee on a laptop while cloud backup is switched off",
    era: "2020s internet slang",
    meaning: "I brought this disaster upon myself.",
    scenario: "You ignored every backup reminder. Then your laptop died the night before the deadline.",
    answer: "제 꾀에 제가 넘어간다",
    options: ["제 꾀에 제가 넘어간다", "백지장도 맞들면 낫다", "원숭이도 나무에서 떨어진다"],
    relation: "CLOSE MATCH",
    note: "Both point to suffering the consequences of your own actions. 스불재 is shorter, more casual, and usually self-mocking.",
    prompt: `${stylePrompt} Freeze the exact second a young adult office worker realizes the laptop has died: black screen reflected in enormous horrified eyes, coffee suspended mid-spill, hands frozen above the keyboard, and a ridiculous mountain of ignored backup reminders collapsing into the foreground. Make the self-inflicted cause instantly obvious and funny, not tragic.`,
  },
  {
    term: "갓생",
    romanization: "gat-saeng",
    image: "/card-art/part1-02-gatsaeng.webp",
    imageAlt: "A disciplined adult surrounded by exercise, study, meal prep and planning goals",
    era: "2020s lifestyle slang",
    meaning: "A disciplined, productive, admirable life.",
    scenario: "Wake up early, exercise, study Korean, prepare lunch, and still arrive at work on time.",
    answer: "티끌 모아 태산",
    options: ["티끌 모아 태산", "누워서 떡 먹기", "가는 날이 장날"],
    relation: "SAME VIBE",
    note: "갓생 celebrates disciplined living; the proverb emphasizes how small efforts accumulate into something big.",
    prompt: `${stylePrompt} A dynamic wide-angle morning scene of one ambitious young adult somehow exercising, studying Korean, meal-prepping and answering a work message at once, with exaggerated focused confidence rather than stress. Tiny completed tasks stack into a visual mountain behind the character; an absurdly balanced coffee cup in the foreground adds meme energy.`,
  },
  {
    term: "중꺾마",
    romanization: "jung-kkeok-ma",
    image: "/card-art/part1-03-jungkkeokma.webp",
    imageAlt: "A losing football team helps one another stand beneath a one-to-nine scoreboard",
    era: "2022 sports & gaming meme",
    meaning: "What matters is an unbreakable spirit.",
    scenario: "Your team is far behind, but nobody gives up before the final whistle.",
    answer: "고생 끝에 낙이 온다",
    options: ["고생 끝에 낙이 온다", "우물 안 개구리", "낮말은 새가 듣고 밤말은 쥐가 듣는다"],
    relation: "SAME VIBE",
    note: "The meme focuses on perseverance; the proverb promises that hardship can eventually give way to joy.",
    prompt: `${stylePrompt} Low-angle freeze-frame of a diverse young adult amateur team, sweaty and dramatically exhausted, getting back on their feet together while a huge scoreboard shows they are far behind using abstract shapes only. One teammate points forward with comically intense determination; the distant finish line glows like an impossible challenge.`,
  },
  {
    term: "내로남불",
    romanization: "nae-ro-nam-bul",
    image: "/card-art/part1-04-naeronambul.webp",
    imageAlt: "The same person excuses his own lateness but criticizes someone else for being late",
    era: "2010s–2020s public discourse",
    meaning: "One rule for me, another for you.",
    scenario: "He complains when others are five minutes late, but expects everyone to wait when he is late.",
    answer: "똥 묻은 개가 겨 묻은 개 나무란다",
    options: ["똥 묻은 개가 겨 묻은 개 나무란다", "개천에서 용 난다", "콩 심은 데 콩 난다"],
    relation: "CULTURAL COUSIN",
    note: "Both criticize hypocrisy: someone with a bigger fault judges another person for a smaller one.",
    prompt: `${stylePrompt} A sharply comic split-scene: in the foreground, a self-righteous young adult angrily points at a clock because a friend is five minutes late; behind them, an oversized second clock and visual flashback reveal that the accuser arrived ridiculously late yesterday. Exaggerate the accuser's moral outrage and the friend's deadpan stare.`,
  },
  {
    term: "오히려 좋아",
    romanization: "ohiryeo joa",
    image: "/card-art/part1-05-ohiryeojoa.webp",
    imageAlt: "A delighted customer receives a spectacular fresh cake after finding an empty display",
    era: "2020s reaction meme",
    meaning: "This might actually be better!",
    scenario: "The café is sold out of the cake you wanted, so you discover an even better fresh dessert.",
    answer: "하늘이 무너져도 솟아날 구멍이 있다",
    options: ["하늘이 무너져도 솟아날 구멍이 있다", "소 잃고 외양간 고친다", "사공이 많으면 배가 산으로 간다"],
    relation: "POSITIVE ENERGY",
    note: "The meme cheerfully reframes a setback. The proverb says a way forward can still be found in a disaster.",
    prompt: `${stylePrompt} Capture the exact emotional flip in a modern café: a young adult stares miserably at an empty cake display, then whips around with an exaggerated delighted face as a baker reveals an even better steaming fresh dessert. Use a surprising over-the-counter camera angle and make bad luck visibly transform into a win.`,
  },
  {
    term: "알잘딱깔센",
    romanization: "al-jal-ttak-kkal-sen",
    image: "/card-art/part1-06-aljalttakkalsen.webp",
    imageAlt: "A designer turns a vague rough sketch into a polished presentation",
    era: "late 2010s–2020s slang",
    meaning: "Handle it well, neatly, and with good sense—without being told every detail.",
    scenario: "You give one short instruction. Your coworker understands the whole situation and delivers perfectly.",
    answer: "하나를 보면 열을 안다",
    options: ["하나를 보면 열을 안다", "열 번 찍어 안 넘어가는 나무 없다", "두 손뼉이 맞아야 소리가 난다"],
    relation: "CLOSE MATCH",
    note: "Both praise someone who quickly understands more than what was explicitly shown or explained.",
    prompt: `${stylePrompt} A cool, capable young coworker casually receives one tiny instruction card and, in the same energetic scene, turns a chaotic project table into a flawless presentation. The manager is frozen mid-gasp in the background while the coworker gives an effortless knowing look to camera; use an off-center before-and-after composition.`,
  },
  {
    term: "엄친아",
    romanization: "eom-chin-a",
    image: "/card-art/part1-07-eomchina.webp",
    imageAlt: "Two mothers compare an embarrassed adult child with a highly accomplished friend’s son",
    era: "2000s comparison culture",
    meaning: "The impossibly perfect ‘friend’s son’ your mother compares you with.",
    scenario: "Your family praises someone else’s grades, job, manners, cooking, and fitness—all during dinner.",
    answer: "남의 떡이 커 보인다",
    options: ["남의 떡이 커 보인다", "싼 게 비지떡", "세 살 버릇 여든까지 간다"],
    relation: "CULTURAL COUSIN",
    note: "엄친아 captures comparison pressure; the proverb says what belongs to someone else often looks better.",
    prompt: `${stylePrompt} A contemporary Korean family dinner shot with an exaggerated wide-angle lens: relatives enthusiastically present an impossibly perfect young adult surrounded by trophies, fitness gear, a chef apron and career symbols, while the person being compared sinks lower and lower behind a rice bowl with a stunned meme-worthy expression. No traditional costume or decorative Korean motifs.`,
  },
  {
    term: "느좋",
    romanization: "neu-jo",
    image: "/card-art/part1-08-neujo.webp",
    imageAlt: "Two adults admire the lighting, plants, music and furniture of a stylish cafe",
    era: "2020s aesthetic slang",
    meaning: "It just has a nice vibe.",
    scenario: "You cannot explain why, but the café’s colors, music, light, and tableware all feel right.",
    answer: "보기 좋은 떡이 먹기도 좋다",
    options: ["보기 좋은 떡이 먹기도 좋다", "그림의 떡", "떡 줄 사람은 생각도 않는데 김칫국부터 마신다"],
    relation: "SAME VIBE",
    note: "느좋 is an intuitive aesthetic reaction. The proverb connects pleasing appearance with a pleasing experience.",
    prompt: `${stylePrompt} A stylish young adult enters a contemporary Seoul café and is almost physically pulled forward by the perfect vibe—light, ceramics, plants, music speakers and dessert aligning around them like a visual magnet. Capture a quiet but unmistakable 'this is it' facial expression, with a quirky tilted camera and one oversized dessert in the foreground. No traditional motifs.`,
  },
];

const partTwoCards: PartTwoCard[] = [
  {
    remix: "개똥 SOLD OUT",
    format: "CONSUMER CULTURE REMIX",
    image: "/card-art/part2-01-dog-sold-out.webp",
    imageAlt: "A person searches with an empty sample jar beside a sold-out sign in a dog park",
    answer: "개똥도 약에 쓰려면 없다",
    options: ["개똥도 약에 쓰려면 없다", "싼 게 비지떡", "그림의 떡"],
    meaning: "Even something common is nowhere to be found exactly when you need it.",
    note: "The remix turns sudden scarcity into an online shopping ‘sold out’ moment.",
    prompt: `${stylePrompt} Show the original proverb through a lightly historical Korean setting: beneath the tiled eaves of a traditional market apothecary, a young adult in simple everyday hanbok urgently needs one extremely ordinary humble item, but every basket and shelf is absurdly empty. Capture the exact moment of disbelief with the shopkeeper helplessly turning out empty containers; traditional details should clarify the proverb, not decorate the whole image.`,
  },
  {
    remix: "톨로 주고 그란데로 받는다",
    format: "CAFÉ SIZE REMIX",
    image: "/card-art/part2-02-tall-grande.webp",
    imageAlt: "A cafe customer gives a small Tall cup and receives an enormous Grande cup",
    answer: "되로 주고 말로 받는다",
    options: ["되로 주고 말로 받는다", "콩 한 쪽도 나눠 먹는다", "누워서 떡 먹기"],
    meaning: "You give a little but get much more back—often as punishment or loss.",
    note: "Traditional measuring units become familiar coffee cup sizes: small in, much larger out.",
    prompt: `${stylePrompt} Show the original proverb in a traditional Korean market: one adult merchant in simple work hanbok hands over a tiny wooden doe measuring box, then recoils as an enormous mal-sized container overflowing with grain crashes into the foreground in return. Use forced perspective so the huge repayment feels hilariously unfair; include only restrained market and tiled-roof details.`,
  },
  {
    remix: "중요한 건 꺾이는 고개",
    format: "MEME WORDPLAY",
    image: "/card-art/part2-03-bowing-rice.webp",
    imageAlt: "A mature rice stalk bends low under the weight of ripe grain",
    answer: "벼는 익을수록 고개를 숙인다",
    options: ["벼는 익을수록 고개를 숙인다", "중이 제 머리 못 깎는다", "고래 싸움에 새우 등 터진다"],
    meaning: "The wiser or more accomplished a person becomes, the more humble they should be.",
    note: "It bends 중꺾마 into a visual lesson about mature rice bowing its head.",
    prompt: `${stylePrompt} Show the original proverb in a golden Korean rice field: a mature heavy rice stalk bows gracefully close to the camera while younger empty stalks stand stiff and boastful behind it. A wise adult farmer in plain traditional work clothes quietly mirrors the bow as a proud show-off poses in the distance; use a low field-level angle and restrained historical detail.`,
  },
  {
    remix: "3년 차 서당 개, 폼 미쳤다",
    format: "PERFORMANCE MEME",
    answer: "서당 개 삼 년이면 풍월을 읊는다",
    options: ["서당 개 삼 년이면 풍월을 읊는다", "개구리 올챙이 적 생각 못 한다", "하룻강아지 범 무서운 줄 모른다"],
    meaning: "Long exposure to an environment can teach you something, even without formal study.",
    note: "The remix treats the dog like a veteran performer entering its third season.",
    image: "/card-art/part2-04-seodang-dog.webp",
    imageAlt: "A dog performs calligraphy before astonished scholars at a traditional village school",
    prompt: `${stylePrompt} Show the original proverb at a small traditional Korean village school beneath simple tiled eaves: a proud dog suddenly performs like a veteran poetry master in front of stunned adult scholars, one paw raised with absurd confidence. Capture ink brushes suspended midair and jaws dropping at the exact reveal; use hanbok and study objects only because they explain the original seodang setting.`,
  },
  {
    remix: "아, 방앗간은 못 참지ㅋㅋ",
    format: "CAN’T-RESIST MEME",
    answer: "참새가 방앗간을 그냥 지나치랴",
    options: ["참새가 방앗간을 그냥 지나치랴", "가재는 게 편", "울며 겨자 먹기"],
    meaning: "People cannot easily pass by something they love or habitually enjoy.",
    note: "못 참지 is the perfect modern reaction when temptation is simply too strong.",
    image: "/card-art/part2-05-mill-sparrow.webp",
    imageAlt: "A sparrow makes a sharp turn toward grain at a traditional Korean mill",
    prompt: `${stylePrompt} Show the original proverb at a traditional Korean grain mill: a sparrow flies past, then makes an impossibly sharp midair U-turn toward the grain with huge tempted eyes and wings braking dramatically. Adult mill workers in simple historical clothing react with knowing amusement; use the mill wheel, grain and modest tiled roof only to make the proverb's original image instantly clear.`,
  },
  {
    remix: "설마: 사람 잡은 썰 푼다",
    format: "COMMUNITY POST TITLE",
    answer: "설마가 사람 잡는다",
    options: ["설마가 사람 잡는다", "말 한마디에 천 냥 빚도 갚는다", "공든 탑이 무너지랴"],
    meaning: "Careless confidence that ‘it probably won’t happen’ can cause real trouble.",
    note: "The abstract word 설마 becomes the author of a dramatic anonymous community post.",
    prompt: `${stylePrompt} Contemporary meme scene: an overconfident young adult waves away an obvious warning with a smug 'what could go wrong?' expression while, just behind them, a ridiculous chain reaction of small preventable accidents has already begun. Freeze one object in midair seconds before impact and use an ominously cheerful wide-angle composition. No traditional Korean motifs.`,
  },
  {
    remix: "산에서 노 저은 썰 푼다",
    format: "COMMUNITY POST TITLE",
    answer: "사공이 많으면 배가 산으로 간다",
    options: ["사공이 많으면 배가 산으로 간다", "백지장도 맞들면 낫다", "가는 날이 장날"],
    meaning: "Too many people giving directions can make a project go completely off course.",
    image: "/card-art/part2-07-mountain-boat.webp",
    imageAlt: "Too many Korean boatmen row a wooden boat in conflicting directions on a mountain",
    note: "The impossible result becomes a first-person internet story: somehow, we rowed a boat up a mountain.",
    prompt: `${stylePrompt} Show the original proverb as an absurd historical Korean freeze-frame: a traditional wooden ferry is somehow stranded near the top of a green mountain while far too many adult boatmen in simple work hanbok shout conflicting directions and row toward different sides. Use an aerial tilted camera, exaggerated arguing faces and one oar pointing straight at the viewer; restrained period detail only.`,
  },
  {
    remix: "굼벵이 구르는 폼 미쳤다",
    format: "PERFORMANCE MEME",
    answer: "굼벵이도 구르는 재주가 있다",
    options: ["굼벵이도 구르는 재주가 있다", "우물 안 개구리", "낫 놓고 기역 자도 모른다"],
    meaning: "Everyone has at least one thing they can do well.",
    image: "/card-art/part2-08-grub.webp",
    imageAlt: "A grub rolls like a champion athlete before a wildly cheering crowd",
    note: "The slow grub receives sports-commentator hype for finally showing its special move.",
    prompt: `${stylePrompt} A tiny grub suddenly executes an outrageously spectacular rolling move like a champion athlete, captured inches from the ground with extreme forced perspective. A diverse group of young adults erupts in exaggerated disbelief behind it as if watching a world final; make the underdog victory instantly funny. No traditional Korean motifs.`,
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
          <div className="brand-mark">SV</div>
          <div className="brand-name">SINAVRO</div>
          <span className="edition-pill">ENGLISH EDITION</span>
        </header>

        <section className="hero">
          <div className="eyebrow">SINAVRO PRESENTS</div>
          <h1 className="viral-title" aria-label="Viral Vibe">
            <span className="viral-word">
              <i>V</i><i>I</i><i>R</i><i>A</i><i>L</i>
            </span>
            <span className="vibe-word">
              <i>V</i><i>I</i><i className="eye-host">B<b className="logo-eyes" aria-hidden="true"><em /><em /></b></i><i>E</i><i>.</i>
            </span>
          </h1>
          <div className="product-descriptor">KOREAN PROVERBS &amp; SLANG CARD GAME</div>
          <p className="brand-slogan">Old Wisdom, New Vibes.</p>
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
          <div className={`image-slot ${card.image ? "filled" : ""}`}>
            <span className="slot-label">IMAGE SLOT {String(index + 1).padStart(2, "0")}</span>
            {card.image ? (
              <img className="card-art" src={card.image} alt={card.imageAlt ?? "Card illustration"} />
            ) : (
              <>
                <div className="slot-shape"><span>+</span></div>
                <strong>Artwork intentionally left blank</strong>
                <small>Generate with Nano Banana, then place the final card art here.</small>
              </>
            )}
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
