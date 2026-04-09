package todo.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import todo.model.BookSearchManager;
import todo.model.SearchInformationDataManager;

/**
 * Servlet implementation class BookSearchScreen
 */
@WebServlet("/BookSearchServlet")
public class BookSearchServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private BookSearchManager bookSearchManager;
	private SearchInformationDataManager searchInfoManager;//検索情報
	private static final String FILE_NAME = "bookDataList.csv";
	private String FILE_PATH;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BookSearchServlet() {
    	
        super();
        searchInfoManager = new SearchInformationDataManager();
        bookSearchManager = new BookSearchManager(searchInfoManager);
    }
    
    @Override
    public void init() throws ServletException {
        
    	//CSVデータを読みこむ
		FILE_PATH = this.getServletContext().getRealPath("/Resources/") + FILE_NAME;
		bookSearchManager.loadBookDatas(FILE_PATH);
    }
    
	private void requestDataSetting(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		searchInfoManager.parameterGetFromForm(request);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		requestDataSetting(request,response);
		searchInfoManager.setSelectNoStr(request.getParameter("selectNo"));
		if(!searchInfoManager.isSelectNoNull()) {
			
			//何らかの番号が選択されている
			resultDisplay(request, response);
			return;
		}else {//if(searchInfoManager.isPushedButtonCopyEquals("Don'tOverWrite")){
			
			//リダイレクト後にdoPostへ
			doPost(request,response);
		}
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		requestDataSetting(request,response);
		String pushedButton = searchInfoManager.getPushedButton();
		switch(pushedButton) {
		
			//-----------------
			//検索
			case "検索":
				//String keyWord = searchInfoManager.getKeyWord();
				searchBookData(request,response);
			break;
			//-----------------
			//全件表示
			case "全件表示":
				allBookDataDisplay(request,response);
			break;
			default:
				allBookDataDisplay(request,response);
			break;		
		}
	}
	
	//----------
	//検索結果画面へ遷移
	public void resultDisplay(HttpServletRequest request,HttpServletResponse response) 
		throws ServletException, IOException{
		
		bookSearchManager.searchResultDisplay(request);
		transForward("./SearchResultServlet",request,response);
	}
	
	//-----------
	//検索
	public void searchBookData(HttpServletRequest request,HttpServletResponse response)
		throws ServletException, IOException {
		
		bookSearchManager.searchBookData(request);
		transForward("/WEB-INF/view/BookSearchScreen.jsp",request,response);
	}
	
	//----------
	//全件表示
	public void allBookDataDisplay(HttpServletRequest request,HttpServletResponse response) 
		throws ServletException, IOException {
		
		bookSearchManager.allBookDataDisplay(request);
		transForward("/WEB-INF/view/BookSearchScreen.jsp",request,response);
	}
	
	private void transForward(String transPath,HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		
		try {
			
			RequestDispatcher dispatcher = request.getRequestDispatcher(transPath);
			dispatcher.forward(request, response);
		}catch(ServletException e) {
			
			transException(request);
		}catch(IOException e) {
			
			transException(request);
		}catch(IllegalStateException e) {
			
			transException(request);
		}		
	}
	
	private void transException(HttpServletRequest request) {
		
		request.setAttribute("outbreakException",true);
	}
}