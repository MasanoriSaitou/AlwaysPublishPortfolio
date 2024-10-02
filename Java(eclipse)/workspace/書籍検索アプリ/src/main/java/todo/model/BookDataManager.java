package todo.model;

import todo.model.beans.BookDataBean;
import todo.model.detail.CsvReader;

public class BookDataManager {
	
	private CsvReader csvReader;
    //private BookDataSearcher bookDataSearcher;
	private BookDataBean[] bookDataBeans;

	//----------
	//コンストラクタ
	public BookDataManager() {
		
		bookDataBeans = new BookDataBean[0];
		csvReader = new CsvReader(bookDataBeans);
        //bookDataSearcher = new BookDataSearcher(bookDataBeans);
	}
	public BookDataManager(BookDataBean[] bookDataBeans) {
		
		this.bookDataBeans = bookDataBeans;
		csvReader = new CsvReader(bookDataBeans);
	}
	
	public BookDataBean[] loadBookDatas(String filePath) {
		
        return bookDataBeans = csvReader.readCsv(filePath);
    }
	
	public BookDataBean[] getCloneAllBookData() {
		
		return bookDataBeans.clone();
	}
	
	public BookDataBean[] getBookDataBeans() {
		
		return bookDataBeans;
	}
}