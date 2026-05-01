using じゃんけんゲーム_移植元Java.View;

namespace じゃんけんゲーム_移植元Java.Model {
    class GameLogic {

        private int playerHP;
        private int cpuHP;

        private readonly GameUI ui;
        private readonly Random rand;

        public GameLogic(GameUI ui) {

            this.ui = ui;
            rand = new Random();
            Reset();
        }

        // --- ゲームスタート ---
        public void Play(string playerHand) {

            string[] hands = { "グー", "チョキ", "パー" };
            string cpuHand = hands[rand.Next(3)];

            string handBoth = $"[ あなた: {playerHand}　CPU: {cpuHand} ]  ";

            int result = Judge(playerHand, cpuHand);

            if (result == 1) {

                cpuHP--;
                ui.UpdateCpuHP(cpuHP);
                ui.ShowMessage(handBoth + "あなたの勝ち！ CPUのHPが減った");
            } else if (result == -1) {

                playerHP--;
                ui.UpdatePlayerHP(playerHP);
                ui.ShowMessage(handBoth + "あなたの負け… HPが減った");
                ui.PlayerDamageEffect();
            } else {

                ui.ShowMessage(handBoth + "あいこ！");
            }

            CheckGameEnd(handBoth);
        }

        private int Judge(string p, string c) {

            if (p == c)
                return 0;

            if ((p == "グー" && c == "チョキ") ||
                (p == "チョキ" && c == "パー") ||
                (p == "パー" && c == "グー")) {
                return 1;
            }
            return -1;
        }

        private void CheckGameEnd(string handBoth) {

            if (playerHP <= 0) {
                ui.ShowMessage(handBoth + "あなたの負け…");
                ui.ShowRetryButton();
            }

            if (cpuHP <= 0) {
                ui.ShowMessage(handBoth + "あなたの勝ち！");
                ui.ShowRetryButton();
            }
        }

        public void Reset() {

            playerHP = 3;
            cpuHP = 3;
        }
    }
}