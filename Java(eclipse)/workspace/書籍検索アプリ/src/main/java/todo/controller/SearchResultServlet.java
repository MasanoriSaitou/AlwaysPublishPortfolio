package todo.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import todo.model.beans.BookDataBean;

/**
 * Servlet implementation class SearchResultServlet
 */
@WebServlet("/SearchResultServlet")
public class SearchResultServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private BookDataBean resultRecord;
	private static final String[] DEFAULT_DATA = {"a", "a","a","2024/01/01","a","a","a",};
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchResultServlet() {
    	
        super();
        resultRecord = new BookDataBean(DEFAULT_DATA);
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		resultRecord = (BookDataBean)request.getAttribute("resultRecord");
		request.setAttribute("resultRecord",resultRecord);
		transForward("/WEB-INF/view/SearchResultScreen.jsp",request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
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