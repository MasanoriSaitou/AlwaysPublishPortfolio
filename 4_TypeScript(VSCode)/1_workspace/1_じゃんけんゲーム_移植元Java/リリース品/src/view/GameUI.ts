import { GameLogic } from "../model/main"

export class GameUI {
  
  private logic: GameLogic;

  public constructor() {
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

  public updatePlayerHp(hp: number) {
    document.getElementById("player-hp")!.textContent = "💛".repeat(hp);
  }

  public updateCpuHp(hp: number) {
    document.getElementById("cpu-hp")!.textContent = "💜".repeat(hp);
  }

  public showMessage(msg: string) {
    document.getElementById("message")!.textContent = msg;
  }

  public showRetryButton() {
    (document.getElementById("buttons") as HTMLElement).style.display = "none";
    (document.getElementById("retry") as HTMLElement).style.display = "block";
  }

  public resetGame() {
    this.logic.reset();

    this.updatePlayerHp(3);
    this.updateCpuHp(3);

    this.showMessage("じゃんけんしよう、じゃんけーん...");

    (document.getElementById("buttons") as HTMLElement).style.display = "block";
    (document.getElementById("retry") as HTMLElement).style.display = "none";
  }
}

new GameUI();