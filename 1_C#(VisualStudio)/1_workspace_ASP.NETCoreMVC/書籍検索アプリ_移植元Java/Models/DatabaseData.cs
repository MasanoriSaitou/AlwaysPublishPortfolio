using 書籍検索アプリ_移植元Java.Models.beans;
using 書籍検索アプリ_移植元Java.Models.interfaces;

namespace 書籍検索アプリ_移植元Java.Models {
    public class DatabaseData : ILoadData {

        public BookDataBean[] BookDataBeanGet() {

            try {

                return BookDataListDAO.FindAll().ToArray();
            } catch (Exception e) {

                Console.WriteLine(e + "\n例外が発生しましたが、問題なく継続できました。");
                return Array.Empty<BookDataBean>();
            }
        }
    }
}
