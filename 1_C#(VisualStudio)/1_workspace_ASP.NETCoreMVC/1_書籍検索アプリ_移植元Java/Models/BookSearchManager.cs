namespace 書籍検索アプリ_移植元Java.Models
{
    public class BookSearchManager {

		private BookDataManager bookDataManager; //CSV読み込みの管理
		//private BookDataSearcher bookDataSearcher; //検索ボタンの動作
		//private AllBookDatasDisplay allBookDatasDisplay; //全件表示の動作
		//private SearchEngineSearch searchEngineSearch; //検索エンジンでの検索の動作
		//private SearchInformationDataManager searchInfoManager; 
	
		//------------
		//コンストラクタ
		public BookSearchManager() {
		
			InitializeParameters();
		}

		private void InitializeParameters()
		{

			bookDataManager = new();
			//bookDataSearcher = new BookDataSearcher(bookDataManager, searchInfoManager);
			//searchEngineSearch = new SearchEngineSearch(searchInfoManager);
			//allBookDatasDisplay = new AllBookDatasDisplay(bookDataManager, searchInfoManager);
		}

		public void LoadBookDatas(string filePath) {
		
			bookDataManager.LoadBookDatas(filePath);
		}
	
		//public void searchBookData(HttpServletRequest request) {
		
		//	String keyWord = searchInfoManager.getKeyWord();
		//	bookDataSearcher.searchBookData(keyWord,request);
		//	//パラメータをjspへ渡す
		//	searchInfoManager.parameterSet(request);
		//}
	
		//public void allBookDataDisplay(HttpServletRequest request) 
		//	throws ServletException, IOException {
		
		//	allBookDatasDisplay.allBookDataDisplay(request);
		//	//パラメータをjspへ渡す
		//	searchInfoManager.parameterSet(request);
		//}
	
		//public void searchResultDisplay(HttpServletRequest request) {
		
		//	//パラメータをjspへ渡す
		//	searchInfoManager.parameterSet(request);
		//	BookDataBean resultRecord = searchInfoManager.getResultRecord();
		//	request.setAttribute("resultRecord",resultRecord);
		//	request.setAttribute("selectNo",searchInfoManager.setSelectNoSetNullAndReturn());
		//}
	}
}