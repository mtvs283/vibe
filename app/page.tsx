"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STORAGE_KEY,
  cardFieldKey,
  isLocale,
  proverbText,
  t,
  textDirection,
} from "./i18n";

type Option = {
  ko: string;
  en: string;
};

type ImageSlot = {
  src?: string;
  alt?: string;
};

type PartOneCard = {
  term: string;
  romanization: string;
  era: string;
  meaning: string;
  scenario: string;
  answer: string;
  options: Option[];
  images: [ImageSlot, ImageSlot];
};

type PartTwoCard = {
  remix: string;
  format: string;
  answer: string;
  options: Option[];
  meaning: string;
  images: [ImageSlot, ImageSlot];
};

const partOneCards: PartOneCard[] = [
  {
    term: "스불재",
    romanization: "seu-bul-jae",
    era: "2020s internet slang",
    meaning: "I brought this disaster upon myself.",
    scenario: "You ignored every warning. Now you are standing in the mess you made with your own hands.",
    answer: "제 무덤 내가 판다",
    options: [
      { ko: "제 무덤 내가 판다", en: "You dug your own grave." },
      { ko: "백지장도 맞들면 낫다", en: "Many hands make light work." },
      { ko: "원숭이도 나무에서 떨어진다", en: "Even Homer sometimes nods." },
    ],
    images: [
      {
        src: "/card-art/part1-01-seubuljae-a.png",
        alt: "A grinning beachgoer digs a deep sand hole right beside a no-digging warning sign",
      },
      {
        src: "/card-art/part1-01-seubuljae-b.png",
        alt: "The same person sits trapped in the hole as sand pours down on him, still holding the shovel",
      },
    ],
  },
  {
    term: "갓생",
    romanization: "gat-saeng",
    era: "2020s lifestyle slang",
    meaning: "A disciplined, productive, admirable life.",
    scenario: "Wake up early, exercise, study Korean, prepare lunch, and still arrive at work on time.",
    answer: "티끌 모아 태산",
    options: [
      { ko: "티끌 모아 태산", en: "Many a little makes a mickle." },
      { ko: "누워서 떡 먹기", en: "A piece of cake." },
      { ko: "가는 날이 장날", en: "Just my luck." },
    ],
    images: [
      {
        src: "/card-art/part1-02-gatsaeng-a.png",
        alt: "One woman moves through dawn: waking up, jogging, studying Korean, packing lunch",
      },
      {
        src: "/card-art/part1-02-gatsaeng-b.png",
        alt: "The same woman sits calmly at her office desk at 9am with a packed lunch and checked planner",
      },
    ],
  },
  {
    term: "중꺾마",
    romanization: "jung-kkeok-ma",
    era: "2022 sports & gaming meme",
    meaning: "What matters is an unbreakable spirit.",
    scenario: "Your team is far behind, but nobody gives up before the final whistle.",
    answer: "뜻이 있는 곳에 길이 있다",
    options: [
      { ko: "뜻이 있는 곳에 길이 있다", en: "Where there’s a will, there’s a way." },
      { ko: "우물 안 개구리", en: "A frog in a well." },
      { ko: "낮말은 새가 듣고 밤말은 쥐가 듣는다", en: "Walls have ears." },
    ],
    images: [
      {
        src: "/card-art/part1-03-jungkkeokma-a.png",
        alt: "Home team sits crushed on the bench under a 1–9 scoreboard near full time",
      },
      {
        src: "/card-art/part1-03-jungkkeokma-b.png",
        alt: "Despite a 1–9 score near full time, the team huddles with clenched fists and fighting spirit",
      },
    ],
  },
  {
    term: "내로남불",
    romanization: "nae-ro-nam-bul",
    era: "2010s–2020s public discourse",
    meaning: "One rule for me, another for you.",
    scenario: "He complains when others are five minutes late, but expects everyone to wait when he is late.",
    answer: "똥 묻은 개가 겨 묻은 개 나무란다",
    options: [
      { ko: "똥 묻은 개가 겨 묻은 개 나무란다", en: "The pot calling the kettle black." },
      { ko: "개천에서 용 난다", en: "From rags to riches." },
      { ko: "콩 심은 데 콩 난다", en: "You reap what you sow." },
    ],
    images: [
      {
        src: "/card-art/part1-04-naeronambul-a.png",
        alt: "A man arrives late at 9:05 smiling casually while coworkers check their watches",
      },
      {
        src: "/card-art/part1-04-naeronambul-b.png",
        alt: "At the same 9:05, he angrily points at the clock as another coworker rushes in late",
      },
    ],
  },
  {
    term: "오히려 좋아",
    romanization: "ohiryeo joa",
    era: "2020s reaction meme",
    meaning: "This might actually be better!",
    scenario: "You miss the crowded bus in the rain—then the next one gives you a luxury empty seat.",
    answer: "고생 끝에 낙이 온다",
    options: [
      { ko: "고생 끝에 낙이 온다", en: "Every cloud has a silver lining." },
      { ko: "소 잃고 외양간 고친다", en: "Shutting the stable door after the horse has bolted." },
      { ko: "사공이 많으면 배가 산으로 간다", en: "Too many cooks spoil the broth." },
    ],
    images: [
      {
        src: "/card-art/part1-05-ohiryeojoa-a.png",
        alt: "A tired office worker sighs at a rainy bus stop as his bus pulls away",
      },
      {
        src: "/card-art/part1-05-ohiryeojoa-b.png",
        alt: "Minutes later he smiles in a plush luxury bus seat with coffee by the window",
      },
    ],
  },
  {
    term: "알잘딱깔센",
    romanization: "al-jal-ttak-kkal-sen",
    era: "late 2010s–2020s slang",
    meaning: "Handle it well, neatly, and with good sense—without being told every detail.",
    scenario: "You give one short instruction. Your coworker understands the whole situation and delivers perfectly.",
    answer: "하나를 보면 열을 안다",
    options: [
      { ko: "하나를 보면 열을 안다", en: "A word to the wise is enough." },
      { ko: "열 번 찍어 안 넘어가는 나무 없다", en: "If at first you don’t succeed, try, try again." },
      { ko: "두 손뼉이 맞아야 소리가 난다", en: "It takes two to tango." },
    ],
    images: [
      {
        src: "/card-art/part1-06-aljalttakkalsen-a.png",
        alt: "A manager points at a messy one-circle scribble with a vague ‘you know what I mean’ gesture",
      },
      {
        src: "/card-art/part1-06-aljalttakkalsen-b.png",
        alt: "A coworker presents a polished chart deck; the manager looks amazed while she gives an OK sign",
      },
    ],
  },
  {
    term: "엄친아",
    romanization: "eom-chin-a",
    era: "2000s comparison culture",
    meaning: "The impossibly perfect ‘friend’s son’ your mother compares you with.",
    scenario: "Your family praises someone else’s grades, job, manners, cooking, and fitness—all during dinner.",
    answer: "남의 떡이 커 보인다",
    options: [
      { ko: "남의 떡이 커 보인다", en: "The grass is always greener on the other side." },
      { ko: "싼 게 비지떡", en: "You get what you pay for." },
      { ko: "세 살 버릇 여든까지 간다", en: "Old habits die hard." },
    ],
    images: [
      {
        src: "/card-art/part1-07-eomchina-a.png",
        alt: "At dinner, a glowing multi-talented perfect friend’s son floats behind two slumped adult children",
      },
      {
        src: "/card-art/part1-07-eomchina-b.png",
        alt: "Mom shows a suit photo on her phone while her daughter rolls her eyes mid-bite",
      },
    ],
  },
  {
    term: "싼마이",
    romanization: "ssan-ma-i",
    era: "2020s consumer slang",
    meaning: "Cheap-looking, low-quality, no-good vibes.",
    scenario: "The rice cakes look bargain-cheap in the case—then one bite proves why.",
    answer: "싼 게 비지떡",
    options: [
      { ko: "싼 게 비지떡", en: "You get what you pay for." },
      { ko: "보기 좋은 떡이 먹기도 좋다", en: "We eat with our eyes first." },
      { ko: "그림의 떡", en: "Pie in the sky." },
    ],
    images: [
      {
        src: "/card-art/part1-08-ssanmai-a.png",
        alt: "A shopper studies bargain rice cakes in a traditional tteok shop display case",
      },
      {
        src: "/card-art/part1-08-ssanmai-b.png",
        alt: "After one bite of a cheap rice cake, her face twists in regret",
      },
    ],
  },
];

