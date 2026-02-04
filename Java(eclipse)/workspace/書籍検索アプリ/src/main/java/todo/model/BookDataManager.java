package todo.model;
import java.util.Arrays;

import todo.model.beans.BookDataBean;

public class BookDataManager {
	
	private CsvReader csvReader;
    private BookDataBean[] bookDataBeans;
	
	@FunctionalInterface
	public interface FunctionPointer {
		
		// Method signatures of pointed method
		String apply(BookDataBean bookData);
	}
	
	public final FunctionPointer[] SEARCH_TARGET_ARRAY = {
		//検索は上のものから順に探す
		//本のタイトルで検索
		this::getBookName,
		//著者で検索
		this::getAuthor,
		//架空ISBNコードで検索
		this::getFictitiousISBN,
	};
	
	//----------
	//コンストラクタ
	public BookDataManager() {
		
		bookDataBeans = new BookDataBean[0];
		csvReader = new CsvReader(bookDataBeans);
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
	
	public boolean stringRegexCheck(String target,String keyWord) {
		
		return target.matches(".*" + keyWord + ".*");
	}
	
	public String getBookName(BookDataBean bookData) {
		
		//本のタイトルで検索
		return bookData.getBookName();
	}
	
	private String getAuthor(BookDataBean bookData) {
			
		//著者で検索
		return bookData.getAuthor();
	}
	
	private String getFictitiousISBN(BookDataBean bookData) {
		
		//架空ISBNコードで検索
		return bookData.getFictitiousISBN();
	}
	
	public BookDataBean[] mergedBookDataBeanGet(String[] chkBoxDataArray) {
		
		var Result = new BookDataBean[0];
		var dbResult = new BookDataBean[0];
		
		//ファイルから検索
		if(Arrays.asList(chkBoxDataArray).contains("fromFileSearch")) {
			
			Result = getBookDataBeans();
		}
		//データベースから検索
		if(Arrays.asList(chkBoxDataArray).contains("fromDataBaseSearch")) {
			
			try {
				
				dbResult = BookDataListDAO.findAll().toArray(BookDataBean[]::new);
			}catch(Exception e) {
				
				System.out.println("例外が発生しましたが、問題なく継続できました。");
			}
		}
		return arrayConcat(Result,dbResult);
	}
	
	public static <T> T[] arrayConcat(T[] a, T[] b) {
		
	    T[] result = Arrays.copyOf(a, a.length + b.length);
	    System.arraycopy(b, 0, result, a.length, b.length);
	    return result;
	}
}