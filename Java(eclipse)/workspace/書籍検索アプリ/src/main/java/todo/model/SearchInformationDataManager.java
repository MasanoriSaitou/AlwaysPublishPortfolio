package todo.model;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import todo.model.beans.BookDataBean;
import todo.model.beans.SearchInformationBean;

public class SearchInformationDataManager {

	private SearchInformationBean searchInfo;
	
	//-------------
	//コンストラクタ
	public SearchInformationDataManager() {
		
		searchInfo = new SearchInformationBean(
			new ArrayList<BookDataBean>(),
			null,
	        "",
	        "全件検索",
	        "keyWordSearch",
	        false
		);
	}
	
	public void setSelectNoStr(String selectNoStr) {
		
		if(null != selectNoStr) {
			
			searchInfo.setSelectNo(Integer.parseInt(selectNoStr));    
		}
	}
	
	public boolean isSelectNoNull() {
		
		return null == searchInfo.getSelectNo();
	}
	
	public BookDataBean getResultRecord() {
		
		Integer selectNo = searchInfo.getSelectNo();
		return searchInfo.getSearchResultList().get(selectNo);
	}
	
	public Integer setSelectNoSetNullAndReturn() {
		
		searchInfo.setSelectNo(null);
		return searchInfo.getSelectNo();
	}
	
	public boolean isPushedButtonCopyEquals(String checkStr) {
		
		return checkStr.equals(searchInfo.getPushedButtonCopy());
	}
	
	public void pushSearchButton(Boolean isPush,HttpServletRequest request) {
		
		searchInfo.setIsButtonPush(isPush);
		request.setAttribute("isButtonPush",isPush);
	}
	
	private Object parameterAdjustment(String target,Object nowParam,HttpServletRequest request) {
		
		Object requestGetParam = request.getParameter(target);
		return (null != requestGetParam)? requestGetParam : nowParam;
	}

	public void parameterGetFromForm(HttpServletRequest request) {
		
		//検索ワード
		String keyWord = searchInfo.getKeyWord();
		searchInfo.setKeyWord((String)parameterAdjustment("keyWord",keyWord,request));
		//押下されたボタンのコピー
		String pushedButtonCopyTmp = searchInfo.getPushedButtonCopy();
		searchInfo.setPushedButtonCopy(searchInfo.getPushedButton());
		//押下されたボタン
		String pushedButton = pushedButtonDataCheck(pushedButtonCopyTmp,request);
		searchInfo.setPushedButton(pushedButton);
		//選択されたラジオボタン
		String pushedRadio = searchInfo.getPushedRadio();
		pushedRadio = (String)parameterAdjustment("pushedRadio",pushedRadio,request);
		searchInfo.setPushedRadio(pushedRadio);
		//検索ボタンが押下されたかボタン
		Boolean isButtonPush = searchInfo.getIsButtonPush();
		isButtonPush = (Boolean)parameterAdjustment("isButtonPush",isButtonPush,request);
		pushSearchButton(isButtonPush,request);
	}
	
	private String pushedButtonDataCheck(String pushedButtonCopyTmp,HttpServletRequest request) {
		
		String pushedButton = searchInfo.getPushedButton();
		if("Don'tOverWrite".equals(pushedButtonCopyTmp)) {
			
			return pushedButton;
		}else {
			
			return (String)parameterAdjustment("pushedButton",pushedButton,request);
		}
	}
	
	public String getPushedButton() {
		
		return searchInfo.getPushedButton();
	}
	
	public String getKeyWord() {
		
		return searchInfo.getKeyWord();
	}
	
	public String getPushedRadio() {
		
		return searchInfo.getPushedRadio();
	}
	
	public void setSearchResultList(List<BookDataBean> searchResultList) {
		
		searchInfo.setSearchResultList(searchResultList);
	}
	
	public void setPushedButton(String pushedButton) {
		
		searchInfo.setPushedButton(pushedButton);
	}
	
	public String getPushedButtonCopy() {
		
		return searchInfo.getPushedButtonCopy();
	}
	
	public void setPushedButtonCopy(String pushedButtonCopy) {
		
		searchInfo.setPushedButtonCopy(pushedButtonCopy);
	}
	
	public void parameterSet(HttpServletRequest request) {
		
		request.setAttribute("searchInfo",searchInfo);
	}
}