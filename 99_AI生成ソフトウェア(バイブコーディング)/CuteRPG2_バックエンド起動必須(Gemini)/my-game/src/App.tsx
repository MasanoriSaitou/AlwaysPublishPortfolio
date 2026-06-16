import { useState, useEffect } from 'react';

// ==================== TYPESCRIPT INTERFACES ====================
interface Quest {
  id: string;
  title: string;
  description: string;
  reqType: 'TALK_ALL' | 'COLLECT_ITEM' | 'FRIEND_MONSTER';
  reqTarget?: string | number;
  reqItem?: string;
  reqCount?: number;
  reward: {
    coins: number;
    item?: string;
  };
  guide: string;
}

interface NPC {
  name: string;
  avatar: string;
  greeting: string;
  quests: Quest[];
}

interface Monster {
  id: string;
  name: string;
  avatar: string;
  maxFriendship: number;
  intro: string;
  behaviors: {
    talk: { success: number; msg: string };
    wave: { success: number; msg: string };
    present: Record<string, number>;
  };
  successMsg: string;
  failedMsg: string;
}

interface InventoryItem {
  name: string;
  count: number;
}

interface ShopItem {
  name: string;
  cost: number;
  buy?: boolean;
  desc: string;
}

// ==================== COZY CUSTOM SVG ICONS (with layout safe fallbacks) ====================
// Safety fallback inline styles prevent SVGs from expanding infinitely if Tailwind fails to load.
const HeartIcon = ({ className = "w-6 h-6", fill = "none" }: { className?: string; fill?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill={fill} 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '16px', minHeight: '16px', display: 'inline-block' }}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const SparklesIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '16px', minHeight: '16px', display: 'inline-block' }}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
  </svg>
);

const ShoppingBagIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '16px', minHeight: '16px', display: 'inline-block' }}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const BookOpenIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '16px', minHeight: '16px', display: 'inline-block' }}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const MessageCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '16px', minHeight: '16px', display: 'inline-block' }}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const CoinsIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '16px', minHeight: '16px', display: 'inline-block' }}
  >
    <circle cx="8" cy="8" r="6" />
    <circle cx="18" cy="18" r="4" />
    <path d="M12 18a6 6 0 0 0-6-6" />
  </svg>
);

const MapPinIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '24px', height: '24px', minWidth: '16px', minHeight: '16px', display: 'inline-block' }}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ width: '16px', height: '16px', minWidth: '12px', minHeight: '12px', display: 'inline-block' }}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);


// ==================== CUTE MONSTER SVG ASSETS ====================
const MonsterAvatar = ({ type, className = "w-24 h-24" }: { type: string; className?: string }) => {
  const fallbackStyle = { width: '96px', height: '96px', display: 'block', margin: '0 auto' };
  switch (type) {
    case 'mochi_slime':
      return (
        <svg viewBox="0 0 100 100" className={className} style={fallbackStyle}>
          <ellipse cx="50" cy="65" rx="35" ry="22" fill="#FFD1DC" stroke="#8E4A5B" strokeWidth="4" />
          {/* Blush */}
          <ellipse cx="30" cy="68" rx="6" ry="3" fill="#FF94B8" opacity="0.6" />
          <ellipse cx="70" cy="68" rx="6" ry="3" fill="#FF94B8" opacity="0.6" />
          {/* Eyes */}
          <circle cx="38" cy="60" r="4.5" fill="#4A2834" />
          <circle cx="62" cy="60" r="4.5" fill="#4A2834" />
          <circle cx="36" cy="58" r="1.5" fill="#FFF" />
          <circle cx="60" cy="58" r="1.5" fill="#FFF" />
          {/* Mouth */}
          <path d="M 46 68 Q 50 72 54 68" fill="none" stroke="#4A2834" strokeWidth="3" strokeLinecap="round" />
          {/* Star accessory */}
          <polygon points="50,30 53,37 60,38 55,43 57,50 50,46 43,50 45,43 40,38 47,37" fill="#FFE57F" stroke="#D89E00" strokeWidth="2" />
        </svg>
      );
    case 'leaf_squirrel':
      return (
        <svg viewBox="0 0 100 100" className={className} style={fallbackStyle}>
          {/* Tail */}
          <path d="M 65 75 Q 85 70 80 40 Q 75 25 60 40" fill="#E29B69" stroke="#5E381E" strokeWidth="4" strokeLinecap="round" />
          {/* Body */}
          <ellipse cx="45" cy="65" rx="22" ry="22" fill="#F3B381" stroke="#5E381E" strokeWidth="4" />
          {/* Leaf on head */}
          <path d="M 45 22 Q 60 12 45 5 Q 30 12 45 22 Z" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
          <line x1="45" y1="22" x2="45" y2="7" stroke="#2E7D32" strokeWidth="2" />
          {/* Ears */}
          <polygon points="30,45 25,30 38,38" fill="#F3B381" stroke="#5E381E" strokeWidth="3" />
          <polygon points="60,45 65,30 52,38" fill="#F3B381" stroke="#5E381E" strokeWidth="3" />
          {/* Eyes */}
          <circle cx="37" cy="55" r="4.5" fill="#3D200B" />
          <circle cx="53" cy="55" r="4.5" fill="#3D200B" />
          {/* Cheeks */}
          <circle cx="32" cy="60" r="4" fill="#FF8A80" opacity="0.7" />
          <circle cx="58" cy="60" r="4" fill="#FF8A80" opacity="0.7" />
          {/* Nose & Mouth */}
          <circle cx="45" cy="58" r="2.5" fill="#3D200B" />
          <path d="M 42 63 Q 45 65 48 63" fill="none" stroke="#3D200B" strokeWidth="2.5" />
        </svg>
      );
    case 'cotton_lamb':
      return (
        <svg viewBox="0 0 100 100" className={className} style={fallbackStyle}>
          {/* Fluffy Body */}
          <circle cx="35" cy="65" r="18" fill="#FFF" stroke="#6D6D6D" strokeWidth="3" />
          <circle cx="65" cy="65" r="18" fill="#FFF" stroke="#6D6D6D" strokeWidth="3" />
          <circle cx="50" cy="55" r="20" fill="#FFF" stroke="#6D6D6D" strokeWidth="3" />
          <rect x="32" y="52" width="36" height="24" fill="#FFF" />
          {/* Feet */}
          <rect x="38" y="76" width="6" height="12" rx="3" fill="#A1887F" stroke="#5D4037" strokeWidth="3" />
          <rect x="56" y="76" width="6" height="12" rx="3" fill="#A1887F" stroke="#5D4037" strokeWidth="3" />
          {/* Head fluffy parts */}
          <circle cx="50" cy="35" r="14" fill="#FFF" stroke="#6D6D6D" strokeWidth="3" />
          <circle cx="40" cy="30" r="10" fill="#FFF" />
          <circle cx="60" cy="30" r="10" fill="#FFF" />
          {/* Face */}
          <ellipse cx="50" cy="42" rx="11" ry="9" fill="#FFE0B2" stroke="#5D4037" strokeWidth="3" />
          <circle cx="46" cy="40" r="2.5" fill="#5D4037" />
          <circle cx="54" cy="40" r="2.5" fill="#5D4037" />
          <path d="M 48 45 Q 50 47 52 45" fill="none" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="42" cy="43" r="2" fill="#FF8A80" />
          <circle cx="58" cy="43" r="2" fill="#FF8A80" />
        </svg>
      );
    case 'melody_bird':
      return (
        <svg viewBox="0 0 100 100" className={className} style={fallbackStyle}>
          {/* Wings */}
          <path d="M 22 55 Q 10 40 25 45" fill="none" stroke="#00ACC1" strokeWidth="4" strokeLinecap="round" />
          {/* Body */}
          <circle cx="50" cy="55" r="24" fill="#E0F7FA" stroke="#00838F" strokeWidth="4" />
          {/* Cheeks */}
          <ellipse cx="38" cy="58" rx="5" ry="3" fill="#FF8A80" opacity="0.7" />
          <ellipse cx="62" cy="58" rx="5" ry="3" fill="#FF8A80" opacity="0.7" />
          {/* Eyes */}
          <circle cx="44" cy="50" r="3.5" fill="#004D40" />
          <circle cx="56" cy="50" r="3.5" fill="#004D40" />
          <circle cx="42" cy="48" r="1" fill="#FFF" />
          <circle cx="54" cy="48" r="1" fill="#FFF" />
          {/* Beak */}
          <polygon points="50,52 47,58 53,58" fill="#FFB300" stroke="#FF6F00" strokeWidth="2" />
          {/* Musical Crest */}
          <path d="M 50 31 Q 53 22 62 25" fill="none" stroke="#FF4081" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="62" cy="25" r="4" fill="#FF4081" />
        </svg>
      );
    default:
      return (
        <div className={`${className} bg-pink-100 rounded-full flex items-center justify-center text-4xl`} style={fallbackStyle}>
          🧸
        </div>
      );
  }
};

