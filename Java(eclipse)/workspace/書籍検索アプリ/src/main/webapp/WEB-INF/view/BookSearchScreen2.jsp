<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<%@ page import = "java.util.ArrayList" %>
<%@ page import = "todo.model.beans.BookDataBean"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>書籍検索画面</title>
</head>
<body>
	<%	
		@SuppressWarnings("unchecked")
		ArrayList<BookDataBean> searchResultList = (ArrayList<BookDataBean>) request.getAttribute("searchResultList");
		String keyWord = (String)request.getAttribute("keyWord");		
		Boolean isButtonPush = (Boolean)request.getAttribute("isButtonPush");
		isButtonPush = (isButtonPush != null)? isButtonPush : false;
		String pushedRadio = (String)request.getAttribute("pushedRadio");
	%>
	<h2>書籍検索画面
	</h2>
	<form method="post" action="./BookSearchServlet">
		本を検索する
		<input type="text" name="keyWord" placeholder="キーワードを入力"  autofocus
		<% if(keyWord != null){
			out.print("value = "+ keyWord); 
		}
		%>>
		<!-- キーワード検索ボタン -->
		<input type="submit" name = "pushedButton" value="検索" id="searchButton">
		
		<!-- 全件表示ボタン -->
		<input type="submit" name = "pushedButton" value="全件検索" id="allDisplayButton">
		
		<!-- 検索エンジンで検索ボタン -->
		<input type="submit" name = "pushedButton" value="検索エンジンで検索" id="searchEngineButton">
		
		<!-- ラジオボタン -->
		<div>
		    <input type="radio" id="keyWordSearch" name="pushedRadio" value="keyWordSearch"
		    <% if("keyWordSearch".equals(pushedRadio)){ out.print("checked"); } %>>
		    <label for="keyWordSearch">キーワードで検索</label>
		    <input type="radio" id="titleSearch" name="pushedRadio" value="titleSearch"
		    <% if("titleSearch".equals(pushedRadio)){ out.print("checked"); }%>>
		    <label for="titleSearch">本のタイトルで検索</label>
		</div>
		
		<%
		if(isButtonPush){
		%>
			<h2 id = "result">検索結果 <br>
			</h2>
			<%
			if(searchResultList.size()>0){
			%>
			<div id="table">
				<table border="5">
				    <tr>
				      <th>架空ISBNコード</th>
				      <th>タイトル</th>
				      <th>著者</th>
				      <th>発刊日</th>
				    </tr>
				     
				    <tr>
				    <%
					for(int i = 0; i<searchResultList.size();i++){
					%>
					      <td><a style="width:100%; height:100%; display:block;" href="./BookSearchServlet?selectNo=<%= i %>">
					      <%=searchResultList.get(i).getFictitiousISBN()%></a></td>
					      <td><%=searchResultList.get(i).getBookName()%></td>
					      <td><%=searchResultList.get(i).getAuthor() %></td>
					      <td><%=searchResultList.get(i).getPublicationDate() %></td><tr>
				    <%} 
					%>
				    </tr>
			    </table>
			</div>
			<%}else{ %>
				<h3 id = "canNotFind">検索しましたが、ヒットしませんでした。
				</h3>
			<%}
			%>
		<%
		}
		%>
	</form>
</body>
</html>