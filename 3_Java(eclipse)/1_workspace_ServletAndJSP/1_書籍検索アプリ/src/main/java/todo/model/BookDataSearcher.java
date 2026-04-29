package todo.model;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import todo.model.BookDataManager.FunctionPointer;
import todo.model.beans.BookDataBean;

public class BookDataSearcher {
	
	private BookDataManager bookDataManager;
	private SearchInformationDataManager searchInformationDataManager;
	
	//----------------
	//コンストラクタ
	public BookDataSearcher(BookDataManager bookDataManager,
		SearchInformationDataManager searchInformationDataManager) {
		
		this.bookDataManager = bookDataManager;
		this.searchInformationDataManager = searchInformationDataManager;
	}
	
	//-----------
	//検索
	public void searchBookData(String keyWord,HttpServletRequest request){
		
		if(!"".equals(keyWord)) {
			
			String pushedRadio = searchInformationDataManager.getPushedRadio();
//			switch(pushedRadio) {
//			
//				case "keyWordSearch":
//					//キーワードで検索
//					keyWordSearch(pushedRadio,keyWord);
//				break;
//				case "titleSearch":
//					//本のタイトルで検索
//					bookTitleNameSearch(pushedRadio,keyWord);
//				break;
//			}
			keyWordSearch(pushedRadio,keyWord);
			searchInformationDataManager.pushSearchButton(true,request);
		}else {
			
			searchInformationDataManager.pushSearchButton(false,request);
		}
	}
	
	//------------
	//検索
	public ArrayList<BookDataBean> keyWordSearch(String pushedRadio,String keyWord) {
		
		String[] chkBoxDataArray = searchInformationDataManager.getPushedChkBox();
		BookDataBean[] beanData = bookDataManager.mergedBookDataBeanGet(chkBoxDataArray); 
		var searchResultList = 
			"keyWordSearch".equals(pushedRadio)? 
				//キーワードで検索
				(ArrayList<BookDataBean>)keyWordSearchDetail(beanData,keyWord)
				//本のタイトルで検索
				:(ArrayList<BookDataBean>)bookTitleNameSearchDetail(beanData,keyWord);
		searchInformationDataManager.setSearchResultList(searchResultList);
		return searchResultList;
	}
	
//	//------------
//	//本のタイトルで検索
//	public ArrayList<BookDataBean> bookTitleNameSearch(String titleName) {
//		
//		var searchResultList = 
//			(ArrayList<BookDataBean>)bookTitleNameSearchDetail(bookDataManager.getBookDataBeans(),titleName);
//		searchInformationDataManager.setSearchResultList(searchResultList);
//		return searchResultList;
//	}
//	
	private List<BookDataBean> keyWordSearchDetail(BookDataBean[] bookDataBeans,String keyWord) {
		
		List<BookDataBean> searchResultList = new ArrayList<>();
		for(FunctionPointer search:bookDataManager.SEARCH_TARGET_ARRAY) {
			
			for(BookDataBean bookData : bookDataBeans) {
				
				if(bookDataManager.stringRegexCheck(search.apply(bookData),keyWord)) {
					
					searchResultList.add(bookData);
				}
			}	
		}
		return searchResultList;
	}
	
	private List<BookDataBean> bookTitleNameSearchDetail(BookDataBean[] bookDataBeans,String bookTitleName) {
		
		List<BookDataBean> searchResultList = new ArrayList<>();
		for(BookDataBean bookData : bookDataBeans) {
			
			if(bookDataManager.stringRegexCheck(bookDataManager.getBookName(bookData),bookTitleName)) {
				
				searchResultList.add(bookData);
			}
		}	
		return searchResultList;
	}
}