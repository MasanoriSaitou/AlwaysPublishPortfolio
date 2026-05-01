using System.Windows.Controls;

namespace じゃんけんゲーム_移植元Java.View {

    /// <summary>
    /// HpView.xaml の相互作用ロジック
    /// </summary>
    public partial class HpView : UserControl {

        private string objStr;
        private int hp;

        public HpView() : this(3) {

            //InitializeComponent();
        }

        public HpView(int initialHp, string objStr = "●") {

            InitializeComponent();
            this.objStr = objStr;
            UpdateHp(initialHp);
        }

        public void SetHeartObj(string emoji) {

            objStr = emoji;
            UpdateHp(hp);
        }

        public void UpdateHp(int newHp) {

            hp = newHp;

            // Java の OBJ_STR.repeat(hp) と同じ
            HpLabel.Text = new string(objStr[0], hp);
        }
    }
}