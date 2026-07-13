import { GameUI } from "../view/GameUI"

export class GameLogic {

  private playerHp : number = 3;
  private cpuHp : number = 3;

  public constructor(
    private ui: GameUI
  ) {}

  public play(playerHand: string) {
    const cpuHand = this.randomHand();
    const result = this.judge(playerHand, cpuHand);

    if (result === "win") {
      this.cpuHp--;
      this.ui.updateCpuHp(this.cpuHp);
      this.ui.showMessage(`あなたの勝ち！ CPUは${cpuHand}`);
    } else if (result === "lose") {
      this.playerHp--;
      this.ui.updatePlayerHp(this.playerHp);
      this.ui.showMessage(`あなたの負け… CPUは${cpuHand}`);
    } else {
      this.ui.showMessage(`あいこ！ CPUは${cpuHand}`);
    }

    if (this.playerHp <= 0 || this.cpuHp <= 0) {
      this.ui.showRetryButton();
    }
  }

  private randomHand(): string {
    const hands = ["グー", "チョキ", "パー"];
    return hands[Math.floor(Math.random() * 3)]!;
  }

  private judge(p: string, c: string): "win" | "lose" | "draw" {
    if (p === c) return "draw";
    if (
      (p === "グー" && c === "チョキ") ||
      (p === "チョキ" && c === "パー") ||
      (p === "パー" && c === "グー")
    ) return "win";
    return "lose";
  }

  public reset() {
    this.playerHp = 3;
    this.cpuHp = 3;
  }
}