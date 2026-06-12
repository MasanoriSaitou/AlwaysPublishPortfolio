using System.Windows.Forms;


namespace CSVグラフ化ツール {

    public partial class Form1 : Form {

        public Form1() {

            InitializeComponent();
            InitializeComponents();
        }

        private void InitializeComponents() {

            Button btnSelectCsv;
            Button btnGenerate;
            TextBox txtCsvPath;
            Label lblStatus;
            CsvBarChartApp csvBarChartApp;

            csvBarChartApp = new CsvBarChartApp();
            this.Text = "CSV → 棒グラフ生成ツール";
            this.Width = 600;
            this.Height = 200;

            btnSelectCsv = new Button {

                Text = "CSV選択",
                Left = 20,
                Top = 20,
                Width = 100
            };
            btnSelectCsv.Click += csvBarChartApp.BtnSelectCsv_Click;

            txtCsvPath = new TextBox {

                Left = 140,
                Top = 22,
                Width = 400
            };

            btnGenerate = new Button {

                Text = "グラフ生成",
                Left = 20,
                Top = 60,
                Width = 100
            };
            btnGenerate.Click += csvBarChartApp.BtnGenerate_Click;

            lblStatus = new Label {

                Left = 140,
                Top = 65,
                Width = 400,
                Text = "CSVファイルを選択してください。"
            };

            this.Controls.Add(btnSelectCsv);
            this.Controls.Add(txtCsvPath);
            this.Controls.Add(btnGenerate);
            this.Controls.Add(lblStatus);
            csvBarChartApp.Initialize(txtCsvPath, lblStatus);
        }
    }
}