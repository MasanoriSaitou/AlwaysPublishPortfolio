package todo.model;

import todo.model.beans.BookDataBean;

public class CsvData implements ILoadData{
	
	private CsvReader csvReader;
    private BookDataBean[] bookDataBeans;
    
    //---------
    //コンストラクタ
    public CsvData() {
    	
    	bookDataBeans = new BookDataBean[0];
		csvReader = new CsvReader(bookDataBeans);
    }
    public CsvData(BookDataBean[] bookDataBeans) {
		
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
	
	@Override
	public BookDataBean[] BookDataBeanGet() {
		
		return getBookDataBeans();
	}
}