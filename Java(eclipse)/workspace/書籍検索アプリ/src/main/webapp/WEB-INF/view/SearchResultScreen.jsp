<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:useBean id="resultRecord" scope="request" class="todo.model.beans.BookDataBean" />
<!DOCTYPE html>
<html>
<style>
	p{
		font-size:20px;
	}
</style>
<head>
<meta charset="UTF-8">
<title>検索結果</title>
</head>
<body>
	<h2>検索結果画面
	</h2>
	
	<form method="post" action="./BookSearchServlet">
		
		<!-- 架空ISBNコード -->
		<p class="fictitiousISBN">
			架空ISBNコード：
			<jsp:getProperty name = "resultRecord" property = "fictitiousISBN" /> 
		</p>
		
		<!-- 本のタイトル -->
		<p class="bookName">
			本のタイトル：
			<jsp:getProperty name = "resultRecord" property = "bookName" /> 
		</p>
		
		<!-- 著者 -->
		<p class="author">
			著者：
			<jsp:getProperty name = "resultRecord" property = "author" /> 
		</p>
		
		<!-- 発刊日 -->
		<p class="publicationDate">
			発刊日：
			<jsp:getProperty name = "resultRecord" property = "publicationDate" /> 
		</p>
		
		<!-- 発行者 -->
		<p class="issuer">
			発行者：
			<jsp:getProperty name = "resultRecord" property = "issuer" /> 
		</p>
		
		<!-- 発行所 -->
		<p class="publisher">
			発行所：
			<jsp:getProperty name = "resultRecord" property = "publisher" /> 
		</p>
		
		<!-- 印刷所 -->
		<p class="printingShop">
			印刷所：
			<jsp:getProperty name = "resultRecord" property = "printingShop" /> 
		</p>
		
		<!-- 検索画面に戻るボタン -->
		<input type="submit" value="検索画面に戻る" id="button">
	</form>
</body>
</html>