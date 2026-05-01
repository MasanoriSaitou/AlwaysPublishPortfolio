using System.Windows.Controls;

namespace じゃんけんゲーム_移植元Java.View {

    /// <summary>
    /// MessageView.xaml の相互作用ロジック
    /// </summary>
    public partial class MessageBoxView : UserControl {

        public MessageBoxView() {

            InitializeComponent();
        }

        public void SetText(string text) {

            MessageLabel.Text = text;
        }
    }
}