const partTwoCards: PartTwoCard[] = [
  {
    remix: "개똥 SOLD OUT",
    format: "CONSUMER CULTURE REMIX",
    answer: "개똥도 약에 쓰려면 없다",
    options: [
      { ko: "개똥도 약에 쓰려면 없다", en: "You can never find a thing when you need it." },
      { ko: "싼 게 비지떡", en: "You get what you pay for." },
      { ko: "그림의 떡", en: "Pie in the sky." },
    ],
    meaning: "Even something common is nowhere to be found exactly when you need it.",
    images: [
      {
        src: "/card-art/part2-01-gaeddong-a.png",
        alt: "A shopper stares at an empty pharmacy shelf marked SOLD OUT while holding a shopping list",
      },
      {
        src: "/card-art/part2-01-gaeddong-b.png",
        alt: "A pharmacist shrugs as expensive supplements remain fully stocked on the counter",
      },
    ],
  },
  {
    remix: "톨로 주고 그란데로 받는다",
    format: "CAFÉ SIZE REMIX",
    answer: "되로 주고 말로 받는다",
    options: [
      { ko: "되로 주고 말로 받는다", en: "Sow the wind, reap the whirlwind." },
      { ko: "콩 한 쪽도 나눠 먹는다", en: "Share and share alike." },
      { ko: "누워서 떡 먹기", en: "A piece of cake." },
    ],
    meaning: "You give a little but get much more back—often as punishment or loss.",
    images: [
      {
        src: "/card-art/part2-02-tall-grande-a.png",
        alt: "A barista hands a tiny Tall-labeled cup across the cafe counter",
      },
      {
        src: "/card-art/part2-02-tall-grande-b.png",
        alt: "The same barista returns an absurdly oversized Grande cup; the customer looks shocked",
      },
    ],
  },
  {
    remix: "중요한 건 꺾이는 고개",
    format: "MEME WORDPLAY",
    answer: "벼는 익을수록 고개를 숙인다",
    options: [
      { ko: "벼는 익을수록 고개를 숙인다", en: "The fuller the ear, the lower it bows." },
      { ko: "중이 제 머리 못 깎는다", en: "The cobbler’s children have no shoes." },
      { ko: "고래 싸움에 새우 등 터진다", en: "When elephants fight, the grass gets trampled." },
    ],
    meaning: "The wiser or more accomplished a person becomes, the more humble they should be.",
    images: [
      {
        src: "/card-art/part2-03-bowing-rice-a.png",
        alt: "A proud man stands chin-up beside stiff green rice while ripe golden rice bows in the field",
      },
      {
        src: "/card-art/part2-03-bowing-rice-b.png",
        alt: "The same man bows deeply among bowed ripe rice, hat and pride left on the path",
      },
    ],
  },
  {
    remix: "3년 차 서당 개, 폼 미쳤다",
    format: "PERFORMANCE MEME",
    answer: "서당 개 삼 년이면 풍월을 읊는다",
    options: [
      { ko: "서당 개 삼 년이면 풍월을 읊는다", en: "You pick things up by osmosis." },
      { ko: "개구리 올챙이 적 생각 못 한다", en: "Don’t forget where you came from." },
      { ko: "하룻강아지 범 무서운 줄 모른다", en: "Fools rush in where angels fear to tread." },
    ],
    meaning: "Long exposure to an environment can teach you something, even without formal study.",
    images: [
      {
        src: "/card-art/part2-04-seodang-dog-a.png",
        alt: "A bored dog yawns on a mat in the corner of a traditional village school",
      },
      {
        src: "/card-art/part2-04-seodang-dog-b.png",
        alt: "The same dog does calligraphy with a brush while astonished students and teacher watch",
      },
    ],
  },
  {
    remix: "아, 방앗간은 못 참지ㅋㅋ",
    format: "CAN’T-RESIST MEME",
    answer: "참새가 방앗간을 그냥 지나치랴",
    options: [
      { ko: "참새가 방앗간을 그냥 지나치랴", en: "Like a moth to a flame." },
      { ko: "가재는 게 편", en: "Birds of a feather flock together." },
      { ko: "울며 겨자 먹기", en: "Grin and bear it." },
    ],
    meaning: "People cannot easily pass by something they love or habitually enjoy.",
    images: [
      {
        src: "/card-art/part2-05-mill-sparrow-a.png",
        alt: "A sparrow banks hard toward spilled grain outside a traditional mill",
      },
      {
        src: "/card-art/part2-05-mill-sparrow-b.png",
        alt: "The same sparrow lands on the grain pile at the mill entrance, unable to resist",
      },
    ],
  },
  {
    remix: "설마: 사람 잡은 썰 푼다",
    format: "COMMUNITY POST TITLE",
    answer: "설마가 사람 잡는다",
    options: [
      { ko: "설마가 사람 잡는다", en: "Famous last words." },
      { ko: "말 한마디에 천 냥 빚도 갚는다", en: "Kind words go a long way." },
      { ko: "공든 탑이 무너지랴", en: "Hard work pays off." },
    ],
    meaning: "Careless confidence that ‘it probably won’t happen’ can cause real trouble.",
    images: [
      {
        src: "/card-art/part2-06-seolma-a.png",
        alt: "A hiker waves casually beside a cliff danger sign, brushing off the warning",
      },
      {
        src: "/card-art/part2-06-seolma-b.png",
        alt: "Later at a cafe, he animatedly tells friends the story while everyone cracks up",
      },
    ],
  },
  {
    remix: "라떼는 말이야",
    format: "GENERATION MEME",
    answer: "호랑이 담배 피던 시절",
    options: [
      { ko: "호랑이 담배 피던 시절", en: "Back in my day." },
      { ko: "개구리 올챙이 적 생각 못 한다", en: "Don’t forget where you came from." },
      { ko: "세 살 버릇 여든까지 간다", en: "Old habits die hard." },
    ],
    meaning: "Older folks start ‘back in my day’ stories—sometimes flexing how hard or glorious those days were.",
    images: [
      {
        src: "/card-art/part2-07-latte-a.png",
        alt: "An older man lectures at dinner while younger relatives look bored and check phones",
      },
      {
        src: "/card-art/part2-07-latte-b.png",
        alt: "Above him float exaggerated old-days scenes, including a tiger smoking a pipe",
      },
    ],
  },
  {
    remix: "굼벵이 구르는 폼 미쳤다",
    format: "PERFORMANCE MEME",
    answer: "굼벵이도 구르는 재주가 있다",
    options: [
      { ko: "굼벵이도 구르는 재주가 있다", en: "Every dog has its day." },
      { ko: "우물 안 개구리", en: "A frog in a well." },
      { ko: "낫 놓고 기역 자도 모른다", en: "Doesn’t know A from B." },
    ],
    meaning: "Everyone has at least one thing they can do well.",
    images: [
      {
        src: "/card-art/part2-08-grub.webp",
        alt: "A grub rolls like a champion athlete before a wildly cheering crowd",
      },
      {},
    ],
  },
];

