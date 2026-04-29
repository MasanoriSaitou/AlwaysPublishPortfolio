using System.Text.RegularExpressions;
using 書籍検索アプリ_移植元Java.Models.beans;
using 書籍検索アプリ_移植元Java.Models.interfaces;

namespace 書籍検索アプリ_移植元Java.Models {
    public class BookDataManager {

        public delegate string FunctionPointer(BookDataBean bookData);
        private readonly CsvData csvData;
        private readonly DatabaseData databaseData;

        //----------
        //コンストラクタ
        public BookDataManager() {

            csvData = new();
            databaseData = new();
        }

        public BookDataBean[] LoadBookDatas(string filePath) {

            return csvData.LoadBookDatas(filePath);
        }

        public bool StringRegexCheck(string target, string keyword) {
            var regex = ".*" + Regex.Escape(keyword) + ".*";
            return Regex.IsMatch(target, regex);
        }

        public BookDataBean[] MergedBookDataBeanGet(string[] chkBoxDataArray) {
            var list = new List<ILoadData>();

            // ファイルから検索
            if (chkBoxDataArray.Contains("fromFileSearch")) {
                list.Add(csvData);
            }

            // データベースから検索
            if (chkBoxDataArray.Contains("fromDataBaseSearch")) {
                list.Add(databaseData);
            }

            // 両方 or 片方でも CompositeLoadData にまとめる
            var loadData = new CompositeLoadData(list);

            return loadData.BookDataBeanGet();
        }
    }
}