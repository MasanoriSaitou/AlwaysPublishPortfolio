package todo.model.detail;

import java.util.ArrayList;
import java.util.List;

import todo.model.beans.BookDataBean;

public class BookDataSearcher {
	
	@FunctionalInterface
	private interface FunctionPointer {
		
		// Method signatures of pointed method
		String apply(BookDataBean bookData);
	}
	
	private BookDataBean[] bookDataBeans;
	private final FunctionPointer[] SEARCH_TARGET_ARRAY = {
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
	public BookDataSearcher() {
		
		bookDataBeans = new BookDataBean[0];
	}
	public BookDataSearcher(BookDataBean[] bookDataBeans) {
		
		this.bookDataBeans = bookDataBeans;
	}
	
	public List<BookDataBean> keyWordSearch(String keyWord) {
		
		List<BookDataBean> searchResultList = new ArrayList<>();
		for(FunctionPointer search:SEARCH_TARGET_ARRAY) {
			
			for(BookDataBean bookData : bookDataBeans) {
				
				if(stringRegexCheck(search.apply(bookData),keyWord)) {
					
					searchResultList.add(bookData);
				}
			}	
		}
		return searchResultList;
	}
	
	public List<BookDataBean> bookTitleNameSearch(String bookTitleName) {
		
		List<BookDataBean> searchResultList = new ArrayList<>();
		for(BookDataBean bookData : bookDataBeans) {
			
			if(stringRegexCheck(getBookName(bookData),bookTitleName)) {
				
				searchResultList.add(bookData);
			}
		}	
		return searchResultList;
	}
	
	public boolean stringRegexCheck(String target,String keyWord) {
		
		return target.matches(".*" + keyWord + ".*");
	}
	
	private String getBookName(BookDataBean bookData) {
		
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
}