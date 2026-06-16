import { useState, useEffect, useRef } from "react";

const MONSTERS = [
  { name: "プニちゃん", emoji: "🟣", hp: 18, atk: 4, exp: 8, gold: 5, color: "#d8b4fe" },
  { name: "キノピィ", emoji: "🍄", hp: 24, atk: 6, exp: 12, gold: 8, color: "#86efac" },
  { name: "フワリ", emoji: "☁️", hp: 30, atk: 8, exp: 18, gold: 12, color: "#bae6fd" },
  { name: "ほのおネコ", emoji: "🐱", hp: 38, atk: 10, exp: 25, gold: 15, color: "#fca5a5" },
  { name: "みずクラゲ", emoji: "🪼", hp: 45, atk: 12, exp: 32, gold: 20, color: "#a5f3fc" },
  { name: "まおうのたまご", emoji: "🥚", hp: 60, atk: 16, exp: 50, gold: 40, color: "#e9d5ff" },
];

const SKILLS = [
  { name: "つうじょうこうげき", cost: 0, power: 1.0, desc: "ふつうのこうげき" },
  { name: "はなふぶき", cost: 5, power: 1.5, desc: "はなびらをあびせる！" },
  { name: "ほしのきらめき", cost: 10, power: 2.2, desc: "ほしのちからでこうげき！" },
  { name: "にじのあらし", cost: 20, power: 3.5, desc: "七色のあらしをおこす！！" },
];

const AREAS = ["🌸 はるのもり", "🌊 みずうみのほとり", "🏔️ くものうえ", "🌙 よるのまき"];

const SHOP_ITEMS = [
  { name: "ポーション", price: 30, heal: 30, emoji: "🧴" },
  { name: "ハイポーション", price: 80, heal: 80, emoji: "✨" },
  { name: "フルポーション", price: 200, heal: 999, emoji: "💖" },
];

const initPlayer = (name) => ({
  name,
  hp: 60, maxHp: 60,
  mp: 30, maxMp: 30,
  atk: 12,
  level: 1,
  exp: 0,
  expNext: 20,
  gold: 50,
  items: [{ name: "ポーション", heal: 30, emoji: "🧴", qty: 2 }],
  area: 0,
  kills: 0,
});

const SCENES = {
  TITLE: "TITLE", NAME: "NAME", TOWN: "TOWN",
  EXPLORE: "EXPLORE", BATTLE: "BATTLE", SHOP: "SHOP", RESULT: "RESULT",
};

