using System.Windows;
using System.Windows.Controls;
using System.Windows.Media.Animation;
using じゃんけんゲーム_移植元Java.Model;

namespace じゃんけんゲーム_移植元Java.View {

    /// <summary>
    /// GameUI.xaml の相互作用ロジック
    /// </summary>
    public partial class GameUI : UserControl {

        private readonly GameLogic logic;

        public GameUI() {

            InitializeComponent();

            logic = new GameLogic(this);
            ResetGame();

            // プレイヤーは赤ハート
            PlayerHpView.SetHeartObj("❤");

            // CPU は紫ハート
            CpuHpView.SetHeartObj("❤");
        }

        // --- UI 更新メソッド（JavaFX と同じ） ---
        public void UpdateCpuHP(int hp) {

            CpuHpView.UpdateHp(hp);
        }

        public void UpdatePlayerHP(int hp) {

            PlayerHpView.UpdateHp(hp);
        }

        public void ShowMessage(string msg) {

            MessageView.SetText(msg);
        }

        public void PlayerDamageEffect() {

            DamageOverlay.Visibility = Visibility.Visible;

            var anim = new DoubleAnimation {
                From = 1.0,
                To = 0.0,
                Duration = TimeSpan.FromMilliseconds(120),
                AutoReverse = true,
                RepeatBehavior = new RepeatBehavior(2)
            };

            anim.Completed += (s, e) => {
                DamageOverlay.Visibility = Visibility.Collapsed;
            };

            DamageOverlay.BeginAnimation(OpacityProperty, anim);
        }

        public void ShowRetryButton() {

            JankenButtons.Visibility = Visibility.Collapsed;
            RetryButton.Visibility = Visibility.Visible;
        }

        private void ResetGame() {

            logic.Reset();

            PlayerHpView.UpdateHp(3);
            CpuHpView.UpdateHp(3);

            MessageView.SetText("じゃんけんしよう、じゃんけーん...");

            RetryButton.Visibility = Visibility.Collapsed;
            JankenButtons.Visibility = Visibility.Visible;
        }

        // --- ボタンイベント ---
        private void OnClickRock(object sender, RoutedEventArgs e) {

            logic.Play("グー");
        }

        private void OnClickScissors(object sender, RoutedEventArgs e) {

            logic.Play("チョキ");
        }

        private void OnClickPaper(object sender, RoutedEventArgs e) {

            logic.Play("パー");
        }

        private void OnClickRetry(object sender, RoutedEventArgs e) {

            ResetGame();
        }
    }
}