function ImageCard({ slot, label }: { slot: ImageSlot; label: string }) {
  const filled = Boolean(slot.src);
  return (
    <div className={`image-slot ${filled ? "filled" : ""}`}>
      <span className="slot-label">{label}</span>
      {filled ? (
        <img className="card-art" src={slot.src} alt={slot.alt ?? "Card illustration"} />
      ) : (
        <>
          <div className="slot-shape">
            <span>+</span>
          </div>
          <strong>Image slot</strong>
          <small>Drop Gemini art here later.</small>
        </>
      )}
    </div>
  );
}

function LocaleSelect({
  locale,
  onChange,
  compact = false,
}: {
  locale: string;
  onChange: (code: string) => void;
  compact?: boolean;
}) {
  return (
    <label className={`locale-select ${compact ? "compact" : ""}`}>
      <span className="locale-select-label">{t(locale, "ui.locale_label")}</span>
      <select value={locale} onChange={(event) => onChange(event.target.value)} aria-label={t(locale, "ui.locale_label")}>
        {LOCALES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.nameKo} ({item.code})
          </option>
        ))}
      </select>
    </label>
  );
}

export default function Home() {
  const [gate, setGate] = useState<"brand" | "menu">("brand");
  const [part, setPart] = useState<0 | 1 | 2>(0);
  const [index, setIndex] = useState(0);
  const [misses, setMisses] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [triedWrong, setTriedWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [completedOne, setCompletedOne] = useState(false);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && isLocale(saved)) setLocale(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = textDirection(locale);
  }, [locale]);

  const changeLocale = (code: string) => {
    setLocale(code);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  };

  const cards = part === 1 ? partOneCards : partTwoCards;
  const card = cards[index];
  const isDone = part !== 0 && index >= cards.length;
  const tx = (key: string, vars?: Record<string, string | number>) => t(locale, key, vars);
  const optionLabel = (ko: string) => proverbText(locale, ko);

  const resetRound = () => {
    setSelected(null);
    setTriedWrong([]);
    setSolved(false);
  };

  const goHome = () => {
    setPart(0);
    setGate("brand");
    resetRound();
  };

  const begin = (nextPart: 1 | 2) => {
    setPart(nextPart);
    setIndex(0);
    setMisses(0);
    resetRound();
  };

  const choose = (option: Option) => {
    if (!card || solved || triedWrong.includes(option.ko)) return;

    setSelected(option.ko);

    if (option.ko === card.answer) {
      setSolved(true);
      return;
    }

    setMisses((value) => value + 1);
    setTriedWrong((list) => [...list, option.ko]);
  };

  const retryOptions = () => {
    setSelected(null);
  };

  const next = () => {
    if (index === cards.length - 1 && part === 1) setCompletedOne(true);
    setIndex((value) => value + 1);
    resetRound();
  };

  if (part === 0 && gate === "brand") {
    return (
      <main className="landing-shell gate-brand">
        <header className="topbar">
          <img className="brand-mark" src="/brand/app-mark.png" alt="Viral Vibe" />
          <div className="brand-name">SINAVRO</div>
          <LocaleSelect locale={locale} onChange={changeLocale} compact />
        </header>

        <button className="brand-stage" onClick={() => setGate("menu")} aria-label="Enter Viral Vibe">
          <div className="eyebrow">{tx("ui.sinavro_presents")}</div>
          <h1 className="viral-title" aria-label="Viral Vibe">
            <span className="viral-word" aria-hidden="true">
              <i>V</i>
              <i>I</i>
              <i>R</i>
              <i>A</i>
              <i>L</i>
            </span>
            <span className="vibe-animation" aria-hidden="true">
              <img src="/viral-vibe.gif" alt="" />
            </span>
          </h1>
          <div className="product-descriptor">{tx("ui.product_descriptor")}</div>
          <div className="org-row" aria-label="Publisher">
            <img
               className="org-logo institute"
               src="/brand/institute.png"
              alt="ONMAEUM"
              style={{ width: "64px", height: "64px", objectFit: "contain" }}
/>
            <span className="org-name">
              한국어교육AI연구개발원 <span className="copyright-mark">© 2026</span>
            </span>
          </div>
          <span className="enter-hint">{tx("ui.tap_to_continue")}</span>
        </button>
      </main>
    );
  }

  if (part === 0) {
    return (
      <main className="landing-shell gate-menu">
        <header className="topbar">
          <button className="mini-brand" onClick={() => setGate("brand")} aria-label="Back to brand gate">
            <img src="/brand/app-mark.png" alt="" />
          </button>
          <div className="brand-name">SINAVRO</div>
          <LocaleSelect locale={locale} onChange={changeLocale} compact />
        </header>

        <section className="menu-hero">
          <h1 className="brand-slogan">{tx("ui.brand_slogan")}</h1>
          <p className="hero-copy">{tx("ui.hero_copy")}</p>
          <div className="hero-tags" aria-label="Game themes">
            <span>{tx("ui.tag.korean_slang")}</span>
            <span>{tx("ui.tag.proverbs")}</span>
            <span>{tx("ui.tag.world_wisdom")}</span>
          </div>
        </section>

        <section className="part-grid" aria-label="Choose a game part">
          <article className="part-card coral-card">
            <div className="part-number">PART 01</div>
            <div className="part-icon">#</div>
            <h2>{tx("ui.part01_title")}</h2>
            <p>{tx("ui.part01_body")}</p>
            <ul>
              <li>{tx("ui.part01_li1")}</li>
              <li>{tx("ui.part01_li2")}</li>
              <li>{tx("ui.part01_li3")}</li>
            </ul>
            <button onClick={() => begin(1)}>
              {tx("ui.start_part1")}
            </button>
          </article>

          <article className="part-card lime-card">
            <div className="part-number">PART 02</div>
            <div className="part-icon remix-icon">↻</div>
            <h2>{tx("ui.part02_title")}</h2>
            <p>{tx("ui.part02_body")}</p>
            <ul>
              <li>{tx("ui.part02_li1")}</li>
              <li>{tx("ui.part02_li2")}</li>
              <li>{tx("ui.part02_li3")}</li>
            </ul>
            <button onClick={() => begin(2)}>
              {tx("ui.start_part2")}
            </button>
          </article>
        </section>

        <footer className="landing-footer org-footer">
          <span className="org-name">
            한국어교육AI연구개발원 <span className="copyright-mark">© 2026</span>
          </span>
          <img className="tk-mark" src="/brand/tk-banner.png" alt="TK샘" />
        </footer>
      </main>
    );
  }

  if (isDone) {
    const resultTitle =
      misses === 0
        ? tx("ui.result.immaculate")
        : misses <= 3
          ? tx("ui.result.close")
          : tx("ui.result.loading");
    const resultBody =
      misses === 0
        ? tx("ui.result.zero_misses")
        : tx("ui.result.misses_line", { n: misses });

    return (
      <main className="result-shell">
        <div className="result-card">
          <div className="result-burst">{misses}</div>
          <div className="eyebrow">{tx("ui.part_complete", { n: String(part).padStart(2, "0") })}</div>
          <h1>{resultTitle}</h1>
          <p>{resultBody}</p>
          <p>{part === 1 ? tx("ui.result.after_part1") : tx("ui.result.after_part2")}</p>
          <div className="world-question">
            <span>{tx("ui.around_the_world")}</span>
            {tx("ui.world_question")}
          </div>
          <div className="result-actions">
            {part === 1 && (
              <button className="primary-action" onClick={() => begin(2)}>
                {tx("ui.continue_part2")}
              </button>
            )}
            {part === 2 && (
              <button className="primary-action" onClick={() => begin(1)}>
                {tx("ui.go_part1")}
              </button>
            )}
            <button className="secondary-action" onClick={() => begin(part as 1 | 2)}>
              {tx("ui.play_again")}
            </button>
            <button className="text-action" onClick={goHome}>
              {tx("ui.back_home")}
            </button>
          </div>
        </div>
      </main>
    );
  }

  const isPartOne = part === 1;
  const selectedOption = card.options.find((option) => option.ko === selected) ?? null;
  const selectedCorrect = selected === card.answer;
  const showingFeedback = Boolean(selectedOption);
  const partOne = card as PartOneCard;
  const partTwo = card as PartTwoCard;

  return (
    <main className="game-shell">
      <header className="game-header">
        <button className="mini-brand" onClick={goHome} aria-label="Back to home">
          <img src="/brand/app-mark.png" alt="" />
        </button>
        <div className="game-title">
          <span>PART {String(part).padStart(2, "0")}</span>
          {isPartOne ? tx("ui.game_title.part1") : tx("ui.game_title.part2")}
        </div>
        <div className="header-actions">
          <LocaleSelect locale={locale} onChange={changeLocale} compact />
          {part === 2 && (
            <button className="part-switch" onClick={() => begin(1)} type="button">
              {tx("ui.part_switch_1")}
            </button>
          )}
          {part === 1 && (
            <button className="part-switch" onClick={() => begin(2)} type="button">
              {tx("ui.part_switch_2")}
            </button>
          )}
          <div className="score">
            {tx("ui.misses")} <strong>{misses}</strong>
          </div>
        </div>
      </header>

      <div className="progress-row">
        <div className="progress-track">
          <span style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
        </div>
        <span>
          {index + 1} / {cards.length}
        </span>
      </div>

      <section className="play-grid">
        <div className="visual-column">
          <ImageCard slot={card.images[0]} label={`PANEL A · ${String(index + 1).padStart(2, "0")}`} />
          <ImageCard slot={card.images[1]} label={`PANEL B · ${String(index + 1).padStart(2, "0")}`} />
        </div>

        <div className="question-column">
          <div className="question-top">
            {isPartOne ? (
              <>
                <div className="meta-line">
                  <span>{tx(cardFieldKey(1, index, "era"))}</span>
                  <span>{tx("ui.real_korean_slang")}</span>
                </div>
                <div className="slang-word">{partOne.term}</div>
                <div className="romanization">[{partOne.romanization}]</div>
                <div className="meaning-box">
                  <span>{tx("ui.the_vibe")}</span>
                  {tx(cardFieldKey(1, index, "meaning"))}
                </div>
                <div className="scenario">
                  <span>{tx("ui.picture_this")}</span>
                  {tx(cardFieldKey(1, index, "scenario"))}
                </div>
                <h2>{tx("ui.which_proverb")}</h2>
              </>
            ) : (
              <>
                <div className="meta-line">
                  <span>{tx(cardFieldKey(2, index, "format"))}</span>
                  <span>{tx("ui.creative_remake")}</span>
                </div>
                <div className="remix-quote">“{partTwo.remix}”</div>
                <div className="scenario remix-instruction">
                  <span>{tx("ui.decode_it")}</span>
                  {tx("ui.find_proverb_hint_p2")}
                </div>
                <h2>{tx("ui.find_proverb_q")}</h2>
              </>
            )}
          </div>

          <div className="answer-stage">
            {showingFeedback && selectedOption ? (
              <div className={`match-feedback ${selectedCorrect ? "right" : "try-again"}`}>
                <div className="match-feedback-top">
                  <span>{selectedCorrect ? tx("ui.correct") : tx("ui.wrong")}</span>
                  <em>{tx("ui.match_label")}</em>
                </div>
                <strong>{optionLabel(selectedOption.ko)}</strong>
                {!selectedCorrect && <p>{tx("ui.wrong_hint")}</p>}
                {selectedCorrect ? (
                  <button className="next-button" onClick={next}>
                    {index === cards.length - 1 ? tx("ui.see_results") : tx("ui.next_card")} →
                  </button>
                ) : (
                  <button className="next-button retry" onClick={retryOptions}>
                    {tx("ui.try_again")} →
                  </button>
                )}
              </div>
            ) : (
              <div className="answer-list">
                {card.options.map((option, optionIndex) => {
                  const isTriedWrong = triedWrong.includes(option.ko);
                  return (
                    <button
                      key={option.ko}
                      className={isTriedWrong ? "wrong" : ""}
                      onClick={() => choose(option)}
                      disabled={isTriedWrong}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                      <strong className="option-ko">{option.ko}</strong>
                      {isTriedWrong && <b className="option-x">×</b>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="game-footer">
        <span>{tx("ui.old_wisdom_new_vibes")}</span>
        <span>
          한국어교육AI연구개발원 <span className="copyright-mark">© 2026</span>
        </span>
        {completedOne && part === 2 && <span>{tx("ui.part1_cleared")}</span>}
      </footer>
    </main>
  );
}