export default function App() {
  const [scene, setScene] = useState(SCENES.TITLE);
  const [player, setPlayer] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [monster, setMonster] = useState(null);
  const [mHp, setMHp] = useState(0);
  const [log, setLog] = useState([]);
  const [turn, setTurn] = useState("player");
  const [battleOver, setBattleOver] = useState(null);
  const [shopMsg, setShopMsg] = useState("");
  const [animShake, setAnimShake] = useState(false);
  const [animHero, setAnimHero] = useState(false);
  const [levelUp, setLevelUp] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const addLog = (msg) => setLog(prev => [...prev, msg]);

  const startBattle = () => {
    const pool = MONSTERS.slice(0, Math.min(player.area * 2 + 2, MONSTERS.length));
    const m = { ...pool[Math.floor(Math.random() * pool.length)] };
    setMonster(m);
    setMHp(m.hp);
    setLog([`⚔️ ${m.name} があらわれた！`]);
    setTurn("player");
    setBattleOver(null);
    setScene(SCENES.BATTLE);
  };

  const doPlayerSkill = (skill) => {
    if (turn !== "player" || battleOver) return;
    if (player.mp < skill.cost) { addLog("MPがたりない！"); return; }
    const dmg = Math.round(player.atk * skill.power * (0.85 + Math.random() * 0.3));
    const newMHp = Math.max(0, mHp - dmg);
    setMHp(newMHp);
    setAnimShake(true); setTimeout(() => setAnimShake(false), 400);
    setPlayer(p => ({ ...p, mp: p.mp - skill.cost }));
    addLog(`✨ ${skill.name}！ → ${monster.name}に ${dmg} のダメージ！`);
    if (newMHp <= 0) { endBattle("win"); return; }
    setTurn("enemy");
    setTimeout(() => enemyTurn(newMHp), 900);
  };

  const enemyTurn = (curMHp) => {
    if (curMHp <= 0) return;
    const dmg = Math.max(1, Math.round(monster.atk * (0.8 + Math.random() * 0.4)));
    setPlayer(p => {
      const newHp = Math.max(0, p.hp - dmg);
      addLog(`💥 ${monster.name}のこうげき！ → ${p.name}に ${dmg} のダメージ！`);
      if (newHp <= 0) { setTimeout(() => endBattle("lose"), 300); }
      return { ...p, hp: newHp };
    });
    setAnimHero(true); setTimeout(() => setAnimHero(false), 400);
    setTurn("player");
  };

  const endBattle = (result) => {
    setBattleOver(result);
    if (result === "win") {
      const expGain = monster.exp;
      const goldGain = monster.gold;
      addLog(`🌟 ${monster.name}をたおした！EXP+${expGain} G+${goldGain}`);
      setPlayer(p => {
        let newExp = p.exp + expGain;
        let newGold = p.gold + goldGain;
        let newLv = p.level, newMaxHp = p.maxHp, newMaxMp = p.maxMp, newAtk = p.atk;
        let newExpNext = p.expNext, lvUp = false;
        while (newExp >= newExpNext) {
          newExp -= newExpNext;
          newLv++;
          newMaxHp += 10; newMaxMp += 5; newAtk += 2;
          newExpNext = Math.round(newExpNext * 1.5);
          lvUp = true;
        }
        if (lvUp) { setTimeout(() => setLevelUp(true), 400); }
        return { ...p, exp: newExp, gold: newGold, level: newLv, expNext: newExpNext, maxHp: newMaxHp, maxMp: newMaxMp, atk: newAtk, hp: lvUp ? newMaxHp : p.hp, mp: lvUp ? newMaxMp : p.mp, kills: p.kills + 1, area: Math.min(3, Math.floor((p.kills + 1) / 5)) };
      });
    } else {
      addLog("💀 たおされてしまった…");
    }
  };

  const useItem = (idx) => {
    if (turn !== "player" || battleOver) return;
    const item = player.items[idx];
    if (!item || item.qty <= 0) return;
    const healed = Math.min(item.heal, player.maxHp - player.hp);
    setPlayer(p => {
      const newItems = p.items.map((it, i) => i === idx ? { ...it, qty: it.qty - 1 } : it).filter(it => it.qty > 0);
      return { ...p, hp: Math.min(p.maxHp, p.hp + item.heal), items: newItems };
    });
    addLog(`🧴 ${item.name}をつかった！HP+${healed}`);
    setTurn("enemy");
    setTimeout(() => enemyTurn(mHp), 900);
  };

  const buyItem = (item) => {
    if (player.gold < item.price) { setShopMsg("ゴールドがたりない！"); return; }
    setPlayer(p => {
      const existing = p.items.findIndex(i => i.name === item.name);
      let newItems = [...p.items];
      if (existing >= 0) newItems[existing] = { ...newItems[existing], qty: newItems[existing].qty + 1 };
      else newItems.push({ ...item, qty: 1 });
      return { ...p, gold: p.gold - item.price, items: newItems };
    });
    setShopMsg(`${item.emoji} ${item.name}をかった！`);
  };

  const hpPct = player ? player.hp / player.maxHp : 1;
  const mpPct = player ? player.mp / player.maxMp : 1;
  const expPct = player ? player.exp / player.expNext : 0;

  const styles: {
    wrap: React.CSSProperties;
    card: React.CSSProperties;
    btn: (color?: string) => React.CSSProperties;
    barWrap: React.CSSProperties;
    bar: (pct: number, color: string) => React.CSSProperties;
    label: React.CSSProperties;
    title: React.CSSProperties;
    monsterBox: (shake: boolean) => React.CSSProperties;
    heroBox: (shake: boolean) => React.CSSProperties;
    logBox: React.CSSProperties;
  } = {
    wrap: { fontFamily: "'Hiragino Kaku Gothic ProN','Meiryo',sans-serif", minHeight: 520, padding: "0 0 2rem" },
    card: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 16, padding: "1.25rem" },
    btn: (color="7c3aed") => ({ background: color, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: 500, margin: 3 }),
    barWrap: { background: "var(--color-background-secondary)", borderRadius: 8, height: 10, overflow: "hidden", margin: "3px 0" },
    bar: (pct: number, color: string) => ({ width: `${Math.max(0, pct * 100)}%`, height: "100%", background: color, borderRadius: 8, transition: "width 0.4s" }),
    label: { fontSize: 12, color: "var(--color-text-secondary)" },
    title: { fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 6px" },
    monsterBox: (shake: boolean) => ({ fontSize: 72, textAlign: "center" as const, padding: "1.5rem", transition: "transform 0.1s", transform: shake ? "translateX(8px)" : "none" }),
    heroBox: (shake: boolean) => ({ fontSize: 56, textAlign: "center" as const, transition: "transform 0.1s", transform: shake ? "translateX(-8px)" : "none" }),
    logBox: { background: "var(--color-background-secondary)", borderRadius: 10, padding: "10px 14px", height: 120, overflowY: "auto", fontSize: 13, lineHeight: 1.8 },
  };

  if (scene === SCENES.TITLE) return (
    <div style={{ ...styles.wrap, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 480, gap: 20 }}>
      <div style={{ fontSize: 64 }}>🌸</div>
      <h1 style={{ ...styles.title, fontSize: 26, textAlign: "center" }}>はるかぜのぼうけん</h1>
      <p style={{ color: "var(--color-text-secondary)", textAlign: "center", fontSize: 14 }}>のどかな町を舞台にした、かわいい日常RPG</p>
      <button style={styles.btn()} onClick={() => setScene(SCENES.NAME)}>はじめる ✨</button>
    </div>
  );

  if (scene === SCENES.NAME) return (
    <div style={{ ...styles.wrap, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 480, gap: 16 }}>
      <div style={{ fontSize: 48 }}>🐣</div>
      <h2 style={{ ...styles.title, fontSize: 18 }}>なまえをつけてね</h2>
      <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="なまえ" maxLength={8}
        style={{ border: "0.5px solid var(--color-border-secondary)", borderRadius: 10, padding: "8px 14px", fontSize: 16, width: 200, textAlign: "center" }} />
      <button style={styles.btn()} disabled={!nameInput.trim()}
        onClick={() => { setPlayer(initPlayer(nameInput.trim())); setScene(SCENES.TOWN); }}>
        けってい！
      </button>
    </div>
  );

  if (scene === SCENES.TOWN && player) return (
    <div style={styles.wrap}>
      <div style={{ ...styles.card, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ ...styles.title, fontSize: 18 }}>🏡 {player.name}  <span style={{ fontSize: 13, fontWeight: 400, color: "var(--color-text-secondary)" }}>Lv.{player.level}</span></h2>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 6 }}>💰 {player.gold}G　　📍 {AREAS[player.area]}</div>
          </div>
          <div style={{ fontSize: 13, textAlign: "right" }}>
            <div>❤️ {player.hp}/{player.maxHp}</div>
            <div style={styles.barWrap}><div style={styles.bar(hpPct, "#f472b6")} /></div>
            <div>💙 {player.mp}/{player.maxMp}</div>
            <div style={styles.barWrap}><div style={styles.bar(mpPct, "#60a5fa")} /></div>
            <div style={{ ...styles.label, marginTop: 4 }}>EXP {player.exp}/{player.expNext}</div>
            <div style={styles.barWrap}><div style={styles.bar(expPct, "#a78bfa")} /></div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <button style={{ ...styles.card, cursor: "pointer", textAlign: "center", border: "0.5px solid #f9a8d4" }} onClick={startBattle}>
          <div style={{ fontSize: 36 }}>⚔️</div>
          <div style={{ fontWeight: 500 }}>たんけんに出る</div>
          <div style={{ ...styles.label, marginTop: 4 }}>{AREAS[player.area]}</div>
        </button>
        <button style={{ ...styles.card, cursor: "pointer", textAlign: "center", border: "0.5px solid #86efac" }} onClick={() => { setShopMsg(""); setScene(SCENES.SHOP); }}>
          <div style={{ fontSize: 36 }}>🏪</div>
          <div style={{ fontWeight: 500 }}>おみせ</div>
          <div style={styles.label}>アイテムをかう</div>
        </button>
      </div>

      <div style={styles.card}>
        <div style={{ fontWeight: 500, marginBottom: 8 }}>🎒 もちもの</div>
        {player.items.length === 0 ? <div style={styles.label}>なにもない</div> :
          player.items.map((it, i) => (
            <div key={i} style={{ fontSize: 14, padding: "3px 0", color: "var(--color-text-secondary)" }}>
              {it.emoji} {it.name} × {it.qty}
            </div>
          ))}
        <div style={{ marginTop: 10, ...styles.label }}>たおした数：{player.kills}体　⚔️こうげき力：{player.atk}</div>
      </div>

      {levelUp && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99 }}>
          <div style={{ ...styles.card, textAlign: "center", padding: "2rem", maxWidth: 280 }}>
            <div style={{ fontSize: 48 }}>🎉</div>
            <h2 style={{ ...styles.title, fontSize: 22 }}>レベルアップ！</h2>
            <p style={{ color: "var(--color-text-secondary)" }}>Lv.{player.level} になった！<br />HP・MP・ATKがあがった！</p>
            <button style={styles.btn()} onClick={() => setLevelUp(false)}>やったー！</button>
          </div>
        </div>
      )}
    </div>
  );

  if (scene === SCENES.BATTLE && player && monster) return (
    <div style={styles.wrap}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{AREAS[player.area]}</div>
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Lv.{player.level}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div style={{ ...styles.card, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>{monster.name}</div>
          <div style={styles.monsterBox(animShake)}>{monster.emoji}</div>
          <div style={styles.barWrap}><div style={styles.bar(mHp / monster.hp, monster.color)} /></div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>HP {mHp}/{monster.hp}</div>
        </div>
        <div style={{ ...styles.card, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>{player.name}</div>
          <div style={styles.heroBox(animHero)}>🧒</div>
          <div style={styles.barWrap}><div style={styles.bar(player.hp / player.maxHp, "#f472b6")} /></div>
          <div style={{ fontSize: 12 }}>HP {player.hp}/{player.maxHp}</div>
          <div style={styles.barWrap}><div style={styles.bar(player.mp / player.maxMp, "#60a5fa")} /></div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>MP {player.mp}/{player.maxMp}</div>
        </div>
      </div>

      <div ref={logRef} style={{ ...styles.logBox, marginBottom: 12 }}>
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>

      {!battleOver ? (
        <div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 6 }}>⚔️ わざをえらぶ</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {SKILLS.map((sk, i) => (
              <button key={i} disabled={player.mp < sk.cost} style={styles.btn(player.mp < sk.cost ? "#9ca3af" : "#7c3aed")} onClick={() => doPlayerSkill(sk)}>
                {sk.name}<br /><span style={{ fontSize: 11, opacity: 0.85 }}>{sk.cost > 0 ? `MP${sk.cost}` : "コスト0"}</span>
              </button>
            ))}
          </div>
          {player.items.length > 0 && (
            <div>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 6 }}>🎒 アイテム</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {player.items.map((it, i) => (
                  <button key={i} style={styles.btn("#059669")} onClick={() => useItem(i)}>
                    {it.emoji}{it.name} ×{it.qty}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          {battleOver === "win" ? (
            <>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🌟</div>
              <p style={{ fontWeight: 500, marginBottom: 12 }}>しょうり！</p>
              <button style={styles.btn()} onClick={() => { setScene(SCENES.TOWN); setLevelUp(false); }}>まちにもどる</button>
              <button style={{ ...styles.btn("#059669"), marginLeft: 6 }} onClick={startBattle}>つぎへ！</button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 32, marginBottom: 8 }}>💫</div>
              <p style={{ fontWeight: 500, marginBottom: 12 }}>きぜつした…</p>
              <button style={styles.btn()} onClick={() => {
                setPlayer(p => ({ ...p, hp: p.maxHp, mp: p.maxMp }));
                setScene(SCENES.TOWN);
              }}>まちで回復してもどる</button>
            </>
          )}
        </div>
      )}
    </div>
  );

  if (scene === SCENES.SHOP && player) return (
    <div style={styles.wrap}>
      <h2 style={{ ...styles.title, fontSize: 18, marginBottom: 12 }}>🏪 おみせ</h2>
      <div style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 14 }}>💰 もちゴールド：{player.gold}G</div>
      {shopMsg && <div style={{ color: "#7c3aed", marginBottom: 10, fontSize: 14 }}>{shopMsg}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {SHOP_ITEMS.map((item, i) => (
          <div key={i} style={{ ...styles.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28 }}>{item.emoji}</span>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{item.name}</div>
                <div style={styles.label}>HP +{item.heal === 999 ? "ぜんかい" : item.heal}</div>
              </div>
            </div>
            <button style={styles.btn(player.gold >= item.price ? "#7c3aed" : "#9ca3af")}
              disabled={player.gold < item.price}
              onClick={() => buyItem(item)}>{item.price}G</button>
          </div>
        ))}
      </div>
      <button style={{ ...styles.btn("#6b7280") }} onClick={() => setScene(SCENES.TOWN)}>← まちにもどる</button>
    </div>
  );

  return null;
}