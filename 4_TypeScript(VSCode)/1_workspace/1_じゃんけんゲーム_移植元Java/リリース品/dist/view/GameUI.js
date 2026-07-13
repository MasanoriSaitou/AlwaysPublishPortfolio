"use strict";
(() => {
  // src/model/main.ts
  var GameLogic = class {
    constructor(ui) {
      this.ui = ui;
      this.playerHp = 3;
      this.cpuHp = 3;
    }
    play(playerHand) {
      const cpuHand = this.randomHand();
      const result = this.judge(playerHand, cpuHand);
      if (result === "win") {
        this.cpuHp--;
        this.ui.updateCpuHp(this.cpuHp);
        this.ui.showMessage(`\u3042\u306A\u305F\u306E\u52DD\u3061\uFF01 CPU\u306F${cpuHand}`);
      } else if (result === "lose") {
        this.playerHp--;
        this.ui.updatePlayerHp(this.playerHp);
        this.ui.showMessage(`\u3042\u306A\u305F\u306E\u8CA0\u3051\u2026 CPU\u306F${cpuHand}`);
      } else {
        this.ui.showMessage(`\u3042\u3044\u3053\uFF01 CPU\u306F${cpuHand}`);
      }
      if (this.playerHp <= 0 || this.cpuHp <= 0) {
        this.ui.showRetryButton();
      }
    }
    randomHand() {
      const hands = ["\u30B0\u30FC", "\u30C1\u30E7\u30AD", "\u30D1\u30FC"];
      return hands[Math.floor(Math.random() * 3)];
    }
    judge(p, c) {
      if (p === c) return "draw";
      if (p === "\u30B0\u30FC" && c === "\u30C1\u30E7\u30AD" || p === "\u30C1\u30E7\u30AD" && c === "\u30D1\u30FC" || p === "\u30D1\u30FC" && c === "\u30B0\u30FC") return "win";
      return "lose";
    }
    reset() {
      this.playerHp = 3;
      this.cpuHp = 3;
    }
  };

  // src/view/GameUI.ts
  var GameUI = class {
    constructor() {
      console.log("GameUI is constructor called!!");
      this.logic = new GameLogic(this);
      document.querySelectorAll("#buttons button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const hand = btn.getAttribute("data-hand");
          this.logic.play(hand);
        });
      });
      document.getElementById("retry").addEventListener("click", () => {
        this.resetGame();
      });
      this.resetGame();
    }
    updatePlayerHp(hp) {
      document.getElementById("player-hp").textContent = "\u{1F49B}".repeat(hp);
    }
    updateCpuHp(hp) {
      document.getElementById("cpu-hp").textContent = "\u{1F49C}".repeat(hp);
    }
    showMessage(msg) {
      document.getElementById("message").textContent = msg;
    }
    showRetryButton() {
      document.getElementById("buttons").style.display = "none";
      document.getElementById("retry").style.display = "block";
    }
    resetGame() {
      this.logic.reset();
      this.updatePlayerHp(3);
      this.updateCpuHp(3);
      this.showMessage("\u3058\u3083\u3093\u3051\u3093\u3057\u3088\u3046\u3001\u3058\u3083\u3093\u3051\u30FC\u3093...");
      document.getElementById("buttons").style.display = "block";
      document.getElementById("retry").style.display = "none";
    }
  };
  new GameUI();
})();
