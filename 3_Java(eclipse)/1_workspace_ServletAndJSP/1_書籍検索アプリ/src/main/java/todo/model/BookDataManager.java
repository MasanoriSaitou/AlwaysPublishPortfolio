package todo.model;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import todo.model.beans.BookDataBean;

public class BookDataManager {
	
	private CsvData csvData;
	private DatabaseData databaseData;
	
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
		
		csvData = new CsvData();
		databaseData = new DatabaseData();
	}
	
	public BookDataBean[] loadBookDatas(String filePath) {
		
        return csvData.loadBookDatas(filePath);
    }
	
	public boolean stringRegexCheck(String target,String keyWord) {
		
		return target.matches(".*" + keyWord + ".*");
	}
	
	public String getBookName(BookDataBean bookData) {
		
		//本のタイトルで検索
		return bookData.getBookName();
	}
	
	public String getAuthor(BookDataBean bookData) {
			
		//著者で検索
		return bookData.getAuthor();
	}
	
	public String getFictitiousISBN(BookDataBean bookData) {
		
		//架空ISBNコードで検索
		return bookData.getFictitiousISBN();
	}
	
	public BookDataBean[] mergedBookDataBeanGet(String[] chkBoxDataArray) {
		
	    List<ILoadData> list = new ArrayList<>();

	    //ファイルから検索
	    if (Arrays.asList(chkBoxDataArray).contains("fromFileSearch")) {
	    	
	        list.add(csvData);
	    }
	    //データベースから検索
	    if (Arrays.asList(chkBoxDataArray).contains("fromDataBaseSearch")) {
	    	
	        list.add(databaseData);
	    }

	    // 両方 or どちらか一方でも Composite にまとめる
	    ILoadData loadData = new CompositeLoadData(list.toArray(ILoadData[]::new));
	    return loadData.BookDataBeanGet();
	}
}