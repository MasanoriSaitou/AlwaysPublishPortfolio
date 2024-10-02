package todo.model;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import todo.model.beans.BookDataBean;

public class BookSearchManager {

	private BookDataBean[] bookDataBeans;
	private BookDataManager bookDataManager; //CSV読み込みの管理
	private BookTitleSearch bookTitleSearch; //検索ボタンの動作
	private AllBookDatasDisplay allBookDatasDisplay; //全件表示の動作
	private SearchEngineSearch searchEngineSearch; //検索エンジンでの検索の動作
	private SearchInformationDataManager searchInfoManager;
	
	//------------
	//コンストラクタ
	public BookSearchManager(SearchInformationDataManager searchInfoManager) {
		
		bookDataBeans = new BookDataBean[0];
		this.searchInfoManager = searchInfoManager;
		initializeParameters();
	}
	
	private void initializeParameters() {
		
		bookDataManager = new BookDataManager(bookDataBeans);
        bookTitleSearch = new BookTitleSearch(bookDataBeans,searchInfoManager);
        searchEngineSearch = new SearchEngineSearch(searchInfoManager);
        allBookDatasDisplay = new AllBookDatasDisplay(bookDataManager,searchInfoManager);
	}
	
	public void loadBookDatas(String filePath) {
		
		bookDataBeans = bookDataManager.loadBookDatas(filePath);
		//ここで一度bookDataBeansの参照がきれるため、再度初期化
		initializeParameters();
	}
	
	public void searchBookData(String keyWord,HttpServletRequest request) {
		
		bookTitleSearch.searchBookData(keyWord,request);
	}
	
	public void allBookDataDisplay(HttpServletRequest request) 
		throws ServletException, IOException {
		
		allBookDatasDisplay.allBookDataDisplay(request);
	}
	
	public void searchSearchEngine(String target,HttpServletRequest request, 
		HttpServletResponse response)throws ServletException, IOException {
		
		searchEngineSearch.searchSearchEngine(target,request, response);
	}
}