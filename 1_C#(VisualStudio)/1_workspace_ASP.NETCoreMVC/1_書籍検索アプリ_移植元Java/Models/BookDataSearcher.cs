using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models {
    public class BookDataSearcher {

        private readonly BookDataManager bookDataManager;
        // 検索対象プロパティを関数として配列化
        private readonly Func<BookDataBean, string>[] searchTargets =
        [
			//検索は上のものから順に探す
			//本のタイトルで検索
			book => book.BookName!,
			//著者で検索
			book => book.Author!,
			//架空ISBNコードで検索
			book => book.FictitiousISBN!,
        ];

        //----------------
        //コンストラクタ
        public BookDataSearcher(BookDataManager bookDataManager) {

            this.bookDataManager = bookDataManager;
        }

        //-----------
        //検索
        public List<BookDataBean>? SearchBookData(string? keyWord, string? pushedRadio, string[]? chkBoxDataArray) {

            if (keyWord == null || pushedRadio == null || chkBoxDataArray == null || keyWord == "") {

                return null;
            }
            return BookDataSearch(pushedRadio, keyWord, chkBoxDataArray);
        }

        //------------
        //検索
        public List<BookDataBean> BookDataSearch(string pushedRadio, string keyWord, string[] chkBoxDataArray) {

            BookDataBean[] beanData = bookDataManager.MergedBookDataBeanGet(chkBoxDataArray);
            var searchResultList =
                pushedRadio == "keyWordSearch" ?
                    //キーワードで検索
                    (List<BookDataBean>)KeyWordSearch(beanData, keyWord)
                    //本のタイトルで検索
                    : (List<BookDataBean>)BookTitleNameSearch(beanData, keyWord);
            return searchResultList;
        }

        private List<BookDataBean> KeyWordSearch(BookDataBean[] bookDataBeans, string keyWord) {

            return BookDataSearchDetail(bookDataBeans, keyWord);
        }

        private List<BookDataBean> BookTitleNameSearch(BookDataBean[] bookDataBeans, string bookTitleName) {

            return BookDataSearchDetail(bookDataBeans, bookTitleName, 1);
        }

        private List<BookDataBean> BookDataSearchDetail(BookDataBean[] bookDataBeans, string keyWord, int end = 2) {

            return searchTargets
                .Take(end) // end より後ろの検索対象をスキップ
                .SelectMany(selector =>
                    bookDataBeans.Where(bookData =>
                        bookDataManager.StringRegexCheck(selector(bookData), keyWord)))
                .ToList();
        }
    }
}