// ==================== COZY NPC AVATARS ====================
type NPCId = 'mayor' | 'granny' | 'alchemist' | 'gardener';
interface NpcAvatarProps {
  npcId: NPCId;
}

const NpcAvatar = ({ npcId }: NpcAvatarProps) => {
  switch (npcId) {
    case 'mayor': // Rabbit Mayor
      return (
        <div className="w-16 h-16 bg-amber-100 rounded-full border-4 border-yellow-700 flex items-center justify-center text-3xl shadow-md relative">
          🐰<span className="absolute bottom-0 right-0 text-xs">🎩</span>
        </div>
      );
    case 'granny': // Sweet old granny
      return (
        <div className="w-16 h-16 bg-rose-50 rounded-full border-4 border-rose-400 flex items-center justify-center text-3xl shadow-md relative">
          👵<span className="absolute bottom-0 right-0 text-xs">👵</span>
        </div>
      );
    case 'alchemist': // Cute mage girl
      return (
        <div className="w-16 h-16 bg-purple-100 rounded-full border-4 border-purple-500 flex items-center justify-center text-3xl shadow-md relative">
          🧙‍♀️<span className="absolute bottom-0 right-0 text-xs">🧪</span>
        </div>
      );
    case 'gardener': // Cheerful farmer boy
      return (
        <div className="w-16 h-16 bg-green-100 rounded-full border-4 border-green-500 flex items-center justify-center text-3xl shadow-md relative">
          🧑‍🌾<span className="absolute bottom-0 right-0 text-xs">🌱</span>
        </div>
      );
    default:
      return <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">👤</div>;
  }
};

// ==================== TOWN PEOPLE & QUEST DATA ====================
const NPCS: Record<NPCId, NPC> = {
  mayor: {
    name: "市長のラビさん",
    avatar: "mayor",
    greeting: "ようこそ、のどかタウンへ！ここを世界一あったか〜い町にするのが、わたしの夢なのです♪",
    quests: [
      {
        id: "mayor_quest_1",
        title: "町のみんなに挨拶しよう",
        description: "町の住人たちみんなと会話をして、心を通わせましょう。",
        reqType: "TALK_ALL",
        reqTarget: 3,
        reward: { coins: 50, item: "ほっこりお茶パック" },
        guide: "広場にいるおばあちゃん、錬金術師リリィ、庭師ココに話しかけてみてね！"
      },
      {
        id: "mayor_quest_2",
        title: "ひだまりの森のウワサ",
        description: "最近、森にさびしがりやの「もっちりスライム」が現れたそうです。優しくなかよしになってきてくれませんか？",
        reqType: "FRIEND_MONSTER",
        reqTarget: "mochi_slime",
        reward: { coins: 150, item: "レインボーリボン" },
        guide: "「冒険にいく」から「ひだまりの森」を歩いて、もっちりスライムを見つけてなかよくしてね。"
      }
    ]
  },
  granny: {
    name: "ハナおばあちゃん",
    avatar: "granny",
    greeting: "あらあら、いらっしゃい。今日も良い天気だねぇ。お茶でも飲んでゆっくりしておくれ。",
    quests: [
      {
        id: "granny_quest_1",
        title: "大好物のあかいベリー",
        description: "「おひさま畑」に実る「あかいベリー」を3個摘んできてくれたら、特製のおやつをあげるよ。",
        reqType: "COLLECT_ITEM",
        reqItem: "あかいベリー",
        reqCount: 3,
        reward: { coins: 80, item: "ハナおばあちゃんの手作りクッキー" },
        guide: "「おひさま畑」を探索して、あかいベリーを3つ集めておばあちゃんに渡してね。"
      }
    ]
  },
  alchemist: {
    name: "錬金術師のリリィ",
    avatar: "alchemist",
    greeting: "あ、こんにちは！今、みんなをニコニコにする「ハッピーポーション」を研究中んだ。素材が足りなくて困ってるの…。",
    quests: [
      {
        id: "alchemist_quest_1",
        title: "ひかる薬草の採取",
        description: "「ひだまりの森」の奥に生えている「ひかる薬草」を2個持ってきてほしいな。魔法の調合に使うんだ！",
        reqType: "COLLECT_ITEM",
        reqItem: "ひかる薬草",
        reqCount: 2,
        reward: { coins: 100, item: "ふしぎなキャンディ" },
        guide: "「ひだまりの森」を歩いて、キラキラ輝く「ひかる薬草」を2つ採取してリリィに届けよう。"
      }
    ]
  },
  gardener: {
    name: "庭師のココくん",
    avatar: "gardener",
    greeting: "やあ！畑や花壇の世話は僕に任せて！土をさわっている時が一番シアワセんだ。",
    quests: [
      {
        id: "gardener_quest_1",
        title: "ふわふわヒツジとの出会い",
        description: "「もふもふコヒツジ」が、僕の植えたクローバーを食べたそうにしてるんだ。なかよしになって僕の庭に誘ってくれないかな？",
        reqType: "FRIEND_MONSTER",
        reqTarget: "cotton_lamb",
        reward: { coins: 200, item: "四つ葉のクローバー" },
        guide: "「おひさま畑」や「森」を探索して、もふもふコヒツジとなかよしになろう。"
      }
    ]
  }
};

