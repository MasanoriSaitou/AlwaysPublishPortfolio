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
import todo.model.beans.BookDataBean;

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
	private boolean isFirstStart;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BookSearchServlet() {
    	
        super();
        searchInfoManager = new SearchInformationDataManager();
        bookSearchManager = new BookSearchManager(searchInfoManager);
        isFirstStart = true;
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		searchInfoManager.setSelectNoStr(request.getParameter("selectNo"));
		if(isFirstStart) {
			
			//--------------------
			//初期化
			initializeParameter(request,response);
			return;
		}
		if(!searchInfoManager.isSelectNoNull()) {
			
			//何らかの番号が選択されている
			resultDisplay(request, response);
		}else if(searchInfoManager.isPushedButtonCopyEquals("Don'tOverWrite")){
			
			//リダイレクト後
			doPost(request,response);
		}
	}
	
	public void initializeParameter(HttpServletRequest request, HttpServletResponse response) 
		throws ServletException, IOException{
		
		FILE_PATH = this.getServletContext().getRealPath("/Resources/") + FILE_NAME;
		bookSearchManager.loadBookDatas(FILE_PATH);
        //パラメータ初期化
        parameterSet(request);
        //フラグをおろす
        isFirstStart = false;
        //全件表示（初期表示）
        allBookDataDisplay(request,response);
	}
	
	private void parameterSet(HttpServletRequest request) {
		
		searchInfoManager.parameterSet(request);
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		searchInfoManager.parameterGetFromForm(request);
		String pushedButton = searchInfoManager.getPushedButton();
		if(isFirstStart) {
			
			//--------------------
			//初期化
			initializeParameter(request,response);
			return;
		}
		switch(pushedButton) {
		
			//-----------------
			//検索
			case "検索":
				String keyWord = searchInfoManager.getKeyWord();
				searchBookData(keyWord,request,response);
			break;
			//-----------------
			//全件表示
			case "全件検索":
				allBookDataDisplay(request,response);
			break;
			//-----------------
			//検索エンジンで検索
			case "検索エンジンで検索":
				searchSearchEngine(request,response);
			break;
		}
	}
	
	//----------
	//検索結果画面へ遷移
	public void resultDisplay(HttpServletRequest request,HttpServletResponse response) 
		throws ServletException, IOException{
		
		BookDataBean resultRecord = searchInfoManager.getResultRecord();
		request.setAttribute("resultRecord",resultRecord);
		request.setAttribute("selectNo",searchInfoManager.setSelectNoSetNullAndReturn());
		transForward("./SearchResultServlet",request,response);
	}
	
	//-----------
	//検索
	public void searchBookData(String keyWord,HttpServletRequest request,HttpServletResponse response)
		throws ServletException, IOException {
		
		bookSearchManager.searchBookData(keyWord,request);
		//検索された本のタイトルをjspへ戻す
		//request.setAttribute("keyWord",keyWord);
		//選択されたラジオボタンをjspへ渡す
		//request.setAttribute("pushedRadio",pushedRadio);
		///検索結果をjspへ戻す
		//request.setAttribute("searchResultList",searchResultList);
		//パラメータをjspへ渡す
		parameterSet(request);
		transForward("/WEB-INF/view/BookSearchScreen.jsp",request,response);
	}
	
	//----------
	//全件表示
	public void allBookDataDisplay(HttpServletRequest request,HttpServletResponse response) 
		throws ServletException, IOException {
		
		bookSearchManager.allBookDataDisplay(request);
		//検索結果をjspへ戻す
		//request.setAttribute("searchResultList",searchResultList);
		//パラメータをjspへ渡す
		parameterSet(request);
		transForward("/WEB-INF/view/BookSearchScreen.jsp",request,response);
	}
	
	//-----------
	//検索エンジンで検索をかける
	public void searchSearchEngine(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		
		bookSearchManager.searchSearchEngine("Don'tOverWrite",request, response);
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