using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models {
    public class BookSearchManager {

        private readonly BookDataSearcher bookDataSearcher; //検索ボタンの動作
        private readonly AllBookDatasDisplay allBookDatasDisplay; //全件表示の動作

        //------------
        //コンストラクタ
        public BookSearchManager(BookDataManager bookDataManager) {

            bookDataSearcher = new(bookDataManager);
            allBookDatasDisplay = new(bookDataManager);

            // wwwroot/Resources/bookDataList.csv の絶対パスを取得
            //var filePath = Path.Combine(env.WebRootPath, "Resources", "bookDataList.csv");

            // CSV を読み込む（Java の init() 相当）
            //LoadBookDatas(filePath); // ← Program.csでシングルトン設定済み。ここが1回だけ呼ばれる
        }

        public List<BookDataBean>? SearchBookData(string? keyWord, string? pushedRadio, string[]? chkBoxDataArray) {

            return bookDataSearcher.SearchBookData(keyWord, pushedRadio, chkBoxDataArray);
        }

        public List<BookDataBean>? AllBookDataDisplay(string[] chkBoxDataArray) {

            return allBookDatasDisplay.AllBookDataDisplay(chkBoxDataArray);
        }
    }
}