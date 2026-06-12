using OfficeOpenXml;
using OfficeOpenXml.Drawing.Chart;
using System;
using System.IO;
using System.Windows.Forms;
using ExcelInterop = Microsoft.Office.Interop.Excel;


namespace CSVグラフ化ツール {

    public class CsvBarChartApp {

        private TextBox txtCsvPath;
        private Label lblStatus;

        public CsvBarChartApp() {

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }

        public void Initialize(TextBox txtCsvPath, Label lblStatus) {

            this.txtCsvPath = txtCsvPath;
            this.lblStatus = lblStatus;
        }

        public void BtnSelectCsv_Click(object sender, EventArgs e) {

            using (var ofd = new OpenFileDialog()) {

                ofd.Filter = "CSVファイル (*.csv)|*.csv|すべてのファイル (*.*)|*.*";
                if (ofd.ShowDialog() == DialogResult.OK) {

                    txtCsvPath.Text = ofd.FileName;
                    lblStatus.Text = "選択済み: " + ofd.FileName;
                }
            }
        }

        private bool IsExcelAvailable() {

            try {

                var type = Type.GetTypeFromProgID("Excel.Application", throwOnError: false);
                if (type == null) {

                    return false;
                }

                object app = null;

                try {

                    app = Activator.CreateInstance(type);
                } catch {

                    return false;
                } finally {

                    if (app != null) {

                        System.Runtime.InteropServices.Marshal.ReleaseComObject(app);
                    }
                }

                return true;
            } catch {

                return false;
            }
        }

        public void BtnGenerate_Click(object sender, EventArgs e) {

            var csvPath = txtCsvPath.Text;
            if (string.IsNullOrWhiteSpace(csvPath) || !File.Exists(csvPath)) {

                MessageBox.Show("CSVファイルを選択してください。", "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            try {

                // Excel がインストールされているか判定
                bool excelInstalled = IsExcelAvailable();

                using (var sfd = new SaveFileDialog()) {

                    sfd.Filter = "Excelファイル (*.xlsx)|*.xlsx";
                    sfd.FileName = "output.xlsx";

                    if (sfd.ShowDialog() != DialogResult.OK) {

                        return;
                    }

                    var savePath = sfd.FileName;

                    if (excelInstalled) {

                        if (GenerateWithExcelInterop(csvPath, savePath)) {

                            GenerateWithEpplus(csvPath, savePath);
                            lblStatus.Text = "EPPlusでグラフを作成しました。";
                        } else {

                            lblStatus.Text = "Excelでグラフを作成しました。";
                        }
                    } else {

                        GenerateWithEpplus(csvPath, savePath);
                        lblStatus.Text = "EPPlusでグラフを作成しました。";
                    }

                    MessageBox.Show("グラフ生成が完了しました。\n" + savePath, "完了", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            } catch (Exception ex) {

                MessageBox.Show("エラーが発生しました:\n" + ex.Message, "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        /// <summary>
        /// Excel Interop を使って棒グラフを作成（Excelインストール環境用）
        /// CSV形式：1列目カテゴリ、2列目数値 を想定
        /// </summary>
        private bool GenerateWithExcelInterop(string csvPath, string savePath) {

            ExcelInterop.Application app = null;
            ExcelInterop.Workbook wb = null;
            bool result = false;
            try {

                app = new ExcelInterop.Application();
                app.Visible = false;

                wb = app.Workbooks.Add();
                ExcelInterop.Worksheet ws = wb.ActiveSheet;

                var lines = File.ReadAllLines(csvPath);
                int row = 1;
                foreach (var line in lines) {

                    var parts = line.Split(',');
                    for (int col = 0; col < parts.Length; col++) {

                        ws.Cells[row, col + 1].Value = parts[col];
                    }
                    row++;
                }

                // 棒グラフ作成
                ExcelInterop.Range categoryRange = ws.Range["A2", $"A{row - 1}"];
                ExcelInterop.Range valueRange = ws.Range["B2", $"B{row - 1}"];

                ExcelInterop.ChartObjects charts = (ExcelInterop.ChartObjects)ws.ChartObjects();
                ExcelInterop.ChartObject chartObject = charts.Add(300, 10, 400, 300);
                ExcelInterop.Chart chart = chartObject.Chart;

                chart.ChartType = ExcelInterop.XlChartType.xlColumnClustered;
                chart.SetSourceData(valueRange);
                chart.SeriesCollection(1).XValues = categoryRange;
                chart.HasTitle = true;
                chart.ChartTitle.Text = "CSV棒グラフ";

                wb.SaveAs(savePath);
            } catch (Exception ex) {

                //エラーの旨を通知
                MessageBox.Show("エラーが発生しました:\n" + ex.Message, "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);

                // ウィンドウが閉じられたら、今度はEPPlusに切り替えて実行させるかを聞く
                var resultSelect = MessageBox.Show(

                    "Excel Interop でCSVファイル生成中にエラーが発生しました。\n" +
                    "EPPlus に切り替えてCSVファイル生成を試しますか？",
                    "確認",
                    MessageBoxButtons.YesNo,
                    MessageBoxIcon.Question
                );

                // Yes → EPPlus に切り替える
                result = resultSelect == DialogResult.Yes;
            } finally {

                wb?.Close();
                app?.Quit();
            }
            return result;
        }

        /// <summary>
        /// EPPlus を使って棒グラフを作成（Excel無し環境用）
        /// CSV形式：1列目カテゴリ、2列目数値 を想定
        /// </summary>
        private void GenerateWithEpplus(string csvPath, string savePath) {

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage()) {

                // --- ① データシート作成 ---
                var wsData = package.Workbook.Worksheets.Add("Data");

                var lines = File.ReadAllLines(csvPath);
                int row = 1;

                foreach (var line in lines) {

                    string[] parts = line.Split(',');

                    // A列：項目（文字列）
                    wsData.Cells[row, 1].Value = parts[0];

                    // B列：値（数値としてパース）
                    if (double.TryParse(parts[1], out double num)) {

                        wsData.Cells[row, 2].Value = num;   // ← 数値として書き込む
                    } else {

                        wsData.Cells[row, 2].Value = 0;     // パース失敗時の保険
                    }

                    row++;
                }

                // --- ② グラフシート作成 ---
                var wsChart = package.Workbook.Worksheets.Add("Chart");

                var chart = wsChart.Drawings.AddChart("chart", eChartType.ColumnClustered);
                chart.Title.Text = "CSV棒グラフ";

                // データ範囲
                var categoryRange = wsData.Cells[2, 1, row - 1, 1]; // A2:A{row-1}
                var valueRange = wsData.Cells[2, 2, row - 1, 2]; // B2:B{row-1}

                var series = chart.Series.Add(valueRange, categoryRange);
                series.Header = "値";

                chart.SetPosition(1, 0, 1, 0);
                chart.SetSize(600, 400);

                // ★ Chart シートをアクティブにする
                package.Workbook.View.ActiveTab = wsChart.Index;

                // --- ③ 保存 ---
                package.SaveAs(new FileInfo(savePath));
            }
        }
    }
}