// ==================== MONSTER ENCOUNTER DATA ====================
const MONSTERS: Monster[] = [
  {
    id: "mochi_slime",
    name: "もっちりスライム",
    avatar: "mochi_slime",
    maxFriendship: 100,
    intro: "ぷにぷに体を震わせて、こちらの様子を伺っている！",
    behaviors: {
      talk: { success: 25, msg: "あなたの優しい声を聞いて、嬉しそうにぷにっと跳ねた！" },
      wave: { success: 15, msg: "おどけて片手をふると、スライムも形をぐにゃりと変えて応えてくれた！" },
      present: { "ほっこりお茶パック": 50, "レインボーリボン": 80, "ふしぎなキャンディ": 60, "通常": 30 }
    },
    successMsg: "もっちりスライムはすっかりあなたを気に入り、頭にぴったりと乗っかってきた！",
    failedMsg: "もっちりスライムはちょっぴり恥ずかしくなって、茂みにぷにっと隠れてしまった…"
  },
  {
    id: "leaf_squirrel",
    name: "はっぱリス",
    avatar: "leaf_squirrel",
    maxFriendship: 100,
    intro: "頭の上の葉っぱをパタパタ動かしながら、きょとんとしている。",
    behaviors: {
      talk: { success: 15, msg: "話しかけると、少し警戒をときながら小さな耳をピクピクさせた。" },
      wave: { success: 30, msg: "くるくるとその場で回ってみせると、はっぱリスも負けじとクルリと回った！" },
      present: { "あかいベリー": 60, "ハナおばあちゃんの手作りクッキー": 80, "ふしぎなキャンディ": 50, "通常": 30 }
    },
    successMsg: "はっぱリスはあなたの肩に飛び乗り、お礼に木の実をプレゼントしてくれた！",
    failedMsg: "はっぱリスはパタパタと素べく木の上に登っていってしまった…"
  },
  {
    id: "cotton_lamb",
    name: "もふもふコヒツジ",
    avatar: "cotton_lamb",
    maxFriendship: 120,
    intro: "めぇ〜と寂しげに鳴きながら、もふもふの毛をふるわせている。",
    behaviors: {
      talk: { success: 20, msg: "穏やかな声でなでるように話しかけると、うっとり目を細めた。" },
      wave: { success: 10, msg: "ダンスを踊ってみせると、少しステップを踏むように歩み寄ってきた！" },
      present: { "ひかる薬草": 50, "ハナおばあちゃんの手作りクッキー": 70, "ふしぎなキャンディ": 90, "通常": 40 }
    },
    successMsg: "もふもふコヒツジはあなたにピタッと体を寄せ、あったかい温もりをわけてくれた！",
    failedMsg: "もふもふコヒツジはトコトコと牧草の彼方へと去っていってしまった…"
  },
  {
    id: "melody_bird",
    name: "うたう小鳥",
    avatar: "melody_bird",
    maxFriendship: 110,
    intro: "きれいな声でちゅちゅっと一節歌い、あなたの目の前を旋回した。",
    behaviors: {
      talk: { success: 15, msg: "歌いかけるように優しく話すと、心地よさそうに目を閉じた。" },
      wave: { success: 25, msg: "両手を広げて羽ばたきを真似すると、目の前の枝にとまって嬉しそうに歌った！" },
      present: { "あかいベリー": 50, "ふしぎなキャンディ": 80, "通常": 30 }
    },
    successMsg: "うたう小鳥はあなたの手のひらに優しく舞い降り、美しい音色のさえずりを聞かせてくれた！",
    failedMsg: "うたう小鳥は青い空へ向かって気持ちよさそうに飛び去っていってしまった…"
  }
];

// ==================== COZY SHOP ITEMS ====================
const SHOP_ITEMS: ShopItem[] = [
  { name: "あかいベリー", cost: 15, buy: true, desc: "甘酸っぱくておばあちゃんやリスが大好きなくだもの。" },
  { name: "ひかる薬草", cost: 25, buy: true, desc: "ほんのり輝く、お薬や調合に引っ張りだこの貴重な葉っぱ。" },
  { name: "ほっこりお茶パック", cost: 30, desc: "心までポカポカ温まるハーブティーの原料。スライムが好みそう。" },
  { name: "レインボーリボン", cost: 50, desc: "おしゃれなカラフルリボン。スライムやおしゃれ好きに。" },
  { name: "ふしぎなキャンディ", cost: 40, desc: "口に入れると星屑の味がする。モンスターみんなが大喜びするおやつ。" },
];

