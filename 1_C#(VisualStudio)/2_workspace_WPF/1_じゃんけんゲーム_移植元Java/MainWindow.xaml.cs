using System.Windows;
using System.Windows.Input;
using じゃんけんゲーム_移植元Java.View;

namespace じゃんけんゲーム_移植元Java {

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window {

        public MainWindow() {

            InitializeComponent();

            // GameUI の初期化（JavaFX の new GameUI().getRoot() 相当）
            Content = new GameUI();

            // ESC キーで終了
            this.KeyDown += (s, e) => {
                if (e.Key == Key.Escape) {
                    this.Close();
                }
            };

            this.Title = "RockPaperScissorsGame";
        }
    }
}