package todo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLTimeoutException;
import java.util.ArrayList;
import java.util.List;

import todo.model.beans.BookDataBean;

public class BookDataListDAO {
	
	//DAO
	private static final String FIND_ALL_SQL =
        "SELECT * FROM bookdatalistdb";

    private static final String FIND_BY_AUTHOR_SQL =
        "SELECT * FROM bookdatalistdb WHERE author = ?";

	//----------
	//コンストラクタ
	public BookDataListDAO() {
	}
	
	//---------
	//接続テスト用
	public static void main(String[] args) {

		var a = findAll();
		System.out.println(a.get(0).getBookName());
		System.out.println(a.get(0).getFictitiousISBN());
		System.out.println(a.get(0).getPrintingShop());
	}
	
	public static List<BookDataBean> findAll() {
		
	    return queryExecute(FIND_ALL_SQL);
	}

	public static List<BookDataBean> findByAuthor(String author) {
		
	    return queryExecute(FIND_BY_AUTHOR_SQL, author);
	}
	
	private static List<BookDataBean> queryExecute(String queryStr, Object... params) {
		
		List<BookDataBean> list = new ArrayList<>();

		try(//DB接続
			Connection conn = new DatabaseConnect().getConnection();
				
			// SQL文の実行
			PreparedStatement pstmt = conn.prepareStatement(queryStr);) {
			
			// パラメータをセット
	        for (int i = 0; i < params.length; i++) {
	        	
	            pstmt.setObject(i + 1, params[i]);
	        }

	        try (ResultSet rs = pstmt.executeQuery()) {
	        	
	            while (rs.next()) {
	                list.add(mapRow(rs));
	            }
	        }
		}catch (SQLTimeoutException e) {
			
			e.printStackTrace();
			throw new RuntimeException(e);
		}catch (SQLException e) {
			
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		return list;
	}
	
	private static BookDataBean mapRow(ResultSet rs) throws SQLException {
		
        return new BookDataBean(
            rs.getString("fictitiousISBN"),
            rs.getString("bookName"),
            rs.getString("author"),
            rs.getString("publicationDate"),
            rs.getString("issuer"),
            rs.getString("publisher"),
            rs.getString("printingShop")
        );
    }
}