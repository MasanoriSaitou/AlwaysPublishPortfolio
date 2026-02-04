package todo.model;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

public class BookSearchManager {

	private BookDataManager bookDataManager; //CSV読み込みの管理
	private BookDataSearcher bookDataSearcher; //検索ボタンの動作
	private AllBookDatasDisplay allBookDatasDisplay; //全件表示の動作
	private SearchEngineSearch searchEngineSearch; //検索エンジンでの検索の動作
	private SearchInformationDataManager searchInfoManager;
	
	//------------
	//コンストラクタ
	public BookSearchManager(SearchInformationDataManager searchInfoManager) {
		
		this.searchInfoManager = searchInfoManager;
		initializeParameters();
	}
	
	private void initializeParameters() {
		
		bookDataManager = new BookDataManager();
		bookDataSearcher = new BookDataSearcher(bookDataManager,searchInfoManager);
        searchEngineSearch = new SearchEngineSearch(searchInfoManager);
        allBookDatasDisplay = new AllBookDatasDisplay(bookDataManager,searchInfoManager);
	}
	
	public void loadBookDatas(String filePath) {
		
		bookDataManager.loadBookDatas(filePath);
	}
	
	public void searchBookData(String keyWord,HttpServletRequest request) {
		
		bookDataSearcher.searchBookData(keyWord,request);
	}
	
	public void allBookDataDisplay(HttpServletRequest request) 
		throws ServletException, IOException {
		
		allBookDatasDisplay.allBookDataDisplay(request);
	}
	
	/*public void searchSearchEngine(String target,HttpServletRequest request, 
		HttpServletResponse response)throws ServletException, IOException {
		
		searchEngineSearch.searchSearchEngine(target,request, response);
	}*/
}