using 書籍検索アプリ_移植元Java.Models.beans;
using 書籍検索アプリ_移植元Java.Models.interfaces;

namespace 書籍検索アプリ_移植元Java.Models {
    public class CsvData : ILoadData {

        private readonly CSVReader csvReader;
        private BookDataBean[] bookDataBeans;

        //---------
        //コンストラクタ
        public CsvData() {

            bookDataBeans = Array.Empty<BookDataBean>();
            csvReader = new CSVReader(bookDataBeans);
        }
        public CsvData(BookDataBean[] bookDataBeans) {

            this.bookDataBeans = bookDataBeans;
            csvReader = new CSVReader(bookDataBeans);
        }

        public BookDataBean[] LoadBookDatas(string filePath) {

            return bookDataBeans = csvReader.ReadCsv(filePath);
        }

        public BookDataBean[] GetCloneAllBookData() {

            return (BookDataBean[])bookDataBeans.Clone();
        }

        public BookDataBean[] GetBookDataBeans() {

            return bookDataBeans;
        }

        public BookDataBean[] BookDataBeanGet() {

            return GetBookDataBeans();
        }
    }
}