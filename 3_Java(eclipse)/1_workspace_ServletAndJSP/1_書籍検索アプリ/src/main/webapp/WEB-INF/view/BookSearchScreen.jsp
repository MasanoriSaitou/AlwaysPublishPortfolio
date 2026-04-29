<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<%@ page import = "java.util.ArrayList" %>
<%@ page import = "java.util.Arrays" %>
<%@ page import = "todo.model.beans.BookDataBean"%>
<jsp:useBean id="searchInfo" scope="request" class="todo.model.beans.SearchInformationBean" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>書籍検索画面</title>
</head>
<body>
	
	<h2>書籍検索画面
	</h2>
	<form method="post" action="./BookSearchServlet">
		本を検索する
		<input type="text" id="keyWord" name="keyWord" placeholder="キーワードを入力"  autofocus
		value="<%= searchInfo.getKeyWord() == null ? "" : searchInfo.getKeyWord() %>">
		
		<!-- キーワード検索ボタン -->
		<input type="submit" name = "pushedButton" value="検索" id="searchButton">
		
		<!-- 全件表示ボタン -->
		<input type="submit" name = "pushedButton" value="全件表示" id="allDisplayButton">
		
		<!-- Webで検索ボタン -->
		<input type="button" name = "pushedButton" value="Webで検索" id="searchEngineButton" onclick="openGoogle();">
		
		<!-- ラジオボタン -->
		<div>
		    <input type="radio" id="keyWordSearch" name="pushedRadio" value="keyWordSearch"
		    <% if("keyWordSearch".equals(searchInfo.getPushedRadio())){ out.print("checked"); } %>>
		    <label for="keyWordSearch">キーワードで検索</label>
		    <input type="radio" id="titleSearch" name="pushedRadio" value="titleSearch"
		    <% if("titleSearch".equals(searchInfo.getPushedRadio())){ out.print("checked"); }%>>
		    <label for="titleSearch">本のタイトルで検索</label>
		</div>
		<!-- チェックボックス -->
		<div>
		    <input type="checkbox" id="fromFileSearch" name="pushedChkBox" value="fromFileSearch"
		    <% if(Arrays.asList(searchInfo.getPushedChkBox()).contains("fromFileSearch")){ out.print("checked"); } %>>
		    <label for="fromFileSearch">ファイルから検索</label>
		    <input type="checkbox" id="fromDataBaseSearch" name="pushedChkBox" value="fromDataBaseSearch"
		    <% if(Arrays.asList(searchInfo.getPushedChkBox()).contains("fromDataBaseSearch")){ out.print("checked"); }%>>
		    <label for="fromDataBaseSearch">データベースから検索</label>
		</div>
		
		<%
		if(searchInfo.getIsButtonPush()){
		%>
			<h2 id = "result">検索結果 <br>
			</h2>
			<%
			if(searchInfo.getSearchResultList().size()>0){
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
					for(int i = 0; i<searchInfo.getSearchResultList().size();i++){
					%>
					      <td><a style="width:100%; height:100%; display:block;" href="./BookSearchServlet?selectNo=<%= i %>">
					      <%=searchInfo.getSearchResultList().get(i).getFictitiousISBN()%></a></td>
					      <td><%=searchInfo.getSearchResultList().get(i).getBookName()%></td>
					      <td><%=searchInfo.getSearchResultList().get(i).getAuthor() %></td>
					      <td><%=searchInfo.getSearchResultList().get(i).getPublicationDate() %></td><tr>
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
	<script src="./js/main.js"></script>
</body>
</html>