package todo.model;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SearchEngineSearch {
	
	private SearchInformationDataManager searchInformationDataManager;
	
	//-----------
	//コンストラクタ
	public SearchEngineSearch() {
		
		searchInformationDataManager = new SearchInformationDataManager();
	}
	public SearchEngineSearch(SearchInformationDataManager searchInformationDataManager) {
		
		this.searchInformationDataManager = searchInformationDataManager;
	}
	
	public void searchSearchEngine(String pushedButtonCopy,HttpServletRequest request,
		HttpServletResponse response) throws IOException, ServletException {
		
		// フォワード処理
		String pushedBtnCopy = searchInformationDataManager.getPushedButtonCopy();
		searchInformationDataManager.setPushedButton(pushedBtnCopy);
		searchInformationDataManager.setPushedButtonCopy(pushedButtonCopy);
		String searchQuery = request.getParameter("keyWord");
		// エンコードして Google 検索に渡す
        String encodedQuery = URLEncoder.encode(searchQuery, "UTF-8");
        String googleSearchUrl = "https://www.google.com/search?q=" + encodedQuery;
        response.getWriter().write("<html><head><script type='text/javascript'>");
        response.getWriter().write("window.open('" + googleSearchUrl + "', '_blank');");
        //リダイレクトの実施
        response.getWriter().write("window.location.href = '" + "./BookSearchServlet" + "';");
        response.getWriter().write("</script></head><body></body></html>");
        response.getWriter().write("");
	}
}
