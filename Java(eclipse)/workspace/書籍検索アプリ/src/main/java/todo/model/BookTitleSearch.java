package todo.model;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import todo.model.beans.BookDataBean;
import todo.model.detail.BookDataSearcher;

public class BookTitleSearch {
	
	private BookDataSearcher bookDataSearcher;
	private SearchInformationDataManager searchInformationDataManager;
	
	//----------------
	//コンストラクタ
	public BookTitleSearch() {
		
		bookDataSearcher = new BookDataSearcher();
		searchInformationDataManager = new SearchInformationDataManager();
	}
	public BookTitleSearch(BookDataBean[] bookDataBeans,
		SearchInformationDataManager searchInformationDataManager) {
		
		bookDataSearcher = new BookDataSearcher(bookDataBeans);
		this.searchInformationDataManager = searchInformationDataManager;
	}
	
	//-----------
	//検索
	public void searchBookData(String keyWord,HttpServletRequest request){
		
		if(!"".equals(keyWord)) {
			
			String pushedRadio = searchInformationDataManager.getPushedRadio();
			switch(pushedRadio) {
			
				case "keyWordSearch":
					//キーワードで検索
					keyWordSearch(keyWord);
				break;
				case "titleSearch":
					//本のタイトルで検索
					bookTitleNameSearch(keyWord);
				break;
			}
			searchInformationDataManager.pushSearchButton(true,request);
		}else {
			
			searchInformationDataManager.pushSearchButton(false,request);
		}
	}
	
	//------------
	//キーワードで検索
	public ArrayList<BookDataBean> keyWordSearch(String keyWord) {
		
		var searchResultList = 
			(ArrayList<BookDataBean>)bookDataSearcher.keyWordSearch(keyWord);
		searchInformationDataManager.setSearchResultList(searchResultList);
		return searchResultList;
	}
	
	//------------
	//本のタイトルで検索
	public ArrayList<BookDataBean> bookTitleNameSearch(String titleName) {
		
		var searchResultList = 
			(ArrayList<BookDataBean>)bookDataSearcher.bookTitleNameSearch(titleName);
		searchInformationDataManager.setSearchResultList(searchResultList);
		return searchResultList;
	}
}