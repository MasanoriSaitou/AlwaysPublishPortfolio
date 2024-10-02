package todo.model.detail;

import todo.model.beans.BookDataBean;
import 自作ライブラリ.TextFileLib;

public class CsvReader {
	
	private BookDataBean[] bookDataBeans;
	
	//----------
	//コンストラクタ
	public CsvReader() {
		
		bookDataBeans = new BookDataBean[0];
	}
	public CsvReader(BookDataBean[] bookDataBeans) {
		
		this.bookDataBeans = bookDataBeans;
	}
	
	//------------
	//CSVを読み込み
	public BookDataBean[] readCsv(String filePath) {
		
		String[][] resultArray  = TextFileLib.readerCsvData(filePath,"Shift-JIS",true);
		bookDataBeans = new BookDataBean[resultArray.length];
		int i = 0;
		for(String[] results : resultArray) {
			bookDataBeans[i] = new BookDataBean(results);
			i++;
		}
		return bookDataBeans;
	}
}