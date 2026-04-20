using 書籍検索アプリ_移植元Java.Models.beans;
using 書籍検索アプリ_移植元Java.自作ライブラリ;

namespace 書籍検索アプリ_移植元Java.Models
{
    public class CSVReader {
	
		private BookDataBean[] bookDataBeans;
	
		//----------
		//コンストラクタ
		public CSVReader() {
		
			bookDataBeans = Array.Empty<BookDataBean>();
		}
		public CSVReader(BookDataBean[] bookDataBeans) {
		
			this.bookDataBeans = bookDataBeans;
		}
	
		//------------
		//CSVを読み込み
		public BookDataBean[] readCsv(string filePath) {
		
			string[][] resultArray  = TextFileLib.ReaderCsvData(filePath,"Shift-JIS",true);
			bookDataBeans = new BookDataBean[resultArray.Length];
			int i = 0;
			foreach(string[] results in resultArray) {
				bookDataBeans[i] = new BookDataBean(results);
				i++;
			}
			return bookDataBeans;
		}
	}
}