package todo.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import todo.model.beans.BookDataBean;

public class AllBookDatasDisplay {
	
	private BookDataManager bookDataManager;
	private SearchInformationDataManager searchInformationDataManager;
	
	//-----------
	//コンストラクタ
	public AllBookDatasDisplay() {
		
		bookDataManager = new BookDataManager();
		searchInformationDataManager = new SearchInformationDataManager();
	}
	public AllBookDatasDisplay(BookDataManager bookDataManager,
			SearchInformationDataManager searchInformationDataManager) {
		
		this.bookDataManager = bookDataManager;
		this.searchInformationDataManager = searchInformationDataManager;
	}
	
	//----------
	//全件表示
	public ArrayList<BookDataBean> allBookDataDisplay(HttpServletRequest request) 
		throws ServletException, IOException {
		
		ArrayList<BookDataBean> resultList = resultListReturn();
		searchInformationDataManager.setSearchResultList(resultList);
		searchInformationDataManager.pushSearchButton(true,request);
		return resultList;		
	}
	
	private ArrayList<BookDataBean> resultListReturn(){
		
		BookDataBean[] allBookData = bookDataManager.getCloneAllBookData();
		return new ArrayList<BookDataBean>(Arrays.asList(allBookData));
	}
}