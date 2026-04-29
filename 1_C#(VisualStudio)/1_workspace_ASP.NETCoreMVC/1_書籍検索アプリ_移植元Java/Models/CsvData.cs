using Microsoft.CodeAnalysis.Elfie.Serialization;
using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models
{
    public class CsvData : ILoadData{
	
		private CSVReader csvReader;
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
		
			return bookDataBeans = csvReader.readCsv(filePath);
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
