package todo.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnect {

	//DB接続用定数
	private static final String DATABASE_NAME = "booksearchsystem";
	private static final String PROPATIES = "?characterEncoding=UTF-8&useSSL=false&allowPublicKeyRetrieval=true";
	private static final String URL = "jdbc:mysql://localhost/" + DATABASE_NAME + PROPATIES;
	//DB接続用・ユーザ定数
	private static final String USER = "root";
	private static final String PASS = "12345";
	
	//----------
	//コンストラクタ
	public DatabaseConnect() {
	}
	
	//古い環境でも動かせるようにするおまじない
	static {
		
	    try {
	    	
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    } catch (ClassNotFoundException e) {
	    	
	        throw new RuntimeException("MySQL JDBC Driver not found", e);
	    }
	}
	
	public Connection getConnection() throws SQLException {
		
        return DriverManager.getConnection(URL, USER, PASS);
    }
}