export default function App() {
  // --- STATE ---
  const [gameState, setGameState] = useState<string>('TITLE'); // TITLE, CHAR_CREATE, TOWN, EXPLORE, BATTLE, SHOP
  
  // Player Profile
  const [charName, setCharName] = useState<string>("ココ");
  const [charGender, setCharGender] = useState<string>("girl"); // girl, boy, neutral
  const [themeColor, setThemeColor] = useState<string>("#FF94B8"); // Pink, Blue, Green, Yellow
  
  // Game variables
  const [energy, setEnergy] = useState<number>(100);
  const maxEnergy = 100;
  const [coins, setCoins] = useState<number>(100);
  const [day, setDay] = useState<number>(1);
  const [townHappiness, setTownHappiness] = useState<number>(20);
  
  // Typed Inventories and Lists to avoid 'never' or implicitly 'any' type errors
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { name: "あかいベリー", count: 2 },
    { name: "ほっこりお茶パック", count: 1 }
  ]);
  const [companions, setCompanions] = useState<Monster[]>([]); // Friended monsters
  const [talkedNpcs, setTalkedNpcs] = useState<NPCId[]>([]); // Array of NPC IDs spoken to this day
  
  // Quests State
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [selectedNpcId, setSelectedNpcId] = useState<NPCId | null>(null);
  
  // Explore state
  const [currentArea, setCurrentArea] = useState<'forest' | 'field' | null>(null);
  const [areaLogs, setAreaLogs] = useState<string[]>([]);
  
  // Battle (Nakayoshi mode) state
  const [battleMonster, setBattleMonster] = useState<Monster | null>(null);
  const [battleFriendship, setBattleFriendship] = useState<number>(0);
  const [battleLogs, setBattleLogs] = useState<string[]>([]);
  const [battleTurnsLeft, setBattleTurnsLeft] = useState<number>(5);
  const [battleSelectedPresent, setBattleSelectedPresent] = useState<string>("");

  // Notification text popup
  const [toast, setToast] = useState<string | null>(null);

  // --- AUDIO OR EFFECT MOCK ---
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // --- INITIALIZE STARTING QUEST ---
  useEffect(() => {
    // Add Mayor's first quest on start
    setActiveQuests([NPCS.mayor.quests[0]]);
  }, []);

  // --- HELPER FOR INVENTORY ADD/REMOVE ---
  const addItem = (itemName: string, count: number = 1) => {
    setInventory(prev => {
      const idx = prev.findIndex(i => i.name === itemName);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].count += count;
        return updated;
      }
      return [...prev, { name: itemName, count }];
    });
  };

  const removeItem = (itemName: string, count: number = 1) => {
    setInventory(prev => {
      const idx = prev.findIndex(i => i.name === itemName);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].count -= count;
        if (updated[idx].count <= 0) {
          updated.splice(idx, 1);
        }
        return updated;
      }
      return prev;
    });
  };

  const getItemCount = (itemName: string): number => {
    const item = inventory.find(i => i.name === itemName);
    return item ? item.count : 0;
  };

  // --- HELP / QUEST PROGRESS CHECKERS ---
  const checkQuests = (): Quest[] => {
    const questsToComplete: Quest[] = [];

    activeQuests.forEach((quest) => {
      if (quest.reqType === "COLLECT_ITEM" && quest.reqItem) {
        const count = getItemCount(quest.reqItem);
        if (count >= (quest.reqCount ?? 0)) {
          questsToComplete.push(quest);
        }
      } else if (quest.reqType === "TALK_ALL") {
        if (talkedNpcs.length >= (quest.reqTarget as number)) {
          questsToComplete.push(quest);
        }
      } else if (quest.reqType === "FRIEND_MONSTER" && quest.reqTarget) {
        const isFriended = companions.some(c => c.id === quest.reqTarget);
        if (isFriended) {
          questsToComplete.push(quest);
        }
      }
    });

    return questsToComplete;
  };

  // Turn in Quest
  const handleTurnInQuest = (questId: string) => {
    const quest = activeQuests.find(q => q.id === questId);
    if (!quest) return;

    // Remove required items if any
    if (quest.reqType === "COLLECT_ITEM" && quest.reqItem && quest.reqCount) {
      removeItem(quest.reqItem, quest.reqCount);
    }

    // Distribute rewards
    setCoins(prev => prev + quest.reward.coins);
    if (quest.reward.item) {
      addItem(quest.reward.item, 1);
    }
    
    // Increase Town Happiness
    setTownHappiness(prev => Math.min(100, prev + 15));
    
    // Update active lists
    setActiveQuests(prev => prev.filter(q => q.id !== questId));
    setCompletedQuestIds(prev => [...prev, questId]);
    
    showToast(`✨ クエスト「${quest.title}」を達成！ ${quest.reward.coins}コイン獲得！`);

    // Give follow-up quests if applicable
    if (questId === "mayor_quest_1") {
      // Unlock Mayor Quest 2
      setActiveQuests(prev => [...prev, NPCS.mayor.quests[1]]);
      showToast("🌸 市長から新しいお願いごとが届きました！");
    } else if (questId === "mayor_quest_2") {
      // Add Gardener Quest 1
      setActiveQuests(prev => [...prev, NPCS.gardener.quests[0]]);
    }
  };

  // Talk to NPC
  const handleTalkToNpc = (npcId: NPCId) => {
    setSelectedNpcId(npcId);
    if (!talkedNpcs.includes(npcId)) {
      const newTalked = [...talkedNpcs, npcId];
      setTalkedNpcs(newTalked);
      showToast(`💬 ${NPCS[npcId].name}と今日のお話をしました！`);
    }
  };

  // --- REST AT HOME TO RESTORE ENERGY ---
  const handleRestHome = () => {
    if (energy >= maxEnergy) {
      showToast("まだ元気いっぱいだよ！冒険に出かけよう！");
      return;
    }
    setEnergy(maxEnergy);
    setDay(prev => prev + 1);
    setTalkedNpcs([]); // reset daily talk tracker
    showToast("🏡 自宅のふかふかベッドで休みました。エネルギー全回復！ 新しい一日が始まります。");
  };

  // --- EXPLORATION MECHANICS ---
  const handleStartExplore = (area: 'forest' | 'field') => {
    if (energy < 15) {
      showToast("エネルギーが足りません。お家で休んでね！");
      return;
    }
    setCurrentArea(area);
    setEnergy(prev => Math.max(0, prev - 15));
    setGameState('EXPLORE');
    
    // Initial logs based on area
    const areaName = area === 'forest' ? 'ひだまりの森' : 'おひさま畑';
    setAreaLogs([
      `🌳 ${areaName}に一歩踏み出しました。のんびり探索してみましょう！`,
    ]);
  };

  const handleExploreStep = () => {
    if (energy < 10) {
      showToast("これ以上探索するエネルギーがありません。お家で休もう！");
      return;
    }
    setEnergy(prev => Math.max(0, prev - 10));

    // Roll random event
    // 45% Find item, 30% Meet Monster, 25% Flavor text
    const roll = Math.random();
    let newLog = "";

    if (roll < 0.45) {
      // Find item
      const itemPool = currentArea === 'forest' 
        ? ["あかいベリー", "ひかる薬草", "あかいベリー"] 
        : ["あかいベリー", "あかいベリー", "ひかる薬草"];
      const foundItem = itemPool[Math.floor(Math.random() * itemPool.length)];
      addItem(foundItem, 1);
      newLog = `✨ 草むらをのぞくと、おいしそうな【${foundItem}】を見つけた！カバンにしまいました。`;
    } else if (roll < 0.75) {
      // Meet Monster!
      const availableMonsters = currentArea === 'forest' 
        ? MONSTERS.filter(m => m.id === 'mochi_slime' || m.id === 'leaf_squirrel' || m.id === 'melody_bird')
        : MONSTERS.filter(m => m.id === 'cotton_lamb' || m.id === 'leaf_squirrel');
      
      const chosen = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
      
      // Start Battle state
      setBattleMonster(chosen);
      setBattleFriendship(10); // Start with 10 friendship points
      setBattleTurnsLeft(5);
      setBattleSelectedPresent("");
      setBattleLogs([
        `🎀 あっ！目の前に【${chosen.name}】がひょっこり現れたよ！`,
        `💬 ${chosen.intro}`
      ]);
      setGameState('BATTLE');
      return;
    } else {
      // Flavor text
      const flavorTexts = [
        "そよ風がふきぬけて、心地よいお花の香りが漂ってきた。ふぅ、いやされるなぁ。",
        "木漏れ日が地面にきれいな模様を作っている。のんびり歩くだけで元気がわいてくるね。",
        "足元をカラフルなチョウチョがひらひらと通り過ぎていった。どこへ行くのかな？",
        "ふかふかのコケが生えた切り株を見つけた。ちょっと腰掛けて一休みした。"
      ];
      newLog = `🌸 ${flavorTexts[Math.floor(Math.random() * flavorTexts.length)]}`;
    }

    setAreaLogs(prev => [newLog, ...prev]);
  };

  // --- NAKAYOSHI BATTLE MECHANICS ---
  const handleBattleAction = (actionType: 'talk' | 'wave' | 'present' | 'flee') => {
    if (!battleMonster || battleTurnsLeft <= 0) return;

    let friendshipGained = 0;
    let logMessage = "";
    const turnsRemaining = battleTurnsLeft - 1;
    setBattleTurnsLeft(turnsRemaining);

    if (actionType === 'talk') {
      const config = battleMonster.behaviors.talk;
      // High chance of medium gain
      friendshipGained = config.success + Math.floor(Math.random() * 11) - 5; // offset +/- 5
      logMessage = `🗣️ あなた：「こんにちは！いっしょに遊ばない？」`;
      setBattleLogs(prev => [
        logMessage,
        `💖 ${config.msg}（なかよし度 +${friendshipGained}）`,
        ...prev
      ]);
    } else if (actionType === 'wave') {
      const config = battleMonster.behaviors.wave;
      // High random spread
      friendshipGained = config.success + Math.floor(Math.random() * 15) - 7;
      logMessage = `🤸 あなた：ピョンピョン跳ねたり、手を大きくふって踊ってみせた！`;
      setBattleLogs(prev => [
        logMessage,
        `💖 ${config.msg}（なかよし度 +${friendshipGained}）`,
        ...prev
      ]);
    } else if (actionType === 'present') {
      if (!battleSelectedPresent) {
        showToast("あげるプレゼントをカバンから選んでね！");
        setBattleTurnsLeft(battleTurnsLeft); // restore turn
        return;
      }
      
      const itemCost = battleMonster.behaviors.present[battleSelectedPresent] || battleMonster.behaviors.present["通常"];
      friendshipGained = itemCost + Math.floor(Math.random() * 11); // always positive/high bonus
      
      // Consume item
      removeItem(battleSelectedPresent, 1);
      
      logMessage = `🎁 あなた：大切な「${battleSelectedPresent}」をそっと差し出した。`;
      setBattleLogs(prev => [
        logMessage,
        `💖 ${battleMonster.name}は目を輝かせて受け取った！すっごく嬉しそうだ！（なかよし度 +${friendshipGained}）`,
        ...prev
      ]);
      setBattleSelectedPresent(""); // clear selection
    } else if (actionType === 'flee') {
      showToast("また遊ぼうね！手をふって静かにその場を離れました。");
      setGameState('TOWN');
      setBattleMonster(null);
      return;
    }

    const nextFriendship = Math.min(battleMonster.maxFriendship, battleFriendship + friendshipGained);
    setBattleFriendship(nextFriendship);

    // Check Victory (Nakayoshi achieved!)
    if (nextFriendship >= battleMonster.maxFriendship) {
      // Check if already friended
      const alreadyFriended = companions.some(c => c.id === battleMonster.id);
      
      setBattleLogs(prev => [
        `✨🎉 【なかよし大成功！】 🎉✨`,
        `👑 ${battleMonster.successMsg}`,
        ...prev
      ]);

      if (!alreadyFriended) {
        setCompanions(prev => [...prev, battleMonster]);
        setTownHappiness(prev => Math.min(100, prev + 10));
      }
      
      showToast(`🎉 ${battleMonster.name}と【なかよし】になりました！`);
      setTimeout(() => {
        setGameState('TOWN');
        setBattleMonster(null);
      }, 3500);
      return;
    }

    // Out of turns
    if (turnsRemaining <= 0) {
      setBattleLogs(prev => [
        `💨 おや、${battleMonster.name}はお腹が空いたのか、トコトコ去っていった…`,
        ...prev
      ]);
      setTimeout(() => {
        setGameState('TOWN');
        setBattleMonster(null);
      }, 3000);
    }
  };

  // --- SHOP TRANSACTION ---
  const handleShopAction = (itemName: string, isSelling: boolean) => {
    const itemInfo = SHOP_ITEMS.find(i => i.name === itemName);
    if (!itemInfo) return;

    if (isSelling) {
      const owned = getItemCount(itemName);
      if (owned <= 0) {
        showToast(`「${itemName}」を持っていません。`);
        return;
      }
      removeItem(itemName, 1);
      // Sell price is 60% of base cost (or at least 10 coins)
      const sellPrice = Math.max(10, Math.floor(itemInfo.cost * 0.6));
      setCoins(prev => prev + sellPrice);
      showToast(`💰 「${itemName}」をお店に譲って、${sellPrice}コインもらいました！`);
    } else {
      // Buying
      if (coins < itemInfo.cost) {
        showToast("お財布のコインが足りないみたい…");
        return;
      }
      setCoins(prev => prev - itemInfo.cost);
      addItem(itemName, 1);
      showToast(`🛒 「${itemName}」を${itemInfo.cost}コインで買いました！`);
    }
  };

  // --- UTILS ---
  const activeQuestsToTurnIn = checkQuests();

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-stone-800 flex flex-col relative select-none pb-12">
      
      {/* Toast Alert Popup */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-amber-500 border-4 border-yellow-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce font-bold">
          <SparklesIcon className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* HEADER BAR (Except Title Screen) */}
      {gameState !== 'TITLE' && gameState !== 'CHAR_CREATE' && (
        <header className="bg-amber-100 border-b-4 border-amber-200 py-3 px-4 shadow-sm sticky top-0 z-40">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            
            {/* Player Info Box */}
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full border-4 border-stone-700 flex items-center justify-center text-2xl relative shadow-md"
                style={{ backgroundColor: themeColor }}
              >
                {charGender === 'girl' ? '👧' : charGender === 'boy' ? '👦' : '🐣'}
              </div>
              <div>
                <div className="font-bold text-lg flex items-center gap-2">
                  <span>{charName}</span>
                  <span className="text-xs bg-amber-200 px-2 py-0.5 rounded-full text-amber-800 font-normal">
                    {day}日目・朝
                  </span>
                </div>
                {/* Energy Bar */}
                <div className="flex items-center gap-1.5 mt-1">
                  <HeartIcon className="w-4 h-4 text-red-500 fill-red-500" fill="red" />
                  <div className="w-32 bg-stone-200 rounded-full h-3 border border-stone-400 overflow-hidden">
                    <div 
                      className="bg-red-500 h-full transition-all duration-300"
                      style={{ width: `${(energy / maxEnergy) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-stone-600">{energy}/{maxEnergy}</span>
                </div>
              </div>
            </div>

            {/* Town Status Box */}
            <div className="flex items-center gap-4 text-sm md:text-base">
              {/* Coins */}
              <div className="flex items-center gap-1 bg-yellow-100 border-2 border-yellow-400 px-3 py-1 rounded-full font-bold text-yellow-800 shadow-sm">
                <CoinsIcon className="w-4 h-4" />
                <span>{coins}</span>
              </div>

              {/* Town Happiness */}
              <div className="flex items-center gap-2 bg-emerald-100 border-2 border-emerald-400 px-3 py-1 rounded-full font-bold text-emerald-800 shadow-sm">
                <span>🌸 町のハッピー度:</span>
                <span className="text-emerald-950">{townHappiness}%</span>
              </div>
            </div>

          </div>
        </header>
      )}

      {/* ================================================================ */}
      {/* 1. TITLE SCREEN */}
      {/* ================================================================ */}
      {gameState === 'TITLE' && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-lg mx-auto text-center">
          
          {/* Charming Logo & Illustration */}
          <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
            {/* Background glowing stars */}
            <div className="absolute -top-6 -left-6 text-yellow-400 text-3xl animate-pulse">✨</div>
            <div className="absolute -bottom-4 -right-4 text-yellow-400 text-4xl animate-bounce">🌸</div>
            
            <div className="bg-amber-100 border-8 border-yellow-600 rounded-3xl p-6 shadow-2xl relative">
              <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800 tracking-wider font-mono">
                ココロン・タウン
              </h1>
              <p className="text-xs md:text-sm font-semibold text-amber-600 mt-2 tracking-widest uppercase">
                〜 のどかな町のなかよし冒険記 〜
              </p>
            </div>
          </div>

          <div className="bg-white/80 border-4 border-amber-300 rounded-2xl p-6 shadow-md mb-8">
            <p className="text-stone-600 text-sm leading-relaxed">
              ここは、豊かな自然に囲まれた平和でちいさな町。<br />
              住人たちのお願いごとをきいたり、森をのんびりお散歩しながら、
              ふしぎでカワイイいきものたちと「なかよし」になりませんか？
            </p>
            
            {/* Minimal Pixel Style preview */}
            <div className="flex justify-center gap-4 mt-4 bg-orange-100/50 p-3 rounded-lg border border-orange-200">
              <MonsterAvatar type="mochi_slime" className="w-14 h-14" />
              <MonsterAvatar type="leaf_squirrel" className="w-14 h-14" />
              <MonsterAvatar type="cotton_lamb" className="w-14 h-14" />
            </div>
          </div>

          <button
            onClick={() => setGameState('CHAR_CREATE')}
            className="bg-rose-400 hover:bg-rose-500 text-white font-extrabold text-xl px-12 py-4 rounded-full shadow-lg border-b-8 border-rose-600 transform active:translate-y-1 transition-all flex items-center gap-2"
          >
            あたらしくはじめる 💖
          </button>
        </div>
      )}

      {/* ================================================================ */}
      {/* 2. CHARACTER CREATION */}
      {/* ================================================================ */}
      {gameState === 'CHAR_CREATE' && (
        <div className="flex-1 flex flex-col justify-center px-4 py-8 max-w-lg mx-auto w-full">
          <div className="bg-white border-8 border-amber-600 rounded-3xl p-6 shadow-2xl">
            
            <h2 className="text-2xl font-black text-amber-800 text-center mb-6 flex items-center justify-center gap-2">
              <span>🌸</span> あなたのことを教えてね <span>🌸</span>
            </h2>

            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-stone-700 font-extrabold mb-2 text-sm md:text-base">
                お名前 (何て呼ばれたい？)
              </label>
              <input
                type="text"
                value={charName}
                onChange={(e) => setCharName(e.target.value.slice(0, 10))}
                className="w-full bg-orange-50 border-4 border-amber-200 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:border-amber-400 text-stone-800"
                placeholder="ココ"
              />
              <span className="text-xs text-stone-400 mt-1 block">※最大10文字まで</span>
            </div>

            {/* Gender / Style Picker */}
            <div className="mb-6">
              <label className="block text-stone-700 font-extrabold mb-2 text-sm md:text-base">
                あなたのスタイル
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setCharGender('girl')}
                  className={`py-3 rounded-xl border-4 font-bold flex flex-col items-center gap-1 transition-all ${
                    charGender === 'girl' 
                      ? 'bg-rose-100 border-rose-500 text-rose-800 shadow-md' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  <span className="text-2xl">👧</span>
                  <span className="text-xs">女の子</span>
                </button>
                <button
                  onClick={() => setCharGender('boy')}
                  className={`py-3 rounded-xl border-4 font-bold flex flex-col items-center gap-1 transition-all ${
                    charGender === 'boy' 
                      ? 'bg-blue-100 border-blue-500 text-blue-800 shadow-md' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  <span className="text-2xl">👦</span>
                  <span className="text-xs">男の子</span>
                </button>
                <button
                  onClick={() => setCharGender('neutral')}
                  className={`py-3 rounded-xl border-4 font-bold flex flex-col items-center gap-1 transition-all ${
                    charGender === 'neutral' 
                      ? 'bg-green-100 border-green-500 text-green-800 shadow-md' 
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  <span className="text-2xl">🐣</span>
                  <span className="text-xs">えらばない</span>
                </button>
              </div>
            </div>

            {/* Theme / Ribbon Color */}
            <div className="mb-8">
              <label className="block text-stone-700 font-extrabold mb-2 text-sm md:text-base">
                お気に入りのお洋服カラー
              </label>
              <div className="flex justify-between gap-2">
                {[
                  { value: "#FF94B8", name: "モモ色", bg: "bg-pink-400" },
                  { value: "#4FC3F7", name: "ソラ色", bg: "bg-sky-400" },
                  { value: "#81C784", name: "ワカバ色", bg: "bg-green-400" },
                  { value: "#FFD54F", name: "レモン色", bg: "bg-amber-400" },
                ].map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setThemeColor(color.value)}
                    className={`flex-1 py-2 rounded-lg border-4 flex flex-col items-center gap-1 transition-all ${
                      themeColor === color.value 
                        ? 'border-stone-800 scale-105 shadow-md' 
                        : 'border-transparent opacity-80'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${color.bg} border-2 border-white`} />
                    <span className="text-xs font-bold text-stone-700">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => {
                if(!charName.trim()){
                  showToast("お名前をいれてね！");
                  return;
                }
                setGameState('TOWN');
                showToast(`ようこそ ${charName}さん！のどかな冒険の始まりです！`);
              }}
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-extrabold text-lg py-3 rounded-xl border-b-6 border-emerald-600 transition-all transform active:translate-y-1 flex items-center justify-center gap-2"
            >
              町にくりだそう！ 🗺️
            </button>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 3. MAIN TOWN HUB */}
      {/* ================================================================ */}
      {gameState === 'TOWN' && (
        <div className="max-w-4xl mx-auto w-full px-4 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          
          {/* COLUMN 1: TOWN DIRECTORY & LOCATIONS */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-300 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 text-9xl pointer-events-none translate-x-12 translate-y-2">🏡</div>
              <h2 className="text-xl font-extrabold text-emerald-800 mb-1 flex items-center gap-2">
                🏡 のどかタウン広場
              </h2>
              <p className="text-xs md:text-sm text-stone-600">
                町の広場には、優しい住人たちがあなたとお話ししたがっています。
                カバンのおやつをおすそ分けするのもいいですね。
              </p>
            </div>

            {/* Map Locations & Movement */}
            <div className="bg-white border-4 border-amber-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-base font-extrabold text-stone-700 mb-3 flex items-center gap-1">
                <MapPinIcon className="w-5 h-5 text-amber-500" />
                <span>おでかけエリアを選ぶ</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Location: Sunlit Forest */}
                <button
                  onClick={() => handleStartExplore('forest')}
                  className="bg-emerald-50 hover:bg-emerald-100 border-4 border-emerald-300 rounded-xl p-4 text-left transition-all group flex gap-3 items-start"
                >
                  <div className="bg-emerald-200 text-2xl w-12 h-12 rounded-xl flex items-center justify-center border border-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                    🌲
                  </div>
                  <div>
                    <div className="font-extrabold text-emerald-900 flex items-center gap-1">
                      <span>ひだまりの森</span>
                      <ChevronRightIcon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-stone-500 mt-1">スライムや鳥たちが憩う、木漏れ日のきれいな森です。(消費:⚡15)</p>
                  </div>
                </button>

                {/* Location: Sunny Field */}
                <button
                  onClick={() => handleStartExplore('field')}
                  className="bg-amber-50 hover:bg-amber-100 border-4 border-amber-300 rounded-xl p-4 text-left transition-all group flex gap-3 items-start"
                >
                  <div className="bg-amber-200 text-2xl w-12 h-12 rounded-xl flex items-center justify-center border border-amber-400 group-hover:scale-105 transition-transform shrink-0">
                    🌻
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-900 flex items-center gap-1">
                      <span>おひさま畑</span>
                      <ChevronRightIcon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-stone-500 mt-1">あかいベリーの低木が生い茂る、緑豊かな大農場です。(消費:⚡15)</p>
                  </div>
                </button>

                {/* Location: Shop */}
                <button
                  onClick={() => setGameState('SHOP')}
                  className="bg-amber-100/50 hover:bg-amber-100 border-4 border-yellow-300 rounded-xl p-4 text-left transition-all group flex gap-3 items-start"
                >
                  <div className="bg-yellow-200 text-2xl w-12 h-12 rounded-xl flex items-center justify-center border border-yellow-400 group-hover:scale-105 transition-transform shrink-0">
                    🛍️
                  </div>
                  <div>
                    <div className="font-extrabold text-yellow-900 flex items-center gap-1">
                      <span>ぽかぽか雑貨店</span>
                      <ChevronRightIcon className="w-4 h-4 text-yellow-600" />
                    </div>
                    <p className="text-xs text-stone-500 mt-1">アイテムの売り買いや、なかよし用グッズを購入できます。</p>
                  </div>
                </button>

                {/* Location: Home (Rest) */}
                <button
                  onClick={handleRestHome}
                  className="bg-indigo-50 hover:bg-indigo-100 border-4 border-indigo-200 rounded-xl p-4 text-left transition-all group flex gap-3 items-start"
                >
                  <div className="bg-indigo-150 text-2xl w-12 h-12 rounded-xl flex items-center justify-center border border-indigo-200 group-hover:scale-105 transition-transform shrink-0">
                    🛌
                  </div>
                  <div>
                    <div className="font-extrabold text-indigo-900 flex items-center gap-1">
                      <span>マイホーム (おやすみ)</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">1日が経過し、エネルギーを最大まで回復します。</p>
                  </div>
                </button>

              </div>
            </div>

            {/* Meet Townsfolk Section */}
            <div className="bg-white border-4 border-amber-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-base font-extrabold text-stone-700 mb-4 flex items-center gap-1">
                <MessageCircleIcon className="w-5 h-5 text-amber-500" />
                <span>町の住人と話す</span>
              </h3>
              
              <div className="flex flex-col gap-4">
                {(Object.keys(NPCS) as NPCId[]).map((npcId) => {
                  const npc = NPCS[npcId];
                  const hasTalkedToday = talkedNpcs.includes(npcId);
                  
                  return (
                    <div 
                      key={npcId} 
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-xl border-2 transition-all ${
                        hasTalkedToday ? 'bg-stone-50 border-stone-200' : 'bg-orange-50/40 border-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <NpcAvatar npcId={npcId} />
                        <div>
                          <div className="font-bold text-stone-800">{npc.name}</div>
                          <p className="text-xs text-stone-500 line-clamp-1">{npc.greeting}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 sm:mt-0 w-full sm:w-auto justify-end">
                        {hasTalkedToday && (
                          <span className="text-xs bg-stone-200 text-stone-600 px-2 py-1 rounded-full font-bold">
                            今日はお話済み
                          </span>
                        )}
                        <button
                          onClick={() => handleTalkToNpc(npcId)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-all ${
                            hasTalkedToday 
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-800' 
                              : 'bg-amber-400 hover:bg-amber-500 text-white'
                          }`}
                        >
                          お話しする
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* COLUMN 2: SIDEBAR STATUS & ALUMNI & ACTIVE QUESTS */}
          <div className="flex flex-col gap-6">
            
            {/* ACTIVE QUESTS CORNER */}
            <div className="bg-white border-4 border-rose-300 rounded-2xl p-5 shadow-sm relative">
              <h3 className="text-base font-extrabold text-rose-800 mb-3 flex items-center gap-1.5">
                <BookOpenIcon className="w-5 h-5 text-rose-500" />
                <span>受けているお願いごと</span>
                <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  {activeQuests.length}
                </span>
              </h3>

              {activeQuests.length === 0 ? (
                <div className="text-center py-6 text-stone-400 text-sm">
                  今はお願いごとがありません。<br />住人に話しかけてみてね！
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {activeQuests.map((quest) => {
                    const isCompleted = activeQuestsToTurnIn.some(q => q.id === quest.id);
                    return (
                      <div key={quest.id} className="bg-rose-50/50 border-2 border-rose-100 rounded-xl p-3 text-xs flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-stone-800">{quest.title}</span>
                          {isCompleted ? (
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px] animate-pulse">
                              報告できるよ！
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                              おねがい中
                            </span>
                          )}
                        </div>
                        <p className="text-stone-500 leading-relaxed">{quest.description}</p>
                        
                        {/* Task progress details */}
                        <div className="bg-white border border-rose-100 p-2 rounded-lg mt-1 font-semibold text-stone-600">
                          {quest.reqType === "COLLECT_ITEM" && quest.reqItem && (
                            <div>
                              必要: {quest.reqItem} ({getItemCount(quest.reqItem)} / {quest.reqCount})
                            </div>
                          )}
                          {quest.reqType === "TALK_ALL" && (
                            <div>
                              話しかけた住人 ({talkedNpcs.length} / {quest.reqTarget})
                            </div>
                          )}
                          {quest.reqType === "FRIEND_MONSTER" && quest.reqTarget && (
                            <div>
                              なかよしになる: {MONSTERS.find(m => m.id === quest.reqTarget)?.name || quest.reqTarget} (
                              {companions.some(c => c.id === quest.reqTarget) ? "達成！" : "まだ出会ってない"} )
                            </div>
                          )}
                        </div>

                        {/* Turn-in action button */}
                        {isCompleted && (
                          <button
                            onClick={() => handleTurnInQuest(quest.id)}
                            className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 rounded-lg text-[11px] transition-all"
                          >
                            ありがとうを伝える (報告する) 🌟
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* MY BAG (Inventory) */}
            <div className="bg-white border-4 border-amber-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-base font-extrabold text-stone-700 mb-3 flex items-center gap-1.5">
                <ShoppingBagIcon className="w-5 h-5 text-amber-500" />
                <span>おでかけカバン</span>
              </h3>
              
              {inventory.length === 0 ? (
                <div className="text-center py-6 text-stone-400 text-xs">
                  カバンはからっぽです。<br />森や畑でアイテムをひろおう！
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {inventory.map((item) => (
                    <div key={item.name} className="bg-orange-50/50 border border-amber-100 p-2 rounded-xl flex flex-col justify-between">
                      <div className="text-xs font-bold text-stone-800">{item.name}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded text-amber-800">持っている</span>
                        <span className="text-xs font-black text-stone-700">×{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TOWN SANCTUARY (Companions / Friended Monsters) */}
            <div className="bg-white border-4 border-green-300 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-extrabold text-green-800 flex items-center gap-1.5">
                  <HeartIcon className="w-5 h-5 text-red-400 fill-red-400 animate-pulse" fill="#F87171" />
                  <span>なかよしの仲間たち</span>
                </h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-extrabold">
                  {companions.length}人
                </span>
              </div>

              {companions.length === 0 ? (
                <div className="text-center py-6 text-stone-400 text-xs">
                  まだなかよしのモンスターはいません。<br />冒険へ出て優しく声をかけてみよう！
                </div>
              ) : (
                <div>
                  <p className="text-xs text-stone-500 mb-3">みんなあなたのことが大好きで、町でのんびり暮らしています。</p>
                  <div className="grid grid-cols-2 gap-2">
                    {companions.map((comp) => (
                      <div 
                        key={comp.id} 
                        className="bg-green-50/50 border border-green-100 rounded-xl p-2 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => {
                          showToast(`${comp.name}：「なでなでして〜！」嬉しそうにしているよ！`);
                        }}
                      >
                        <MonsterAvatar type={comp.id} className="w-12 h-12" />
                        <span className="text-[11px] font-bold text-stone-700 mt-1">{comp.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ================================================================ */}
      {/* 4. EXPLORATION IN PROGRESS SCREEN */}
      {/* ================================================================ */}
      {gameState === 'EXPLORE' && (
        <div className="max-w-xl mx-auto w-full px-4 mt-8 flex-1">
          <div className="bg-white border-8 border-emerald-600 rounded-3xl p-6 shadow-2xl relative">
            
            {/* Header Area info */}
            <div className="text-center mb-6">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                探索中 🌲 {currentArea === 'forest' ? 'ひだまりの森' : 'おひさま畑'}
              </span>
              <h2 className="text-2xl font-black text-stone-800 mt-2">のんびり、何が見つかるかな？</h2>
            </div>

            {/* Log display */}
            <div className="bg-orange-50 border-4 border-amber-200 rounded-2xl p-4 h-64 overflow-y-auto mb-6 flex flex-col-reverse gap-2 font-medium">
              {areaLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl text-sm transition-all animate-fade-in ${
                    idx === 0 
                      ? 'bg-amber-100 border border-amber-300 text-amber-900 font-bold scale-[1.02]' 
                      : 'bg-white/60 text-stone-500'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Footer buttons */}
            <div className="flex flex-col gap-3">
              {/* Take a Step Button */}
              <button
                onClick={handleExploreStep}
                disabled={energy < 10}
                className="w-full bg-emerald-400 hover:bg-emerald-500 disabled:bg-stone-300 disabled:border-stone-400 text-white font-extrabold text-lg py-3 rounded-xl border-b-6 border-emerald-600 transition-all transform active:translate-y-1 flex items-center justify-center gap-2 shadow-md"
              >
                <span>さらに歩いてみる 🚶‍♀️</span>
                <span className="text-xs bg-emerald-600 px-2 py-0.5 rounded-full font-normal">
                  (消費: ⚡10)
                </span>
              </button>

              {/* Head Back Button */}
              <button
                onClick={() => setGameState('TOWN')}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 rounded-xl border-2 border-stone-300 transition-all text-center"
              >
                町に戻る
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 5. NAKAYOSHI BATTLE (TURN-BASED FRIENDSHIP) */}
      {/* ================================================================ */}
      {gameState === 'BATTLE' && battleMonster && (
        <div className="max-w-2xl mx-auto w-full px-4 mt-8 flex-1">
          <div className="bg-white border-8 border-rose-400 rounded-3xl p-6 shadow-2xl">
            
            {/* Battle Header */}
            <div className="flex justify-between items-center border-b-2 border-stone-100 pb-3 mb-6">
              <span className="font-extrabold text-stone-600 text-sm flex items-center gap-1">
                <SparklesIcon className="w-4 h-4 text-rose-400" />
                <span>なかよしタイム！</span>
              </span>
              <span className="bg-rose-100 text-rose-800 text-xs font-black px-3 py-1 rounded-full">
                お話しできるチャンス: あと {battleTurnsLeft} 回
              </span>
            </div>

            {/* Opponent Area */}
            <div className="flex flex-col items-center justify-center bg-orange-50/50 border-4 border-amber-100 rounded-3xl py-6 px-4 mb-6 relative">
              <div className="absolute top-2 right-4 text-xs font-bold text-stone-500">野生のともだち</div>
              
              {/* Monster Avatar */}
              <div className="animate-bounce">
                <MonsterAvatar type={battleMonster.id} className="w-32 h-32" />
              </div>
              
              <h3 className="text-xl font-extrabold text-stone-800 mt-2">{battleMonster.name}</h3>

              {/* Friendship meter */}
              <div className="w-full max-w-sm mt-4">
                <div className="flex justify-between text-xs font-bold text-stone-600 mb-1">
                  <span>こころのバリアをほぐした度</span>
                  <span>{battleFriendship} / {battleMonster.maxFriendship}</span>
                </div>
                <div className="w-full bg-stone-200 h-4 rounded-full border border-stone-400 overflow-hidden relative shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-rose-500 h-full transition-all duration-500 flex items-center justify-end"
                    style={{ width: `${(battleFriendship / battleMonster.maxFriendship) * 100}%` }}
                  >
                    <span className="text-[10px] text-white font-extrabold pr-2">❤️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logs from battle */}
            <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-3 h-36 overflow-y-auto mb-6 flex flex-col-reverse gap-1.5 text-xs font-semibold">
              {battleLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded-lg ${
                    idx === 0 
                      ? 'bg-rose-50 border border-rose-200 text-rose-900 font-bold' 
                      : 'text-stone-500'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Present selector drawer (only if there are presents) */}
            <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-2xl mb-6">
              <label className="block text-xs font-bold text-stone-600 mb-2">🎁 プレゼントを選んで渡す</label>
              <div className="flex flex-wrap gap-2">
                {inventory.length === 0 ? (
                  <span className="text-xs text-stone-400 italic">カバンにプレゼントできるおやつがありません。</span>
                ) : (
                  inventory.map((item) => {
                    const isSelected = battleSelectedPresent === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setBattleSelectedPresent(item.name)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                          isSelected 
                            ? 'bg-amber-400 border-amber-600 text-white' 
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {item.name} (x{item.count})
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Battle commands */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleBattleAction('talk')}
                className="bg-rose-100 hover:bg-rose-200 text-rose-800 font-extrabold py-3.5 rounded-2xl border-2 border-rose-300 text-sm flex flex-col items-center gap-1 shadow-sm"
              >
                <span className="text-xl">💬</span>
                <span>優しく話しかける</span>
              </button>

              <button
                onClick={() => handleBattleAction('wave')}
                className="bg-sky-100 hover:bg-sky-200 text-sky-800 font-extrabold py-3.5 rounded-2xl border-2 border-sky-300 text-sm flex flex-col items-center gap-1 shadow-sm"
              >
                <span className="text-xl">🤸‍♀️</span>
                <span>おどけてみせる</span>
              </button>

              <button
                onClick={() => handleBattleAction('present')}
                disabled={!battleSelectedPresent}
                className="bg-amber-400 hover:bg-amber-500 disabled:bg-stone-100 disabled:border-stone-200 disabled:text-stone-400 text-white font-extrabold py-3.5 rounded-2xl border-b-6 border-amber-600 text-sm flex flex-col items-center gap-1 shadow-sm"
              >
                <span className="text-xl">🎁</span>
                <span>プレゼントをあげる</span>
              </button>

              <button
                onClick={() => handleBattleAction('flee')}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-extrabold py-3.5 rounded-2xl border-2 border-stone-300 text-sm flex flex-col items-center gap-1 shadow-sm"
              >
                <span className="text-xl">🏃‍♂️</span>
                <span>そっと立ち去る</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 6. POKAPOKA GENERAL SHOP */}
      {/* ================================================================ */}
      {gameState === 'SHOP' && (
        <div className="max-w-2xl mx-auto w-full px-4 mt-8 flex-1">
          <div className="bg-white border-8 border-yellow-500 rounded-3xl p-6 shadow-2xl">
            
            {/* Shop Header */}
            <div className="text-center mb-6">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-black px-4 py-1.5 rounded-full">
                おかいもの・おひきとり
              </span>
              <h2 className="text-2xl font-black text-stone-800 mt-2">🛍️ ぽかぽか雑貨店</h2>
              <p className="text-xs text-stone-500 mt-1">「いらっしゃい！今日もかわいいものをたくさん仕入れてるよ〜！」</p>
            </div>

            {/* Inventory / Coins balance */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3 flex justify-between items-center mb-6">
              <span className="text-sm font-bold text-yellow-800">持っているおサイフ残高:</span>
              <div className="flex items-center gap-1 font-black text-yellow-900 bg-white px-3 py-1 rounded-full border border-yellow-300">
                <CoinsIcon className="text-yellow-600 w-4 h-4" />
                <span>{coins} コイン</span>
              </div>
            </div>

            {/* Shop Shelves */}
            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto mb-6 pr-2">
              {SHOP_ITEMS.map((item) => {
                const countOwned = getItemCount(item.name);
                return (
                  <div key={item.name} className="border-2 border-orange-100 rounded-2xl p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-orange-50/20 hover:bg-orange-50/40 transition-colors">
                    <div>
                      <div className="font-extrabold text-stone-800 flex items-center gap-2">
                        <span>{item.name}</span>
                        {countOwned > 0 && (
                          <span className="bg-stone-100 text-stone-600 font-bold text-[10px] px-2 py-0.5 rounded-full">
                            カバンの中に {countOwned}個
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{item.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                      {/* BUY button */}
                      <button
                        onClick={() => handleShopAction(item.name, false)}
                        className="bg-amber-400 hover:bg-amber-500 text-white font-extrabold text-xs px-3 py-2 rounded-lg border-b-4 border-amber-600 transition-all flex items-center gap-1"
                      >
                        <span>買う</span>
                        <span className="bg-amber-600 text-amber-100 px-1 py-0.5 rounded text-[9px]">
                          {item.cost}c
                        </span>
                      </button>

                      {/* SELL button */}
                      <button
                        onClick={() => handleShopAction(item.name, true)}
                        disabled={countOwned <= 0}
                        className="bg-stone-100 hover:bg-stone-200 disabled:opacity-50 text-stone-600 font-extrabold text-xs px-3 py-2 rounded-lg border-2 border-stone-200 transition-all"
                      >
                        <span>売る</span>
                        <span className="text-[9px] text-stone-400 ml-1">
                          ({Math.max(10, Math.floor(item.cost * 0.6))}c)
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Go back */}
            <button
              onClick={() => setGameState('TOWN')}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 rounded-xl border-2 border-stone-300 transition-all text-center"
            >
              広場に戻る
            </button>

          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 7. INTERACTIVE NPC CONVERSATION DIALOGUE */}
      {/* ================================================================ */}
      {selectedNpcId && NPCS[selectedNpcId] && (
        <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-8 border-amber-600 rounded-3xl p-6 shadow-2xl max-w-lg w-full">
            
            {/* NPC Header */}
            <div className="flex items-center gap-4 mb-4">
              <NpcAvatar npcId={selectedNpcId} />
              <div>
                <h3 className="text-xl font-extrabold text-stone-800">{NPCS[selectedNpcId].name}</h3>
                <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">
                  のどかタウンの住人
                </span>
              </div>
            </div>

            {/* Dialog Text */}
            <div className="bg-orange-50 border-4 border-amber-200 rounded-2xl p-4 min-h-24 mb-6">
              <p className="text-sm md:text-base text-stone-700 leading-relaxed font-semibold">
                「{NPCS[selectedNpcId].greeting}」
              </p>
            </div>

            {/* Quests available from this NPC */}
            <div className="mb-6">
              <h4 className="text-xs font-black text-stone-500 uppercase tracking-widest mb-2">
                現在受託できるお願いごと:
              </h4>
              <div className="flex flex-col gap-2">
                {NPCS[selectedNpcId].quests.map((quest) => {
                  const isActive = activeQuests.some(q => q.id === quest.id);
                  const isCompleted = completedQuestIds.includes(quest.id);

                  return (
                    <div 
                      key={quest.id} 
                      className={`p-3 rounded-xl border-2 text-xs flex justify-between items-center ${
                        isCompleted 
                          ? 'bg-stone-100 border-stone-200 opacity-60' 
                          : isActive 
                            ? 'bg-amber-50 border-amber-300' 
                            : 'bg-emerald-50 border-emerald-300'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-stone-800">{quest.title}</div>
                        <p className="text-stone-500 mt-1">{quest.description}</p>
                      </div>

                      <div className="shrink-0 ml-3">
                        {isCompleted ? (
                          <span className="bg-stone-200 text-stone-600 font-bold px-2 py-1 rounded text-[10px]">
                            達成済み
                          </span>
                        ) : isActive ? (
                          <span className="bg-amber-200 text-amber-800 font-bold px-2 py-1 rounded text-[10px]">
                            お願いされ中
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveQuests(prev => [...prev, quest]);
                              showToast(`📝 クエスト「${quest.title}」を新しく引き受けました！`);
                            }}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px]"
                          >
                            引き受ける 🌸
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedNpcId(null)}
                className="bg-stone-800 hover:bg-stone-900 text-white font-bold px-6 py-2 rounded-xl text-sm"
              >
                会話を終える
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}