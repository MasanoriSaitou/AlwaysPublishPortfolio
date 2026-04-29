using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models {
    public class AllBookDatasDisplay {

        private readonly BookDataManager bookDataManager;

        //-----------
        //コンストラクタ
        public AllBookDatasDisplay(BookDataManager bookDataManager) {

            this.bookDataManager = bookDataManager;
        }

        //----------
        //全件表示
        public List<BookDataBean>? AllBookDataDisplay(string[] chkBoxDataArray) {

            return ResultListReturn(chkBoxDataArray);
        }

        private List<BookDataBean>? ResultListReturn(string[] chkBoxDataArray) {

            BookDataBean[] allBookData = bookDataManager.MergedBookDataBeanGet(chkBoxDataArray);
            return new List<BookDataBean>(allBookData);
        }
    }
}