import { GameLogic } from "../model/main"

export class GameUI {
  logic: GameLogic;

  constructor() {
    console.log("GameUI is constructor called!!");

    this.logic = new GameLogic(this);

    document.querySelectorAll("#buttons button").forEach(btn => {
      btn.addEventListener("click", () => {
        const hand = btn.getAttribute("data-hand")!;
        this.logic.play(hand);
      });
    });

    document.getElementById("retry")!.addEventListener("click", () => {
      this.resetGame();
    });

    this.resetGame();
  }

  updatePlayerHp(hp: number) {
    document.getElementById("player-hp")!.textContent = "💛".repeat(hp);
  }

  updateCpuHp(hp: number) {
    document.getElementById("cpu-hp")!.textContent = "💜".repeat(hp);
  }

  showMessage(msg: string) {
    document.getElementById("message")!.textContent = msg;
  }

  showRetryButton() {
    (document.getElementById("buttons") as HTMLElement).style.display = "none";
    (document.getElementById("retry") as HTMLElement).style.display = "block";
  }

  resetGame() {
    this.logic.reset();

    this.updatePlayerHp(3);
    this.updateCpuHp(3);

    this.showMessage("じゃんけんしよう、じゃんけーん...");

    (document.getElementById("buttons") as HTMLElement).style.display = "block";
    (document.getElementById("retry") as HTMLElement).style.display = "none";
  }
}

new GameUI();